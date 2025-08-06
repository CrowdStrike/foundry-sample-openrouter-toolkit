// File: rollup.config.js
import { rollupPluginHTML as html } from '@web/rollup-plugin-html';
import { defineConfig } from 'rollup';
import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
// Use terser directly instead of as a plugin for more control
import { minify } from 'terser';
// Import imagemin for image optimization
import image from '@rollup/plugin-image';
// Import visualizer for bundle analysis
import { visualizer } from 'rollup-plugin-visualizer';
// Import compression plugins
import gzip from 'rollup-plugin-gzip';
import brotli from 'rollup-plugin-brotli';
// PostCSS plugins
import postcssPurgecss from 'postcss-purgecss';
import cssnanoPlugin from 'cssnano';
import cssnanoPresetAdvanced from 'cssnano-preset-advanced';
import tailwindcss from '@tailwindcss/postcss';
// Prebuild imports for entry point
import fs from 'fs';
import path from 'path';

// Environment configuration
const isProd = process.env.BUILD === 'production';
const shouldAnalyze = process.env.ANALYZE === 'true';
const skipCompression = process.env.SKIP_COMPRESSION === 'true';
const useCompression = isProd && !skipCompression;

// Generate cache-busting hash with timestamp and random component for uniqueness
const generateHash = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 5);
  return `${timestamp}${random}`;
};
const hash = generateHash();

// Performance measurement
const startTime = Date.now();

// Log build information
console.log(`Building for ${isProd ? 'production' : 'development'}${shouldAnalyze ? ' with bundle analysis' : ''}`);
console.log(`Using cache-busting hash: ${hash}`);

// Define production terser options with enhanced minification
const terserOptions = {
  format: {
    comments: false,
    ecma: 2020
  },
  compress: {
    ecma: 2020,
    drop_console: true,
    drop_debugger: true,
    pure_funcs: ['console.debug', 'console.log'],
    passes: 2, // Multiple passes for better compression
    toplevel: true, // Top level transforms
    module: true, // Better module optimization
    booleans_as_integers: true, // Convert booleans to integers for better compression
    unsafe_arrows: true, // Optimize arrow functions
    unsafe_math: true, // Optimize math expressions
    unsafe_methods: true // Optimize method calls
  },
  mangle: {
    properties: {
      regex: /^_private_|^__/
    }
  },
  module: true,
  sourceMap: false,
  toplevel: true
};

// Enhanced code splitting strategy for production
const getManualChunks = isProd ? (id) => {
  // Core dependencies
  if (id.includes('node_modules/react/') ||
      id.includes('node_modules/react-dom/') ||
      id.includes('node_modules/react/jsx-runtime')) {
    return 'vendor-react';
  }

  // Router
  if (id.includes('node_modules/react-router') ||
      id.includes('node_modules/react-router-dom')) {
    return 'vendor-router';
  }

  // Shoelace components
  if (id.includes('node_modules/@shoelace-style/shoelace')) {
    return 'vendor-shoelace';
  }

  // Foundry JS
  if (id.includes('node_modules/@crowdstrike/foundry-js')) {
    return 'vendor-foundry';
  }

  // Other vendor code (including falcon-shoelace)
  if (id.includes('node_modules') &&
      !id.includes('react') &&
      !id.includes('@shoelace-style/shoelace') &&
      !id.includes('foundry')) {
    return 'vendor-utils';
  }

  // Application code stays in its own chunks
  return undefined;
} : undefined;

// PostCSS plugins configuration
const postcssPlugins = [
  // Add Tailwind CSS processing (v4 handles autoprefixer automatically)
  tailwindcss(),

  // Only use PurgeCSS in production - updated with Tailwind classes
  isProd && postcssPurgecss({
    content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    safelist: {
      standard: [/sl-/, /shoelace/, /toolkit-/, /card-/, /^(w|h|p|m|text|bg|border|flex|grid|gap|rounded|shadow)-/],
      deep: [/sl-.+$/, /shoelace-.+$/, /^(hover|focus|active|disabled):/],
      greedy: [/sl-.+/, /^(sm|md|lg|xl|2xl):/]
    }
  }),

  // Add CSS minification
  isProd && cssnanoPlugin({
    preset: [cssnanoPresetAdvanced, {
      discardComments: { removeAll: true },
      normalizeWhitespace: true,
      minifySelectors: true,
      minifyFontValues: true,
      reduceIdents: true,
      mergeIdents: true
    }]
  })
].filter(Boolean);

// Build cache configuration
const cacheDir = '.rollup-cache';
let cache;

