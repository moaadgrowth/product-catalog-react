import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { index as adminCategoriesIndex } from '@/routes/admin/categories/index';
import { create, destroy, edit } from '@/routes/admin/products/index';

type CategoryStub = {
    id: number;
    name: string;
};

type ProductRow = {
    id: number;
    name: string;
    description: string | null;
    price: string;
    categories: CategoryStub[];
};

type PageProps = {
    products: ProductRow[];
};

function confirmDestroy(productId: number, productName: string): void {
    if (!confirm(`Delete product "${productName}"? This cannot be undone.`)) {
        return;
    }

    router.delete(destroy.url({ product: productId }));
}

function categoryLabel(product: ProductRow): string {
    const names = product.categories.map((c) => c.name);

    return names.length ? names.join(', ') : '—';
}

export default function AdminProductIndex({ products }: PageProps) {
    return (
        <>
            <Head title="Products" />

            <AdminLayout>
                <div className="mx-auto max-w-4xl space-y-8 p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <h1 className="font-display text-2xl font-semibold text-stone-900">
                            Products
                        </h1>
                        <Link
                            href={create.url()}
                            className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-800"
                        >
                            Add product
                        </Link>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white/80 shadow-sm">
                        <table className="min-w-full divide-y divide-stone-200 text-sm">
                            <thead className="bg-stone-50/90">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-4 py-3 text-left font-medium text-stone-700"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-4 py-3 text-left font-medium text-stone-700"
                                    >
                                        Categories
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-4 py-3 text-right font-medium text-stone-700"
                                    >
                                        Price
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-4 py-3 text-right font-medium text-stone-700"
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-200">
                                {products.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="px-4 py-6 text-center text-stone-500"
                                        >
                                            No products yet. Add one above.
                                        </td>
                                    </tr>
                                ) : (
                                    products.map((product) => (
                                        <tr key={product.id}>
                                            <td className="px-4 py-3 text-stone-900">
                                                {product.name}
                                            </td>
                                            <td className="px-4 py-3 text-stone-600">
                                                {categoryLabel(product)}
                                            </td>
                                            <td className="px-4 py-3 text-right text-stone-900">
                                                {product.price}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <Link
                                                    href={edit.url({
                                                        product: product.id,
                                                    })}
                                                    className="mr-2 font-medium text-amber-900 hover:text-amber-950"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    type="button"
                                                    className="font-medium text-red-600 hover:text-red-800"
                                                    onClick={() =>
                                                        confirmDestroy(
                                                            product.id,
                                                            product.name,
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <p className="mt-8">
                        <Link
                            href={adminCategoriesIndex.url()}
                            className="text-sm text-stone-600 underline hover:text-amber-900"
                        >
                            ← Back to categories
                        </Link>
                    </p>
                </div>
            </AdminLayout>
        </>
    );
}
