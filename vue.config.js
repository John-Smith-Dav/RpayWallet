let appState = process.argv[4] === 'app';
process.env.appState = appState;
global.APP_STATE = appState;
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var plugins =[];

if(process.env.NODE_ENV === 'production'){
    console.log('=================production=====================');
}
module.exports = {
    publicPath: appState ? './static/' : process.env.NODE_ENV === 'production' ? './' : '/',
    //outputDir: appState ? 'D:\\rcpApp\\aldApp\\static' : path.resolve(__dirname, "./dist"),
    assetsDir: appState ? "./" : "static",
    productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,

    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "~@/assets/css/config.scss";`
            },
        }
    }
}