export default defineConfig([
  {
    input: ['src/index.html'],
    cache: cache,
    output: {
      dir: 'dist',
      format: "esm",
      sourcemap: !isProd,
      entryFileNames: `[name]-${hash}.js`,
      chunkFileNames: `[name]-${hash}.js`,
      assetFileNames: `[name]-${hash}.[ext]`,
      compact: isProd,
      generatedCode: {
        preset: 'es2015',
        constBindings: true,
        objectShorthand: true,
        arrowFunctions: true
      },
      minifyInternalExports: isProd,
      // In production, use enhanced code splitting strategy
      manualChunks: getManualChunks
    },
    plugins: [
      // Process JSON files
      json({
        compact: isProd
      }),

      // Replace environment variables
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
        'BUILD_NUMBER': JSON.stringify(hash),
        'BUILD_DATE': JSON.stringify(new Date().toISOString().split('T')[0]),
        'IS_PRODUCTION': JSON.stringify(isProd),
        '__DEV__': JSON.stringify(!isProd)
      }),

      // Optimize images in production
      isProd && image({
        include: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
        dom: true
      }),

      // Transpile code with Babel
      babel({
        presets: [
          ["@babel/preset-typescript", {
            isTSX: true,
            allExtensions: true
          }],
          ["@babel/preset-react", {
            runtime: 'automatic',
            development: !isProd
          }]
        ],
        babelHelpers: 'bundled',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        exclude: ['node_modules/**'],
        compact: isProd,
        generatorOpts: {
          compact: isProd,
          decoratorsBeforeExport: true,
          maxSize: 500000 // Reduced from 1MB for better chunking
        }
      }),

      // Convert CommonJS modules to ES modules
      commonjs({
        transformMixedEsModules: true,
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        include: 'node_modules/**'
      }),

      // Resolve modules
      nodeResolve({
        browser: true,
        exportConditions: ['default', 'module', 'import', 'browser'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        preferBuiltins: false
      }),

      // Process CSS with PostCSS
      postcss({
        extract: `styles-${hash}.css`,
        modules: false,
        extensions: [".css"],
        minimize: isProd,
        sourceMap: !isProd,
        plugins: postcssPlugins,
        inject: false,
        autoModules: true,
        namedExports: true
      }),

      // Process HTML files
      html({
        minify: isProd,
        transformHtml: (html, { bundle }) => {
          // Add the CSS link and preload hints
          let modified = html.replace(
            '</head>',
            `<link rel="stylesheet" href="styles-${hash}.css"></head>`
          );

          // In production, add preload hints for critical chunks
          if (isProd) {
            const criticalChunks = ['vendor-react', 'vendor-shoelace'];
            const preloadLinks = Object.keys(bundle)
              .filter(key => criticalChunks.some(chunk => key.includes(chunk)))
              .map(key => `<link rel="preload" href="${key}" as="script" crossorigin>`)
              .join('');

            modified = modified.replace('<head>', `<head>\n    ${preloadLinks}`);
          }

          return modified;
        }
      }),

      // In production, add custom code to minify output
      isProd && {
        name: 'terser',
        renderChunk: async (code) => {
          if (!isProd) return code;

          const result = await minify(code, terserOptions);
          return result.code;
        }
      },

      // Add compression in production if enabled
      useCompression && gzip({
        filter: (file) => file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.html'),
        fileName: '.gz',
        additionalFiles: []
      }),

      // Add Brotli compression (better than gzip - ~20% smaller files)
      useCompression && brotli({
        filter: (file) => file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.html'),
        options: {
          quality: 11, // Maximum quality (0-11)
          mode: 0 // Generic mode (0) for maximum compression
        }
      }),

      // Add visualization in analyze mode
      shouldAnalyze && visualizer({
        filename: 'dist/stats.html',
        title: 'OpenRouter Toolkit Bundle Analysis',
        open: true,
        template: 'treemap',
        gzipSize: true,
        brotliSize: true
      }),

      // Add a custom plugin to log build performance
      {
        name: 'build-performance',
        buildEnd() {
          const buildTime = Date.now() - startTime;
          console.log(`\nBuild completed in ${buildTime / 1000}s`);

          // In production, log file sizes
          if (isProd) {
            try {
              const distPath = path.resolve('dist');
              if (fs.existsSync(distPath)) {
                console.log('\nGenerated files:');
                const files = fs.readdirSync(distPath);

                files.forEach(file => {
                  const filePath = path.join(distPath, file);
                  const stats = fs.statSync(filePath);
                  const sizeKB = Math.round(stats.size / 1024 * 100) / 100;
                  console.log(`- ${file}: ${sizeKB} KB`);
                });
              }
            } catch (e) {
              console.error('Error reading dist directory:', e);
            }
          }
        }
      }
    ].filter(Boolean), // Filter out false values for conditional plugins
    watch: {
      exclude: ['dist/**', 'node_modules/**']
    },

    // Adjust how warnings are handled
    onwarn: (msg, warn) => {
      // Ignore common warnings
      if (
        msg.code === 'BABEL_PARSE_ERROR' && msg.message.includes('deoptimised the styling') ||
        msg.code === 'THIS_IS_UNDEFINED' ||
        msg.code === 'CIRCULAR_DEPENDENCY' ||
        msg.code === 'EVAL' // Ignore eval warnings in dependencies
      ) {
        return;
      }

      warn(msg);
    },

    // Enable tree shaking
    treeshake: {
      moduleSideEffects: 'no-external',
      propertyReadSideEffects: false,
      tryCatchDeoptimization: false
    }
  }
]);
