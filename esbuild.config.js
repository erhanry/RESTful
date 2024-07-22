import * as esbuild from "esbuild";

await esbuild.build({
    entryPoints: ["src/index.js"],
    sourcemap: false, // external inline both
    bundle: true,
    platform: "node",
    target: ["node10.4"],
    outdir: "dist",
    outExtension: { ".js": ".cjs" },
    legalComments: "none",
    splitting: false,
    format: "cjs", // iife cjs esm
    minify: true,
    logLevel: "info", // silent error warning info debug
    packages: "bundle", // bundle external
    // external: ["express", "events"], // "fsevents", "*.png" => external to exclude it from your build
    ignoreAnnotations: false,
    allowOverwrite: false,
});
