
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from "vitest/config";
import { ROUTER_HELPER } from './src/routes/RouterHelper';

export default defineConfig({
    test: {
        globals: true,
        environment: "node",
        coverage: {
            reporter: ["text", "html"],
            exclude: ["node_modules/"],
        },
    },
    plugins: [
        react(),
    ],
    resolve: {
        alias: {
            '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
        }
    },
    base: ROUTER_HELPER.BASE_URL
});
