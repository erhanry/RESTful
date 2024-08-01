import * as esbuild from "esbuild";

await esbuild.build({
    entryPoints: ["src/index.js"],
    target: "esnext",
    sourcemap: false, // external inline both
    bundle: true,
    platform: "node",
    outdir: "dist",
    outExtension: { ".js": ".cjs" },
    legalComments: "none",
    splitting: false,
    format: "cjs", // iife cjs esm
    minify: true,
    logLevel: "info", // silent error warning info debug
    packages: "bundle", // bundle external
    banner: {
        js: "/*\n* Name: Restful-services\n* Version: 2.0.0\n* Author: Erhan Ysuf\n*/",
    },
    ignoreAnnotations: false,
    allowOverwrite: false,
});
