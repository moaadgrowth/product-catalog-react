import { Head, router } from '@inertiajs/react';
import type { ChangeEvent } from 'react';
import { index as productsIndex } from '@/actions/App/Http/Controllers/ProductController';
import PublicLayout from '@/layouts/PublicLayout';

type Category = {
    id: number;
    name: string;
};

type Product = {
    id: number;
    name: string;
    description: string | null;
    price: string;
    categories: Category[];
};

type ProductsIndexProps = {
    products: Product[];
    categories: Category[];
    categoryFilter: number | null;
};

function categoryLabel(product: Product): string {
    const names = product.categories.map((c) => c.name);

    return names.length ? names.join(', ') : '—';
}

function onCategoryChange(event: ChangeEvent<HTMLSelectElement>): void {
    const value = event.target.value;

    if (value === '') {
        router.visit(productsIndex.url(), { preserveScroll: true });

        return;
    }

    router.visit(
        productsIndex.url({ query: { category: Number(value) } }),
        { preserveScroll: true },
    );
}

export default function ProductsIndex({
    products,
    categories,
    categoryFilter,
}: ProductsIndexProps) {
    return (
        <PublicLayout>
            <Head title="Products" />

            <div className="mx-auto max-w-3xl space-y-6 p-6">
                <h1 className="font-display text-2xl font-semibold text-stone-900">
                    Products
                </h1>

                <div>
                    <label
                        htmlFor="category"
                        className="mb-1 block text-sm font-medium text-stone-700"
                    >
                        Category
                    </label>

                    <select
                        id="category"
                        className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 shadow-sm focus:border-amber-600 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                        value={categoryFilter ?? ''}
                        onChange={onCategoryChange}
                    >
                        <option value="">All categories</option>
                        {categories.map((category) => (
                            <option key={category.id} value={String(category.id)}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <ul className="divide-y divide-stone-200 overflow-hidden rounded-2xl border border-stone-200/80 bg-white/80 shadow-sm">
                    {products.length === 0 ? (
                        <li className="px-4 py-6 text-sm text-stone-500">
                            No products match this filter.
                        </li>
                    ) : (
                        products.map((product) => (
                            <li
                                key={product.id}
                                className="flex flex-col gap-1 px-4 py-3"
                            >
                                <span className="font-medium text-stone-900">
                                    {product.name}
                                </span>
                                <span className="text-sm text-stone-600">
                                    {categoryLabel(product)}
                                </span>
                                <span className="text-sm text-stone-800">
                                    {product.price} SEK
                                </span>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </PublicLayout>
    );
}