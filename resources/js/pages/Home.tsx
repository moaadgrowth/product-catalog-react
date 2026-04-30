import { Head, Link, usePage } from '@inertiajs/react';
import PublicLayout from '@/layouts/PublicLayout';
import { index as adminProductsIndex } from '@/routes/admin/products/index';
import { products as productsIndex } from '@/routes/index';

export default function Home() {
    const page = usePage<{ name?: string }>();
    const title = page.props.name ?? 'Catalog';

    return (
        <PublicLayout>
            <Head title={title} />

            <main className="relative mx-auto max-w-3xl px-6 py-16 sm:py-24">
                <p className="text-xs font-semibold tracking-[0.2em] text-amber-800/80 uppercase">
                    Laravel Inertia React
                </p>
                <h1 className="font-display mt-3 text-4xl leading-tight font-bold text-stone-900 sm:text-5xl">
                    Product catalog
                </h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-stone-600">
                    Browse products on the shop, filter by category, or open the
                    admin to manage data.
                </p>

                <ul className="mt-12 grid gap-4 sm:grid-cols-2">
                    <li>
                        <Link
                            href={productsIndex.url()}
                            className="group flex h-full flex-col rounded-2xl border border-stone-200/80 bg-white/80 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-amber-300/60 hover:shadow-md"
                        >
                            <span className="text-xs font-semibold tracking-wider text-amber-800/90 uppercase">
                                Public
                            </span>
                            <span className="font-display mt-2 text-lg font-semibold text-stone-900">
                                Shop
                            </span>
                            <span className="mt-2 flex-1 text-sm text-stone-600">
                                List and filter products by category.
                            </span>
                            <span className="mt-4 text-sm font-medium text-amber-900 group-hover:underline">
                                Open shop →
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={adminProductsIndex.url()}
                            className="group flex h-full flex-col rounded-2xl border border-stone-200/80 bg-white/80 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-amber-300/60 hover:shadow-md"
                        >
                            <span className="text-xs font-semibold tracking-wider text-amber-800/90 uppercase">
                                Admin
                            </span>
                            <span className="font-display mt-2 text-lg font-semibold text-stone-900">
                                Dashboard
                            </span>
                            <span className="mt-2 flex-1 text-sm text-stone-600">
                                Manage products and categories.
                            </span>
                            <span className="mt-4 text-sm font-medium text-amber-900 group-hover:underline">
                                Open admin →
                            </span>
                        </Link>
                    </li>
                </ul>
            </main>
        </PublicLayout>
    );
}
