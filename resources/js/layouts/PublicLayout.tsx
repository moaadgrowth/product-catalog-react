import { Link, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { home, products } from '@/routes/index';

type PublicLayoutProps = {
    children: ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
    const page = usePage();
    const currentUrl = page.url.split('?')[0] ?? '/';

    const linkClass = (pathPrefix: string) =>
        `hover:text-amber-900 ${
            currentUrl === pathPrefix || currentUrl.startsWith(`${pathPrefix}/`)
                ? 'text-amber-950'
                : ''
        }`.trim();

    return (
        <div className="min-h-screen bg-stone-100 font-sans text-stone-900 antialiased">
            <header className="relative z-10 border-b border-stone-200/80 bg-white/70 backdrop-blur">
                <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
                    <Link
                        href={home()}
                        className="font-display text-lg font-semibold text-stone-900 hover:text-amber-950"
                    >
                        Catalog
                    </Link>

                    <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-stone-600">
                        <Link
                            href={products()}
                            className={linkClass('/products')}
                        >
                            Shop
                        </Link>
                        <Link
                            href="/admin/products"
                            className={linkClass('/admin/products')}
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
