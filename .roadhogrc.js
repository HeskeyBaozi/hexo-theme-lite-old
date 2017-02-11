import cssnext from "postcss-cssnext";
import assets from "postcss-assets";
import cssImport from "postcss-import";
import path from "path";

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
        cssImport(),
        assets({
            basePath: path.resolve('./src/assets'),
            relative: true
        }),
        cssnext({
            features: {
                autoprefixer: false
            }
        })
    ],
    env: {
        development: {
            extraBabelPlugins: ['dva-hmr']
        }
    },
    theme: './src/config/antd.js'
}