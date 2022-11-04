<template>
  <div id="app" style="padding-bottom: constant(safe-area-inset-bottom);">
    <router-view/>
    <div v-if="showNav" class="bg navall">
      <router-link tag="a" to="/home" :class="($route.name=='empty'||$route.name=='home')?'nav-active':''">
        <div class="thenav">
          <!--          <img :src="require('./assets/images/d_home_press@2x.png')" alt="" srcset="" v-if="$route.name=='home'" >
                    <img :src="require('./assets/images/d_home@2x.png')" alt="" srcset="" v-else >-->
          <van-icon name="home-o"/>
          <span class="nav-title">{{ $t('home.home') }}</span>
        </div>
      </router-link>
      <router-link tag="a" to="/home" :class="$route.name=='community'?'nav-active':''">
        <div class="thenav">
          <!--          <img :src="require('./assets/images/d_dapp_press@2x.png')" alt="" srcset="" v-if="$route.name=='community'" >
                    <img :src="require('./assets/images/d_dapp@2x.png')" alt="" srcset="" v-else >-->
          <van-icon name="friends-o"/>
          <span class="nav-title">通讯录</span>
        </div>
      </router-link>
      <router-link tag="a" to="/home" :class="$route.name=='dapp'?'nav-active':''">
        <div class="thenav">
          <!--          <img :src="require('./assets/images/d_wallet_press@2x.png')" alt="" srcset="" v-if="$route.name=='dapp'" >
                    <img :src="require('./assets/images/d_wallet@2x.png')" alt="" srcset="" v-else >-->
          <van-icon name="fire-o"/>
          <span class="nav-title">{{ $t('lang185') }}</span>
        </div>
      </router-link>
      <router-link tag="a" to="/user" :class="$route.name=='user'?'nav-active':''">
        <div class="thenav">
          <!--          <img :src="require('./assets/images/d_my_press@2x.png')" alt="" srcset="" v-if="$route.name=='user'" >
                    <img :src="require('./assets/images/d_my@2x.png')" alt="" srcset="" v-else >-->
          <van-icon name="contact"/>
          <span class="nav-title">{{ $t('my') }}</span>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import {mapState} from "vuex";
