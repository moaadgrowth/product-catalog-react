<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function index(): Response
    {
        $categories = Category::query()
            ->orderBy('name')
            ->get();

        return Inertia::render('Admin/Category/Index', [
            'categories' => $categories,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Category/Create');
    }

    public function store(StoreCategoryRequest $request): RedirectResponse
    {
        Category::query()->create($request->validated());

        return redirect()->route('admin.categories.index');
    }

    public function edit(Category $category): Response
    {
        return Inertia::render('Admin/Category/Edit', [
            'category' => $category,
        ]);
    }

    public function update(UpdateCategoryRequest $request, Category $category): RedirectResponse
    {
        $category->update($request->validated());

        return redirect()->route('admin.categories.index');
    }

    public function destroy(Category $category): RedirectResponse
    {
        $category->delete();

        return redirect()->route('admin.categories.index');
    }
}
