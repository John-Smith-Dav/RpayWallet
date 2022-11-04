import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

const UserPage = () => import(/* webpackChunkName: "user" */ './views/user/index.vue');
const RegisterPage = () => import(/* webpackChunkName: "user" */ './views/registration/index.vue');
const scanning = () => import(/* webpackChunkName: "wallet" */ './views/wallet/scanning.vue');
/*const zhuanqian = () => import(/!* webpackChunkName: "wallet" *!/ './views/wallet/zhuanqian.vue');*/
const shoukuan = () => import(/* webpackChunkName: "wallet" */ './views/wallet/shoukuan.vue');
const zhuanqian_result = () => import(/* webpackChunkName: "wallet" */ './views/wallet/zhuanqian_result.vue');
const trade_detail = () => import(/* webpackChunkName: "wallet" */ './views/wallet/trade_detail.vue');
const accountSetting = () => import(/* webpackChunkName: "wallet" */ './views/user/accountSetting.vue');
const tradePasswordSetting = () => import(/* webpackChunkName: "wallet" */ './views/user/tradePasswordSetting.vue');
const userSetting = () => import(/* webpackChunkName: "wallet" */ './views/user/userSetting.vue');
const kycSetting = () => import(/* webpackChunkName: "wallet" */ './views/user/kycSetting.vue');
const noticeList = () => import(/* webpackChunkName: "wallet" */ './views/user/noticeList.vue');

const startPage = () => import(/* webpackChunkName: "wallet" */ './views/login/startPage.vue');
const loginNoStored = () => import(/* webpackChunkName: "wallet" */ './views/login/loginNoStored.vue');
const loginNoStoredSecond = () => import(/* webpackChunkName: "wallet" */ './views/login/loginNoStoredSecond.vue');
const loginNoStoredSmsThird = () => import(/* webpackChunkName: "wallet" */ './views/login/loginNoStoredSmsThird.vue');

const loginHaveStoredSecond = () => import(/* webpackChunkName: "wallet" */ './views/login/loginHaveStoredSecond.vue');
const loginHaveStoredSmsThird = () => import(/* webpackChunkName: "wallet" */ './views/login/loginHaveStoredSmsThird.vue');

const findPassword = () => import(/* webpackChunkName: "wallet" */ './views/registration/findPassword.vue');
const findPasswordSecond = () => import(/* webpackChunkName: "wallet" */ './views/registration/findPasswordSecond.vue');


const transferSetting = () => import(/* webpackChunkName: "wallet" */ './views/user/transferSetting.vue');
const transferSettingSecond = () => import(/* webpackChunkName: "wallet" */ './views/user/transferSettingSecond.vue');
const transferSettingAddressAdd = () => import(/* webpackChunkName: "wallet" */ './views/user/transferSettingAddressAdd.vue');


const transferFirst = () => import(/* webpackChunkName: "wallet" */ './views/wallet/transferFirst.vue');
const transferSecondAccount = () => import(/* webpackChunkName: "wallet" */ './views/wallet/transferSecondAccount.vue');
const transferSecondPhone = () => import(/* webpackChunkName: "wallet" */ './views/wallet/transferSecondPhone.vue');
const transferThird = () => import(/* webpackChunkName: "wallet" */ './views/wallet/transferThird.vue');
const iframeShop = () => import(/* webpackChunkName: "wallet" */ './views/wallet/IframeShop.vue');

Vue.use(Router)
export default new Router({
    // mode: 'history',
    // base: process.env.BASE_URL,
    mode: (/file/gi.test(location.href)) ? 'hash' : process.env.NODE_ENV === 'production' ? 'hash' : 'history' ,
    // base: process.env.BASE_URL,
    base: process.env.NODE_ENV === 'production' ? '/dist/' : '/',
    routes: [
        {
            path: '/',
            redirect: '/startPage'
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/user',
            name: 'user',
            component: UserPage
        },
        {
            path: '/registration',
            name: 'registration',
            component: RegisterPage
        },
        {
            path: '/scanning',
            name: 'scanning',
            component:scanning
        },
/*        {
            path: '/zhuanqian',
            name: 'zhuanqian',
            component: zhuanqian,
        },*/
        {
            path: '/shoukuan',
            name: 'shoukuan',
            component: shoukuan
        },
        {
            path: '/zhuanqian_result',
            name: 'zhuanqian_result',
            component: zhuanqian_result
        },
        {
            path: '/trade_detail',
            name: 'trade_detail',
            component: trade_detail
        },
        {
            path: '/accountSetting',
            name: 'accountSetting',
            component: accountSetting
        },
        {
            path: '/userSetting',
            name: 'userSetting',
            component: userSetting
        },
        {
            path: '/kycSetting',
            name: 'kycSetting',
            component: kycSetting
        },
        {
            path: '/noticeList',
            name: 'noticeList',
            component: noticeList
        },
        {
            path: '/startPage',
            name: 'startPage',
            component: startPage
        },
        {
            path: '/loginNoStored',
            name: 'loginNoStored',
            component: loginNoStored
        },
        {
            path: '/loginNoStoredSecond',
            name: 'loginNoStoredSecond',
            component: loginNoStoredSecond
        },
        {
            path: '/loginNoStoredSmsThird',
            name: 'loginNoStoredSmsThird',
            component: loginNoStoredSmsThird
        },
        {
            path: '/loginHaveStoredSecond',
            name: 'loginHaveStoredSecond',
            component: loginHaveStoredSecond
        },
        {
            path: '/loginHaveStoredSmsThird',
            name: 'loginHaveStoredSmsThird',
            component: loginHaveStoredSmsThird
        },
        {
            path: '/findPassword',
            name: 'findPassword',
            component: findPassword
        },
        {
            path: '/findPasswordSecond',
            name: 'findPasswordSecond',
            component: findPasswordSecond
        },
        {
            path: '/tradePasswordSetting',
            name: 'tradePasswordSetting',
            component: tradePasswordSetting
        },
        {
            path: '/transferSetting',
            name: 'transferSetting',
            component: transferSetting
        },
        {
            path: '/transferSettingSecond/:where',
            name: 'transferSettingSecond',
            component: transferSettingSecond,
            props : true
        },
        {
            path: '/transferSettingAddressAdd/:where',
            name: 'transferSettingAddressAdd',
            component: transferSettingAddressAdd,
            props : true
        },
        {
            path: '/transferFirst',
            name: 'transferFirst',
            component: transferFirst
        },
        {
            path: '/transferSecondAccount',
            name: 'transferSecondAccount',
            component: transferSecondAccount
        },
        {
            path: '/transferSecondPhone',
            name: 'transferSecondPhone',
            component: transferSecondPhone
        },
        {
            path: '/transferThird',
            name: 'transferThird',
            component: transferThird
        },
        {
            path: '/iFrameShop',
            name: 'iFrameShop',
            component: iframeShop
        }

    ],
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})
