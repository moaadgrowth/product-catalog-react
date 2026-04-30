import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { index as adminProductsIndex } from '@/routes/admin/products/index';
import { home, products as productsIndex } from '@/routes/index';

type PublicLayoutProps = {
    children: ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <div className="min-h-screen bg-stone-100 font-sans text-stone-900 antialiased">
            <header className="relative z-10 border-b border-stone-200/80 bg-white/70 backdrop-blur">
                <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
                    <Link
                        href={home.url()}
                        className="font-display text-lg font-semibold text-stone-900 hover:text-amber-950"
                    >
                        Catalog
                    </Link>

                    <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-stone-600">
                        <Link
                            href={productsIndex.url()}
                            className="hover:text-amber-900"
                        >
                            Shop
                        </Link>
                        <Link
                            href={adminProductsIndex.url()}
                            className="hover:text-amber-900"
                        >
                            Admin
                        </Link>
                    </nav>
                </div>
            </header>

            <div className="relative z-10">{children}</div>
        </div>
    );
}
