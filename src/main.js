import Vue from 'vue'
import 'animate.css'
import './assets/font/font.css'

import App from './App.vue'
// const App = () => import(/* webpackChunkName: "APPVue" */ './App.vue');
import router from './router'
import store from './store/store'
import i18n from './i18n/'
import './assets/css/common.scss'
import './plugins/components'
import './plugins/index'
import Toast from "@/components/toast"
import "./plugins/decimal";
import "./plugins/preventClick";
import axios from './plugins/axios';

import { Col, Row, Search } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Card } from 'vant';
import { Button } from 'vant';
import { NoticeBar } from 'vant';
import { Icon } from 'vant';
import { Popup } from 'vant';
import { Swipe, SwipeItem, Lazyload  } from 'vant'
import { Loading } from 'vant';
import { List, PullRefresh } from 'vant';
import { Overlay } from 'vant';
import { Collapse, CollapseItem } from 'vant';
import { RadioGroup, Radio, Checkbox, CheckboxGroup } from 'vant';
import { Empty } from 'vant';
import { Picker } from 'vant';
import { Dialog } from 'vant';
import { DropdownMenu, DropdownItem } from 'vant';
import { Image as VanImage } from 'vant';
import { Switch  } from 'vant';
import { Divider } from 'vant';
import { Uploader } from 'vant';
import { Field, ActionSheet, SwipeCell } from 'vant';
import { IndexBar, IndexAnchor } from 'vant';
import { Tab, Tabs } from 'vant';
import { NumberKeyboard } from 'vant';
import { PasswordInput } from 'vant';

Vue.use(Toast);
Vue.use(Col);
Vue.use(Row);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Card);
Vue.use(Button);
Vue.use(NoticeBar);
Vue.use(Icon);
Vue.use(Popup);
Vue.use(Search);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Loading);
Vue.use(List);
Vue.use(PullRefresh);
Vue.use(Overlay);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Empty);
Vue.use(Picker);
Vue.use(Dialog);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(VanImage);
Vue.use(Switch);
Vue.use(Divider);
Vue.use(Uploader);
Vue.use(ActionSheet);
Vue.use(Field);
Vue.use(SwipeCell);
Vue.use(IndexBar);
Vue.use(IndexAnchor);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(NumberKeyboard);
Vue.use(PasswordInput);

Vue.config.productionTip = false;
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
