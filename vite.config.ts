
import react from '@vitejs/plugin-react';
import { defineConfig } from "vitest/config";

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
    ]
});
