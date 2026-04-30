<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        // 1) Read ?category= from URL (none = show all products)
        $categoryFilter = $request->filled('category')
            ? (int) $request->query('category')
            : null;

        // 2) Optional: ignore bad IDs (category does not exist)
        if ($categoryFilter !== null && ! Category::query()->whereKey($categoryFilter)->exists()) {
            $categoryFilter = null;
        }

        // 3) Base query: always eager-load categories on each product
        $query = Product::query()
            ->with('categories')
            ->latest();

        // 4) If user picked a category, only products linked to that category
        if ($categoryFilter !== null) {
            $query->whereHas('categories', function ($q) use ($categoryFilter): void {
                $q->where('categories.id', $categoryFilter);
            });
        }

        $products = $query->get();

        // 5) Full list of categories (for “filter by category” UI — always unfiltered)
        $categories = Category::query()
            ->orderBy('name', 'asc')
            ->get();

        return Inertia::render('Products/Index', [
            'products' => $products,
            'categories' => $categories,
            'categoryFilter' => $categoryFilter,
        ]);
    }
}
