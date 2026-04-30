import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { index as adminCategoriesIndex } from '@/routes/admin/categories/index';
import { index as adminProductsIndex } from '@/routes/admin/products/index';

export default function AdminDashboard() {
    return (
        <AdminLayout>
            <Head title="Dashboard" />

            <div className="mx-auto max-w-3xl space-y-8 p-6">
                <div>
                    <h1 className="font-display text-2xl font-semibold text-stone-900">
                        Dashboard
                    </h1>
                    <p className="mt-2 text-sm text-stone-600">
                        Manage products and categories for the catalog.
                    </p>
                </div>

                <ul className="grid gap-4 sm:grid-cols-2">
                    <li>
                        <Link
                            href={adminProductsIndex.url()}
                            className="group flex h-full flex-col rounded-2xl border border-stone-200/80 bg-white/80 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-amber-300/60 hover:shadow-md"
                        >
                            <span className="text-xs font-semibold tracking-wider text-amber-800/90 uppercase">
                                Admin
                            </span>
                            <span className="font-display mt-2 text-lg font-semibold text-stone-900">
                                Products
                            </span>
                            <span className="mt-2 flex-1 text-sm text-stone-600">
                                Create, edit, prices, and category assignments.
                            </span>
                            <span className="mt-4 text-sm font-medium text-amber-900 group-hover:underline">
                                Open products →
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={adminCategoriesIndex.url()}
                            className="group flex h-full flex-col rounded-2xl border border-stone-200/80 bg-white/80 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-amber-300/60 hover:shadow-md"
                        >
                            <span className="text-xs font-semibold tracking-wider text-amber-800/90 uppercase">
                                Admin
                            </span>
                            <span className="font-display mt-2 text-lg font-semibold text-stone-900">
                                Categories
                            </span>
                            <span className="mt-2 flex-1 text-sm text-stone-600">
                                Add, rename, or remove categories.
                            </span>
                            <span className="mt-4 text-sm font-medium text-amber-900 group-hover:underline">
                                Open categories →
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>
        </AdminLayout>
    );
}
