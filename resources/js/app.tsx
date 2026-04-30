import { createInertiaApp } from '@inertiajs/react';

createInertiaApp({
    title: (title) => title ?? '',
    progress: {
        color: '#4B5563',
    },
});