import {Dialog} from 'vant';
import Const from './plugins/const.js';
export default {
  name: "app",
  data() {
    return {
      routeList: ['home', 'community', 'dapp', 'user', 'iFrameShop'],
    };
  },
  watch: {
    "$route"(n, o) {
      this.showStatusBarColor(n)
      this.showBottomNav()
      this.loginPage();
    },
    connected() {
      this.loginPage();
      // if(this.connected == false){
      //     this.$toast.show(this.$t('lang154'));
      // }
    },
  },
  methods: {
    initOtc() {
      // plus.webview.create('otc/index.html', 'otc', {
      //     kernel : 'UIWebview'
      // });
      plus.webview.create('otc/index.html', 'otc');

    },
    otc() {
      if (typeof plus == 'object') {
        var h = plus.webview.getWebviewById('otc');
        h.show();
        console.log("应用首页Webview窗口：" + h.getURL());
      }
    },
    dispark() {
      this.$toast.show(this.$t('dispark'));
    },
    backbutton() {
      let self = this;
      var first = null;
      plus.key.addEventListener('backbutton', function (e) {
        console.log("backbutton");
        let webview = plus.webview.getLaunchWebview();
        console.log("webview.id", webview.id);
        webview.canBack(function (e) {
          if (e.canBack && self.$route.name != "home" && self.$route.name != "login") {
            if ((self.$route.name == "zhuanqian" && self.$route.params.toAddress) || (self.$route.name == "zhuanqian2" && self.$route.params.toAddress) || (self.$route.name == "binding" && self.$route.params.invite)) {
              self.$router.go(-3);
            } else {
              self.$router.go(-1);
            }
          } else {
            //首次按键，提示‘再按一次退出应用’
            if (!first) {
              first = new Date().getTime(); //获取第一次点击的时间戳
              plus.nativeUI.toast("再按一次退出应用", {
                duration: 'short'
              }); //通过H5+ API 调用Android 上的toast 提示框
              setTimeout(function () {
                first = null;
              }, 1000);
            } else {
              // 获取第二次点击的时间戳, 两次之差 小于 1000ms 说明1s点击了两次,
              if (new Date().getTime() - first < 1000) {
                plus.runtime.quit(); //退出应用
              }
            }
            /*plus.nativeUI.confirm(self.$t('exitAPP'), function (e) {
              if (e.index == 0) {
                plus.runtime.quit();
              }
              ;
            }, self.$t('title'));*/
          }
          ;
        });
      });
    },
    plusReady() {
      // del by lnf TODO
      /* if(!/offlinewallet/gi.test(navigator.userAgent)){
         return false;
       };*/
      let self = this;
      if (window.plus) {
        setTimeout(function () {
          self.initOtc();
          self.updateApp();
          self.backbutton();
        }, 0);
      } else {
        document.addEventListener("plusready", function () {
          self.initOtc();
          self.updateApp();
          self.backbutton();
        }, false);
      }
    },
    removeLoad() {
      setTimeout(() => {
        if (document.querySelector("#app-load")) {
          document.querySelector("#app-load").remove();
        }
      }, 500);
    },
    showBottomNav() {
      this.$store.commit("showNav", this.shouldShowBottomNav());
    },
    shouldShowBottomNav() {
      return this.routeList.indexOf(this.$route.name) > -1
    },
    loginPage() {
      if (this.$route.name == 'download') {
        /*setTimeout(() => {
          this.$store.commit('nav3DState', false);
        }, 3000);*/
      }
      if (this.isEmpty(this.getStorage(Const.localStorageKeyLoginUserInfo))
          && (this.$route.name != 'download'
          && this.$route.name != 'loginNoStored'
          && this.$route.name != 'loginNoStoredSecond'
          && this.$route.name != 'loginNoStoredSmsThird'
          && this.$route.name != 'loginHaveStoredSecond'
          && this.$route.name != 'loginHaveStoredSmsThird'
          && this.$route.name != 'findPassword'
          && this.$route.name != 'findPasswordSecond'
          && this.$route.name != 'home'
          && this.$route.name != ''
          && this.$route.name != 'startPage'
          && this.$route.name != 'registration'
          && this.$route.name != 'registerSms'
          && this.$route.name != 'lang')) {

        this.toRoute('/startPage');

      }

    },
    showStatusBarColor(n) {
      if (window.plus) {
        if (n.name == "user" || n.name == "home" || n.name == "community" || n.name == "" || n.name == "iFrameShop") {  //需要状态栏变色的页面
         /* plus.navigator.setStatusBarBackground("#fc672a")
          plus.navigator.setStatusBarStyle("light")*/
          plus.navigator.setStatusBarBackground("#FAFBFC")
          plus.navigator.setStatusBarStyle("dark")
        } else if (n.name == "login") {
          plus.navigator.setStatusBarBackground("#ffffff")
          plus.navigator.setStatusBarStyle("dark")
        } else {
          plus.navigator.setStatusBarBackground("#FAFBFC")
          plus.navigator.setStatusBarStyle("dark")
        }
      }
    }
  },
  created() {
    this.removeLoad();
    this.plusReady();

  },
  mounted() {
    this.showBottomNav();
  },
  computed: {
    ...mapState(['showNav'])
  },
};
</script>

<style lang="scss">
body, html {
  padding: 0;
  margin: 0;
  background: $d_bg;
}

#app {
  .nav3D {
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  font-family: "PingFang", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: $d_bg;

  .navall {
    background: $d_white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /*border-radius: 25px 25px 0px 0px;*/
    border-top: 1px solid $d_header_bottom_border;
    position: fixed;
    width: 100vw;
    height: 50px;
    bottom: 0;
    left: 0;
    z-index: 10;

    a, a:active {
      text-decoration: none;
    }

    .nav-active {
      color: $d_font_blue;

      span {
        color: $d_font_blue !important;
      }
    }

    .thenav {
      display: flex;
      flex-direction: column;
      align-items: center;
      line-height: 1.4;

      img {
        width: 18px;
        height: 18px;
        padding-bottom: 2px;
      }

      span {
        font-size: 12px;
        font-weight: 550;
        color: $d_font_gray;
      }
    }
  }
}

// xm 2019/11/19
</style>
