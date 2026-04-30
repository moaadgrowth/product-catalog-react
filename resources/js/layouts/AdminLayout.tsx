import { Link, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { index as adminCategoriesIndex } from '@/routes/admin/categories/index';
import { dashboard } from '@/routes/admin/index';
import { index as adminProductsIndex } from '@/routes/admin/products/index';
import { products as productsIndex } from '@/routes/index';

type AdminLayoutProps = {
    children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
    const page = usePage();
    const currentUrl = page.url.split('?')[0] ?? '/';

    const linkClass = (path: string) =>
        `hover:text-amber-900 ${
            currentUrl === path || currentUrl.startsWith(`${path}/`)
                ? 'text-amber-950'
                : ''
        }`.trim();

    return (
        <div className="min-h-screen bg-stone-100 font-sans text-stone-900 antialiased">
            <header className="relative z-10 border-b border-stone-200/80 bg-white/70 backdrop-blur">
                <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
                    <Link
                        href={dashboard.url()}
                        className="font-display text-lg font-semibold text-stone-900 hover:text-amber-950"
                    >
                        Admin
                    </Link>

                    <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-stone-600">
                        <Link
                            href={adminProductsIndex.url()}
                            className={linkClass('/admin/products')}
                        >
                            Products
                        </Link>
                        <Link
                            href={adminCategoriesIndex.url()}
                            className={linkClass('/admin/categories')}
                        >
                            Categories
                        </Link>
                        <Link
                            href={productsIndex.url()}
                            className={linkClass('/products')}
                        >
                            View shop
                        </Link>
                    </nav>
                </div>
            </header>

            <div className="relative z-10">{children}</div>
        </div>
    );
}
