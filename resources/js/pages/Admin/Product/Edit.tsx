import { Head, Link, useForm } from '@inertiajs/react';
import type { SubmitEvent } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import {
    index as adminProductsIndex,
    update,
} from '@/routes/admin/products/index';

const controlClass =
    'w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 shadow-sm focus:border-amber-600 focus:ring-1 focus:ring-amber-500 focus:outline-none';

const checkboxClass =
    'rounded border-stone-300 text-amber-800 focus:ring-amber-500';

type CategoryOption = {
    id: number;
    name: string;
};

type ProductPayload = {
    id: number;
    name: string;
    description: string | null;
    price: string;
    categories: CategoryOption[];
};

type PageProps = {
    product: ProductPayload;
    categories: CategoryOption[];
};

export default function AdminProductEdit({ product, categories }: PageProps) {
    const form = useForm({
        name: product.name,
        description: product.description ?? '',
        price: product.price,
        categoryIds: product.categories.map((c) => c.id),
    });

    function submit(e: SubmitEvent<HTMLFormElement>): void {
        e.preventDefault();
        form.put(update.url({ product: product.id }));
    }

    function toggleCategory(id: number): void {
        const ids = form.data.categoryIds;

        if (ids.includes(id)) {
            form.setData(
                'categoryIds',
                ids.filter((x) => x !== id),
            );
        } else {
            form.setData('categoryIds', [...ids, id]);
        }
    }

    return (
        <>
            <Head title="Edit Product" />

            <AdminLayout>
                <div className="mx-auto max-w-4xl space-y-8 p-6">
                    <h1 className="font-display text-2xl font-semibold text-stone-900">
                        Edit product
                    </h1>

                    <form
                        className="space-y-4 rounded-2xl border border-stone-200/80 bg-white/80 p-5 shadow-sm"
                        onSubmit={submit}
                    >
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="product-name"
                                    className="mb-1 block text-sm font-medium text-stone-700"
                                >
                                    Name
                                </label>
                                <input
                                    id="product-name"
                                    type="text"
                                    value={form.data.name}
                                    autoComplete="off"
                                    onChange={(e) =>
                                        form.setData('name', e.target.value)
                                    }
                                    className={controlClass}
                                />
                                {form.errors.name ? (
                                    <p className="mt-1 text-sm text-red-600">
                                        {form.errors.name}
                                    </p>
                                ) : null}
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="product-description"
                                    className="mb-1 block text-sm font-medium text-stone-700"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="product-description"
                                    value={form.data.description}
                                    rows={3}
                                    onChange={(e) =>
                                        form.setData(
                                            'description',
                                            e.target.value,
                                        )
                                    }
                                    className={controlClass}
                                />
                                {form.errors.description ? (
                                    <p className="mt-1 text-sm text-red-600">
                                        {form.errors.description}
                                    </p>
                                ) : null}
                            </div>

                            <div>
                                <label
                                    htmlFor="product-price"
                                    className="mb-1 block text-sm font-medium text-stone-700"
                                >
                                    Price
                                </label>
                                <input
                                    id="product-price"
                                    type="text"
                                    inputMode="decimal"
                                    value={form.data.price}
                                    onChange={(e) =>
                                        form.setData('price', e.target.value)
                                    }
                                    className={controlClass}
                                />
                                {form.errors.price ? (
                                    <p className="mt-1 text-sm text-red-600">
                                        {form.errors.price}
                                    </p>
                                ) : null}
                            </div>

                            <div>
                                <span className="mb-2 block text-sm font-medium text-stone-700">
                                    Categories
                                </span>
                                <div className="max-h-40 space-y-2 overflow-y-auto rounded-lg border border-stone-300 bg-white p-3 shadow-sm sm:max-w-md">
                                    {categories.map((category) => (
                                        <label
                                            key={category.id}
                                            htmlFor={`category-${category.id}`}
                                            className="flex cursor-pointer items-center gap-2 text-sm text-stone-800"
                                        >
                                            <input
                                                id={`category-${category.id}`}
                                                type="checkbox"
                                                checked={form.data.categoryIds.includes(
                                                    category.id,
                                                )}
                                                onChange={() =>
                                                    toggleCategory(category.id)
                                                }
                                                className={checkboxClass}
                                            />
                                            <span>{category.name}</span>
                                        </label>
                                    ))}
                                </div>
                                {form.errors.categoryIds ? (
                                    <p className="mt-1 text-sm text-red-600">
                                        {form.errors.categoryIds}
                                    </p>
                                ) : null}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <button
                                type="submit"
                                disabled={form.processing}
                                className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-800 disabled:opacity-50"
                            >
                                {form.processing
                                    ? 'Updating…'
                                    : 'Update product'}
                            </button>
                            <Link
                                href={adminProductsIndex()}
                                className="inline-flex items-center rounded-lg border border-stone-300 bg-white/80 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </AdminLayout>
        </>
    );
}
