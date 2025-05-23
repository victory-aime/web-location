import typescript from '@rollup/plugin-typescript'

export default [
  {
    input: 'src/index.ts',
    output: {
      file: './lib/index.esm.js',
      format: 'esm',
    },
    plugins: [typescript()],
  },
  {
    input: 'src/index.ts',
    output: {
      file: './lib/index.js',
      format: 'cjs',
    },
    plugins: [typescript()],
  },
]
