import axios from "axios";
import Vue from 'vue'
import vueAxios from 'vue-axios'
import URLS from './const'
import router from '@/router'
var instance = axios.create({
    baseURL: URLS.backDefaultServerUrl,
    withCredentials: process.env.NODE_ENV == "development" ? false : false,
    method: "get",
    responseType: "json",
    timeout: 10000,
    headers: {}
});

function clearStorage(path) {
    if (typeof window == 'object') {
        if (window.plus) {
            plus.storage.removeItem(path);
        } else {
            localStorage.removeItem(path);
        }
    } else {
        let fs = require("fs");
        fs.unlink('./' + path + '.json', function(err){
            if(err){
                throw err;
            }
            console.log('文件:' + './' + path + '.json' + '删除成功！');
        })
    }
}
//instance.defaults.headers.post["Content-Type"] = "application/json; charset=UTF-8";

instance.interceptors.request.use(function (config) {
    // console.log(config.url);
    // if(/\?/g.test(config.url)){
    //
    // }else{
    //     config.url = config.url + '?' + (new Date()).getTime();
    // };
    const requestHeader = {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
    }
    config.headers = Object.assign(config.headers, requestHeader)
    return config;
}, function (error) {
    return Promise.reject(error);
});
instance.interceptors.response.use(
    function(res) {
        if (res.data && (res.data.retInfo.errNo == '0')) {
            return Promise.resolve(res);
        } else if (res.data.retInfo.errNo == '10000') {
            clearStorage("userToken");
            router.push({path:'/startPage'});
        } else {
            return Promise.resolve(res);
        }
    },
    function(error) {
        if (error.message.indexOf("timeout of") === 0) {
            return Promise.reject({
                message: "业务繁忙，请稍后重试",
                code: -1
            });
        }

        return Promise.reject({
            message: error.message,
            code: error.code
        });
    }
);

Vue.use(vueAxios, instance);
export default instance;
