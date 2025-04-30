import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import viteReact from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/app.tsx'
            ],
            refresh: true,
        }),
        tailwindcss(),
        viteReact(),
    ],
    resolve: {
        alias: {
            '@/account' : path.resolve(__dirname, './resources/js/modules/account/'),
            '@/auth'    : path.resolve(__dirname, './resources/js/modules/auth/'),
            '@/hr'      : path.resolve(__dirname, './resources/js/modules/hr/'),
            '@'         : path.resolve(__dirname, './resources/js/'),
        }
    }
});
