/// <reference types="vitest" />
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';
import checker from 'vite-plugin-checker';

export default defineConfig((env) => ({
    plugins: [
        react(),
        checker({
            typescript: env.mode !== 'development' && {
                tsconfigPath: `${__dirname}/tsconfig.app.json`,
            },
        }),
        tsconfigPaths({
            root: '../../',
        }),
        VitePWA({
            injectRegister: 'auto',
            registerType: 'autoUpdate',
            disable: true,
            selfDestroying: true,
        }),
        splitVendorChunkPlugin(),
    ],
    test: {
        globals: true,
        environment: 'jsdom',
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        cache: {
            dir: '../../node_modules/.vitest',
        },
        passWithNoTests: true,
        setupFiles: './src/setupTests.ts',
    },
}));
