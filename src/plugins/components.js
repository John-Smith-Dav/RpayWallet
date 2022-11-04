import Vue from 'vue';
import header from '../components/header'
import headerD from '../components/headerD'

const button = () => import(/* webpackChunkName: "components" */ '../components/button');
const qrcode = () => import(/* webpackChunkName: "components" */ '../components/qrcode');
const empty = () => import(/* webpackChunkName: "components" */ '../components/empty');
const modal = () => import(/* webpackChunkName: "components" */ '../components/modal');
const copy = () => import(/* webpackChunkName: "components" */ '../components/copy');
const load = () => import(/* webpackChunkName: "components" */ '../components/load');
const loadD = () => import(/* webpackChunkName: "components" */ '../components/loadD');
const tokendialog = () => import(/* webpackChunkName: "components" */ '../components/tokendialog');
const selectCountry = () => import(/* webpackChunkName: "components" */ '../components/selectCountry');
const loginFooter = () => import(/* webpackChunkName: "components" */ '../components/loginFooter');
const selectAccountAddressBook = () => import(/* webpackChunkName: "components" */ '../components/selectAccountAddressBook');

Vue.component('Header', header);
Vue.component('HeaderD', headerD);
Vue.component('rButton', button);
Vue.component('rQrcode', qrcode);
Vue.component('Empty', empty);
Vue.component('rModal', modal);
Vue.component('rCopy', copy);
Vue.component('load', load);
Vue.component('loadD', loadD);
Vue.component('rTokenDialog', tokendialog);
Vue.component('selectCountry', selectCountry);
Vue.component('loginFooter', loginFooter);
Vue.component('selectAccountAddressBook', selectAccountAddressBook);
