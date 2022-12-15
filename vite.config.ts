import { defineConfig } from "vite";

export default defineConfig({
    test: {
        globals: true,
        environment: "node",
        coverage: {
            reporter: ["text", "html"],
            exclude: ["node_modules/"],
        },
    },
});
