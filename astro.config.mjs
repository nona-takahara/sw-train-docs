import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkMermaid from '@southball/remark-mermaid';

// https://astro.build/config
export default defineConfig({
    site: "https://nona-takahara.github.io/sw-train-docs/",
    build: {
        format: "file"
    },
    markdown: {
        remarkPlugins: [remarkMath, remarkMermaid],
        rehypePlugins: [rehypeKatex],
    }
});
