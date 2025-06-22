import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeMermaid from 'rehype-mermaid';

// https://astro.build/config
export default defineConfig({
    site: "https://nona-takahara.github.io",
    base: "/sw-train-docs",
    output: "static",
    build: {
        format: "file"
    },
    markdown: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex, rehypeMermaid],
        syntaxHighlight: {
            type: 'shiki',
            excludeLangs: ['mermaid', 'js'],
        },
    }
});
