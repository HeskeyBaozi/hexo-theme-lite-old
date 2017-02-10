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
    extraPostCSSPlugins: [
        require('precss')
    ],
    env: {
        development: {
            extraBabelPlugins: ['dva-hmr']
        }
    },
    theme: './src/config/antd.js'
}