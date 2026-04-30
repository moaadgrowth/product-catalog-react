import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import {
    create,
    edit,
    destroy,
} from '@/routes/admin/categories/index';
import { products as productsIndex } from '@/routes/index';

type CategoryRow = {
    id: number;
    name: string;
};

type PageProps = {
    categories: CategoryRow[];
};

function confirmDestroy(categoryId: number, categoryName: string): void {
    if (
        !window.confirm(
            `Delete category "${categoryName}"? Products will be unlinked from it.`,
        )
    ) {
        return;
    }

    router.delete(destroy.url({ category: categoryId }));
}

export default function AdminCategoryIndex({ categories }: PageProps) {
    return (
        <>
            <Head title="Categories" />

            <AdminLayout>
                <div className="mx-auto max-w-3xl space-y-8 p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <h1 className="font-display text-2xl font-semibold text-stone-900">
                            Categories
                        </h1>
                        <Link
                            href={create()}
                            className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-800"
                        >
                            Add category
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
                                        className="px-4 py-3 text-right font-medium text-stone-700"
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-200">
                                {categories.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={2}
                                            className="px-4 py-6 text-center text-stone-500"
                                        >
                                            No categories yet. Add one above.
                                        </td>
                                    </tr>
                                ) : (
                                    categories.map((category) => (
                                        <tr key={category.id}>
                                            <td className="px-4 py-3 text-stone-900">
                                                {category.name}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <Link
                                                    href={edit({
                                                        category: category.id,
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
                                                            category.id,
                                                            category.name,
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
                            href={productsIndex()}
                            className="text-sm text-stone-600 underline hover:text-amber-900"
                        >
                            ← Back to public products
                        </Link>
                    </p>
                </div>
            </AdminLayout>
        </>
    );
}