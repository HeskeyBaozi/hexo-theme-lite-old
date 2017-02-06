export default {
    entry: './src/index.js',
    outputPath: './source',
    disableCSSModules: false,
    autoprefixer: null,
    proxy: null,
    extraBabelPlugins: [
        'transform-runtime',
        ['import', {libraryName: 'antd', style: true}]
    ],
    env: {
        development: {
            extraBabelPlugins: ['dva-hmr']
        }
    },
    theme: {
        'primary-color': '#5c5c5c'
    }
}