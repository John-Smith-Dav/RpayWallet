<template>
  <div class="container">
    <div>
      <div style="background-color: #fc672a;padding: 5px;padding-bottom: 15px">
        <div class="account" style="width: 100%;">
          <van-row>
            <van-col span="8">&nbsp;</van-col>
            <van-col span="8" style="text-align: center"><img :src="require('../assets/images/w_home_title.png')" width="110px" height="35px"></van-col>
            <van-col span="8" style="text-align: right;padding: 7px">
              <van-icon name="volume-o" :badge="badge" color="white" @click="$router.push('/noticeList')"/>
            </van-col>
          </van-row>
          <van-row>
            <van-col span="24">&nbsp;</van-col>
          </van-row>
          <van-row>
            <van-col span="8" style="text-align: center" @click="$router.push('/scanning')" ><img :src="require('../assets/images/w_saoyisao.png')" width="50px" height="50px"></van-col>
            <van-col span="8" style="text-align: center" @click="$router.push('/shoukuan')"><img :src="require('../assets/images/w_erweima2.png')" width="50px" height="50px"></van-col>
            <van-col span="8" style="text-align: center" @click="$router.push('/trade_detail')"><img :src="require('../assets/images/w_jiaoyimingxi.png')" width="50px" height="50px"></van-col>
          </van-row>
          <van-row>
            <van-col span="8" style="text-align: center;font-size: 13px;font-weight: 600;color: white">扫码付款</van-col>
            <van-col span="8" style="text-align: center;font-size: 13px;font-weight: 600;color: white">收款码</van-col>
            <van-col span="8" style="text-align: center;font-size: 13px;font-weight: 600;color: white">交易明细</van-col>
          </van-row>
        </div>
      </div>
      <div style="padding-bottom: 10px">
        <van-notice-bar
            v-if="showNotice"
            color="#666666"
            mode="link"
            @click="$router.push({path: '/kycSetting'})"
            :text="noticeText"
        />
      </div>
    </div>


      <div  style="padding-top: 15px;padding-left: 8px;padding-bottom:15px;font-size: 13px;background-color: white">
        <van-row>
          <van-col span="6" style="text-align: center" @click="goTransferFirst"><img :src="require('../assets/images/w_zhuanzhang2.png')" width="30px" height="30px"></van-col>
          <van-col span="6" style="text-align: center" @click="goRecharge"><img :src="require('../assets/images/w_congzhi.png')" width="30px" height="30px"></van-col>
          <van-col span="6" style="text-align: center"><img :src="require('../assets/images/w_xinyongka.png')" width="30px" height="30px"></van-col>
          <van-col span="6" style="text-align: center"><img :src="require('../assets/images/w_shenghuo.png')" width="30px" height="30px"></van-col>
        </van-row>
        <van-row >
          <van-col span="6" style="text-align: center" @click="goTransferFirst">转账</van-col>
          <van-col span="6" style="text-align: center"  @click="goRecharge">充值</van-col>
          <van-col span="6" style="text-align: center">提现</van-col>
          <van-col span="6" style="text-align: center">生活交费</van-col>
        </van-row>
      </div>


      <div style="padding-top: 8px;">
        <van-row>
          <van-col span="24" style="text-align: center"><img :src="require('../assets/images/w_adv.png')" width="100%" height="100px" @click="goShopping()"></van-col>
        </van-row>
      </div>
      <div style="">
        <van-row>
          <van-col span="24" style="text-align: center"><img :src="require('../assets/images/w_bottom.jpg')" width="100%" height="200px"></van-col>
        </van-row>
      </div>
    </div>



</template>
<script>

import Const from "@/plugins/const";

export default {
  name: "home",
  data() {
    return {
      badge: 0,
      loginUserInfo: {},
      showNotice: false,
      noticeText: ''
    };
  },
  watch: {

  },
  mounted() {

  },
  created() {
    this.saveKeyCloakToken();
    this.getNoticeCount();
  },
  destroyed() {

  },
  methods: {
    goTransferFirst() {
      this.$router.push({path:'/transferFirst/'});
    },
    goShopping() {
      this.$router.push({path:'/iFrameShop', query:{ url: "https://ry02.gskwin.com:10106/payTestFirst" }});
    },
    goRecharge() {
      this.$router.push({path:'/recharge'});
    },
    async getNoticeCount() {
      let loginUser = this.getStorage("loginUserInfo");
      if (loginUser != null && loginUser != '' && loginUser != 'undefined') {
        this.loginUserInfo = JSON.parse(loginUser);
        if (this.loginUserInfo.auditStatus == 0) {
          this.showNotice = true;
          this.noticeText = '您尚未实名认证，只能使用部分功能，请上传身份证照并通过认证';
        }
        if (this.loginUserInfo.auditStatus == 3) {
          this.showNotice = true;
          this.noticeText = '您未通过实名认证，请再次上传身份信息进行认证';
        }

        let res = await this.axios({
          url: "/api/services/rpay/user/notices/query_count",
          method: "post",
          headers: this.buildHeader(true),
          data: this.buildSecretBody(JSON.stringify({ "userId": this.loginUserInfo.userId, "readFlag": "0"}))
        });
        this.badge = res.data.result;
      }
    },


  }
};
</script>
<style lang="scss" scoped>
.container {
  min-height: 100vh;
  height: 100%;
  //background: #f1f2f6;

}
</style>
