import Vue from "vue";
import Store from "../store/store";
import URLS from "../plugins/const";
import {Dialog} from "vant";
import queryString from "querystring";
import Const from "@/plugins/const";
import { JSEncrypt } from 'jsencrypt'
import {hex2b64} from "jsencrypt/lib/lib/jsbn/base64";

//  在JsEncrypt原型上写了分段加密方法 encryptLong 使用时替换encrypt方法即可
JSEncrypt.prototype.encryptLong = function (string) {
    let k = this.getKey();
    let maxLength = 117;

    try {
        let lt = "";
        let ct = "";

        if (string.length > maxLength) {
            lt = string.match(/.{1,50}/g);
            lt.forEach(function (entry) {
                let t1 = k.encrypt(entry);
                ct += t1;
            });
            return hex2b64(ct);
        }
        let t = k.encrypt(string);
        let y = hex2b64(t);
        return y;
    } catch (ex) {
        return false;
    }
};

Vue.mixin({
    watch : {

    },
    methods: {

        toFixedNumber(num, len = 6) {
            if (typeof num == 'object') {
                return num.toFixed(len);
            }
            return this.decimal(num || 0).toFixed(len);
        },
        isEmpty(str) {
            if (str == null || str == '' || str == 'undefined') {
                return true;
            }
            return false;
        },
        toRoute(path) {
            this.$router.push({path: path});
        },
        numSplit(num, len) {
            num = num + '';
            if (/\./.test(num)) {
                return num.replace(eval('/([0-9]+\\.[0-9]{1,' + len + '})(.*)/g'), "$1");
            }
            ;
            return num;
        },
        decimalNum(val, len) {
            let n = (val + '').replace(/\./, '?').replace(/[^0-9\?]*/g, "").replace(/\?/g, ".");
            return this.numSplit(n, len);
        },
        timeChange(UTCDateString) {
            if (!UTCDateString) {
                return '-';
            }

            function formatFunc(str) {
                return str > 9 ? str : '0' + str
            }

            var date2 = new Date(UTCDateString);
            //console.log('时间', date2)
            var year = date2.getFullYear();
            var mon = formatFunc(date2.getMonth() + 1);
            var day = formatFunc(date2.getDate());
            var hour = date2.getHours();
            hour = formatFunc(hour);
            var min = formatFunc(date2.getMinutes());
            var sec = formatFunc(date2.getSeconds());
            var dateStr = year + '-' + mon + '-' + day + ' ' + hour + ':' + min;
            return dateStr;
        },
        timeChange2(UTCDateString) {
            if (!UTCDateString) {
                return '-';
            }

            function formatFunc(str) {
                return str > 9 ? str : '0' + str
            }

            var date2 = new Date(UTCDateString);
            //console.log('时间', date2)
            var year = date2.getFullYear();
            var mon = formatFunc(date2.getMonth() + 1);
            var day = formatFunc(date2.getDate());
            var hour = date2.getHours();
            hour = formatFunc(hour);
            var min = formatFunc(date2.getMinutes());
            var sec = formatFunc(date2.getSeconds());
            var dateStr = year + '-' + mon + '-' + day + ' ' + hour + ':' + min + ':' + sec;
            return dateStr;
        },

        /**
         ** 乘法函数，用来得到精确的乘法结果
         ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
         ** 调用：accMul(arg1,arg2)
         ** 返回值：arg1乘以 arg2的精确结果
         **/
        accMul(arg1, arg2) {
            let m = 0,
                s1 = arg1.toString(),
                s2 = arg2.toString();
            try {
                m += s1.split(".")[1].length;
            } catch (e) {
            }
            try {
                m += s2.split(".")[1].length;
            } catch (e) {
            }
            return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
        },

        deleteZero(number, n) {
            n = n ? parseInt(n) : 8;
            if (n <= 0) return Math.round(number);
            number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n);
            return number;
        },
        pushOnly(array, obj, key) { // 较数组对象中数据，没有增加有替换
            let bool = false;
            let index;
            for (let i = 0; i < array.length; i++) {
                let ent = array[i];
                // 如果key相同
                if (Object.keys(obj)[0] == Object.keys(ent)[0]) {
                    bool = true;
                    index = i;
                }
            }
            if (bool) {
                array.splice(index, 1, obj);
            } else {
                array.push(obj);
            }
        },
        async clearStorage(path) {
            if (typeof window == 'object') {
                if (window.plus) {
                    plus.storage.removeItem(path);
                } else {
                    localStorage.removeItem(path);
                }
                return true;
            } else {
                let fs = require("fs");
                fs.unlink('./' + path + '.json', function(err){
                    if(err){
                        throw err;
                    }
                    console.log('文件:' + './' + path + '.json' + '删除成功！');
                })

            }
        },
        async saveStorage(path, item) {
            if (typeof window == 'object') {
                if (window.plus) {
                    plus.storage.setItem(path, item);
                } else {
                    localStorage.setItem(path, item);
                }
                return true;
            } else {
                let fs = require("fs");
                let publicFs = fs.createWriteStream('./' + path + '.json');
                await publicFs.write(item);
                return true;
            }
        },
        async saveToken(token) {
            await this.saveStorage("tokenPath", token);
        },
        getStorage(path) {
            let token = '';
            if (typeof window === 'object') {
                if (window.plus) {
                    token = plus.storage.getItem(path);
                } else {
                    token = localStorage.getItem(path);
                }
            } else {
                let fs = require("fs");
                try {
                    token = fs.readFileSync('./' + path + '.json', {
                        encoding: 'utf8'
                    });
                } catch (e) {
                    fs.createWriteStream('./' + path + '.json');
                }

            }
            return token;
        },
        getToken() {
            return this.getStorage("tokenPath");
        },
        async saveKeyCloakToken() {
            const params = {
                grant_type: 'client_credentials',
                client_id: 'rpay-client',
                client_secret: 'vH10ei4GjXfsQ5TipSobUpI8GOYctwKm'
            };

            let data = await fetch('https://ry02.gskwin.com:10101/realms/rpay_realm/protocol/openid-connect/token',
                {
                    method: 'post',
                    body: queryString.stringify(params),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            ).then(res => res.json());
            this.saveToken(data.access_token);

        },
        timeFormat(dateTimeStamp) {   //dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
            let d = new Date(dateTimeStamp);
            return d.getFullYear() + "年" + ('00' + (1 + d.getMonth())).slice(-2) + '月' + ('00' + d.getDate()).slice(-2) + "日" + " " + ('00' + (d.getHours())).slice(-2) + ":" + ('00' + (d.getMinutes())).slice(-2) ;
        },
        async getUserInfo(id) {
            let userInfo = await this.axios({
                url: "/api/user/one",
                method: "post",
                headers: this.buildHeader(false),
                data: this.buildSecretBody(JSON.stringify({
                    "userId": id
                }))
            });
            return userInfo;
        },
       async saveLoginStorage(res) {
            await this.saveStorage(Const.localStorageKeyLoginUserInfo, JSON.stringify(res.data.result))
            await this.saveToken(res.data.result.accessToken);
            await this.saveStorage("userToken",  res.data.result.accessToken)

            // 用户电话和用户名和头像存入storage
            await this.saveStorage(Const.localStorageKeyPhone,  res.data.result.phone)
            await this.saveStorage(Const.localStorageKeyUserName, res.data.result.userName)
            await this.saveStorage(Const.localStorageKeyAvatar, res.data.result.avatar)
            await this.saveStorage(Const.localStorageKeyCountryCode, res.data.result.countryCode)

        },
        trim(str, is_global) {
            let result;
            result = str.replace(/(^\s+)|(\s+$)/g, "");
            if (is_global && is_global.toLowerCase() == "g") {
                result = result.replace(/\s/g, "");
            }
            return result;
        },
        isPhone(str) {
            let reg = /^1(3|4|5|7|8)\d{9}$/;
            return reg.test(this.trim(str, 'g'));
        },
        phoneSeparated(phoneNumber) {
            let tel = this.trim(phoneNumber, 'g');
            if (this.isPhone(tel)) {
                tel = tel.substring(0, 3) + ' ' + tel.substring(3, 7) + ' ' + tel.substring(7, 11);
            }
            return tel;
        },
        mobileFilter(val){
            let reg = /^(.{3}).*(.{4})$/
            return val.replace(reg,'$1****$2')
        },
        // 构造Header的共通
        buildHeader(needUser) {
            let headers =  {
                'Authorization': 'Bearer ' + this.getToken(),
                'Replay': 'nonce_str=' + this.uuid() + ",timestamp=" +  new Date().getTime()+ ",serial_no=" + this.getStorage("serialNo"),
            };
            if (needUser) {
                headers.userToken = this.getStorage("userToken");
            }
            return headers;
        },
        // 构造加密体的共通
        buildSecretBody(body) {
            let encrypt=new JSEncrypt();
            encrypt.setPublicKey(this.getStorage("publicKey"));
            let content = encrypt.encryptLong(body);
            let bodyJson = {};
            bodyJson.content = content;
            return bodyJson;
        },
        uuid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
                const r = (Math.random() * 16) | 0;
                const v = c === 'x' ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            });
        },
        async getSmsCode(wholePhone) {
            let rtn = {};
            rtn = await this.axios({
                url: "/api/index/sendSms",
                method: "post",
                headers: this.buildHeader(false),
                data: this.buildSecretBody(JSON.stringify({ "phone": wholePhone}))
            });
            return rtn;
        }

    }
})
