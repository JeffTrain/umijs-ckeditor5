import {defineConfig} from '@umijs/max';

export default defineConfig({
    esbuildMinifyIIFE: true,
    antd: {},
    access: {},
    model: {},
    initialState: {},
    request: {},
    layout: {
        title: '@umijs/max',
    },
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            name: '首页',
            path: '/home',
            component: './Home',
        },
        {
            name: '权限演示',
            path: '/access',
            component: './Access',
        },
        {
            name: ' CRUD 示例',
            path: '/table',
            component: './Table',
        },
    ],
    npmClient: 'pnpm',
    chainWebpack(config) {
        const {styles} = require('@ckeditor/ckeditor5-dev-utils');
        const svgReg = /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/;
        const cssReg = /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/;
        config.module.rule('cke5-svg').test(svgReg).type(
            // raw-loader
            'asset/source',
        );
        // svg exclude
        ['svg', 'svgr'].forEach((rule) => {
            config.module.rule(rule).exclude.add(svgReg);
        });
        // css rule
        config.module
            .rule('cke5-css')
            .test(cssReg)
            .use('style-loader')
            .loader(require.resolve('style-loader'))
            .end()
            .use('css-loader')
            .loader(require.resolve('css-loader'))
            .end()
            .use('postcss-loader')
            .loader(require.resolve('postcss-loader'))
            .options({
                postcssOptions: styles.getPostCssConfig({
                    themeImporter: {
                        themePath: require.resolve('@ckeditor/ckeditor5-theme-lark'),
                    },
                    minify: true,
                }),
            });
        // css exclude
        config.module.rule('css').exclude.add(cssReg);
        // assets exclude
        config.module
            .rule('asset')
            .oneOf('fallback')
            .exclude.add(svgReg)
            .add(cssReg);
    },
});
