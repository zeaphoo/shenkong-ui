import { build } from 'esbuild'

const shared = {
  entryPoints: ['src/ui/index.jsx'],
  bundle: true,
  sourcemap: true,
  external: [
    'react',
    'react-dom',
    '@radix-ui/react-slot',
    '@radix-ui/react-checkbox',
    '@radix-ui/react-select',
    '@radix-ui/react-switch',
    '@radix-ui/react-dialog',
    '@radix-ui/react-tabs',
    '@radix-ui/react-tooltip',
    '@radix-ui/react-toast',
    '@radix-ui/react-progress',
    '@radix-ui/react-separator',
    'class-variance-authority',
    'clsx',
    'tailwind-merge',
  ],
}

await build({ ...shared, format: 'esm',  outfile: 'dist/index.esm.js' })
await build({ ...shared, format: 'cjs',  outfile: 'dist/index.cjs.js' })

console.log('  ✓ dist/index.esm.js')
console.log('  ✓ dist/index.cjs.js')
