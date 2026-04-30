import { Head, Link, useForm } from '@inertiajs/react';
import type { SubmitEvent } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import {
    index as adminCategoriesIndex,
    store,
} from '@/routes/admin/categories/index';

const controlClass =
    'w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 shadow-sm focus:border-amber-600 focus:ring-1 focus:ring-amber-500 focus:outline-none';

export default function AdminCategoryCreate() {
    const form = useForm({
        name: '',
    });

    function submit(e: SubmitEvent<HTMLFormElement>): void {
        e.preventDefault();
        form.post(store.url());
    }

    return (
        <>
            <Head title="Create Category" />

            <AdminLayout>
                <div className="mx-auto max-w-3xl space-y-8 p-6">
                    <h1 className="font-display text-2xl font-semibold text-stone-900">
                        New category
                    </h1>

                    <form
                        className="space-y-4 rounded-2xl border border-stone-200/80 bg-white/80 p-5 shadow-sm"
                        onSubmit={submit}
                    >
                        <div>
                            <label
                                htmlFor="category-name"
                                className="mb-1 block text-sm font-medium text-stone-700"
                            >
                                Name
                            </label>
                            <input
                                id="category-name"
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

                        <div className="flex flex-wrap gap-2">
                            <button
                                type="submit"
                                disabled={form.processing}
                                className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-800 disabled:opacity-50"
                            >
                                {form.processing
                                    ? 'Saving…'
                                    : 'Add category'}
                            </button>
                            <Link
                                href={adminCategoriesIndex()}
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