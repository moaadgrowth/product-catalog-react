<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        $products = Product::query()
            ->with('categories')
            ->latest()
            ->get();

        return Inertia::render('Admin/Product/Index', [
            'products' => $products,
        ]);
    }

    public function create(): Response
    {
        $categories = Category::query()->orderBy('name', 'asc')->get();

        return Inertia::render('Admin/Product/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(StoreProductRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $categoryIds = $data['categoryIds'] ?? [];
        unset($data['categoryIds']);

        $product = Product::query()->create($data);
        $product->categories()->sync($categoryIds);

        return redirect()->route('admin.products.index');
    }

    public function edit(Product $product): Response
    {
        $categories = Category::query()->orderBy('name', 'asc')->get();

        return Inertia::render('Admin/Product/Edit', [
            'product' => $product->load('categories'),
            'categories' => $categories,
        ]);
    }

    public function update(UpdateProductRequest $request, Product $product): RedirectResponse
    {
        $data = $request->validated();
        $categoryIds = $data['categoryIds'] ?? [];
        unset($data['categoryIds']);

        $product->update($data);
        $product->categories()->sync($categoryIds);

        return redirect()->route('admin.products.index');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();

        return redirect()->route('admin.products.index');
    }
}
