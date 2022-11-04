<template>
  <div class="container">
    <div class="userinfo">
      <van-row>
        <van-col span="5"> <img :src="imageUrl +　userInfo.avatar" width="50px" height="50px" v-if="userInfo.avatar != ''"></van-col>
        <van-col span="19">
          <h3>
            <van-row>
              <van-col span="20">
                {{userInfo.surname}}
                <span v-if="userInfo.auditStatus == 1" style="font-size: 10px;color:darkred;">已提交认证</span>
                <span v-if="userInfo.auditStatus == 0" style="font-size: 10px;color:darkred;" >未认证</span>
                <span v-if="userInfo.auditStatus == 2" style="font-size: 10px;color:darkred;">认证通过</span>
                <span v-if="userInfo.auditStatus == 3" style="font-size: 10px;color:darkred;">未通过认证</span>
              </van-col>
              <van-col span="4" style="text-align: right" @click="$router.push('/userSetting')"><van-icon name="arrow" /></van-col>
            </van-row>
          </h3>
          <span style="font-size: 10px">卡号：</span><span style="font-size: 10px">{{accountInfo.accountId}}</span><br>
          <span style="font-size: 11px;font-weight: 600">余额：</span><span style="font-size: 11px;font-weight: 600">{{accountInfo.amount}}</span>
        </van-col>
      </van-row>
    </div>
    <br>
    <div class="userNav" style="border-bottom: 1px solid #ebedf0;">
      <van-row>
        <van-col span="3"> <img :src="require('../../assets/images/w_zhanghushezhi.png')" style="width: 30px;height: 30px"> </van-col>
        <van-col span="12" @click="$router.push('/accountSetting')" style="margin-top: 5px">  <h5>账户设置</h5> </van-col>
      </van-row>
    </div>

    <div class="userNav" style="border-bottom: 1px solid #ebedf0;">
      <van-row>
        <van-col span="3"> <img :src="require('../../assets/images/w_tradePassword.png')" style="width: 30px;height: 30px"> </van-col>
        <van-col span="12" @click="$router.push('/tradePasswordSetting')" style="margin-top: 5px">  <h5>交易密码设置</h5> </van-col>
      </van-row>
    </div>

    <div class="userNav" style="border-bottom: 1px solid #ebedf0;">
      <van-row>
        <van-col span="3"> <img :src="require('../../assets/images/w_zhangdanmingxi.png')" style="width: 30px;height: 30px"> </van-col>
        <van-col span="12" @click="$router.push('/trade_detail')" style="margin-top: 5px">  <h5>账单明细</h5> </van-col>
      </van-row>
    </div>

    <div class="userNav" style="border-bottom: 1px solid #ebedf0;">
      <van-row>
        <van-col span="3"> <img :src="require('../../assets/images/w_zhuanzhangguanli.png')" style="width: 30px;height: 30px"> </van-col>
        <van-col span="12" @click="$router.push('/transferSetting')" style="margin-top: 5px">  <h5>转账管理</h5> </van-col>
      </van-row>
    </div>


    <div class="userNav" style="border-bottom: 1px solid #ebedf0;">
      <van-row>
        <van-col span="3"> <img :src="require('../../assets/images/w_shiming.png')" style="width: 30px;height: 30px"> </van-col>
        <van-col span="12" @click="$router.push('/kycSetting')" style="margin-top: 5px">  <h5>实名认证</h5> </van-col>
      </van-row>
    </div>

    <br>
    <div class="userNav">
      <van-row>
        <van-col span="3"> <img :src="require('../../assets/images/d_my_share.png')" style="width: 30px;height: 30px"> </van-col>
        <van-col span="12" @click="logout" style="margin-top: 5px">  <h5>退出登录</h5> </van-col>
      </van-row>
    </div>

  </div>
</template>
<script>
import Const from '../../plugins/const.js';

export default {
  data() {
    return {
      avatarBase64: "",
      userInfo: {},
      accountInfo: {},
      imageUrl : ''
    }
  },
  async created() {
    this.imageUrl = Const.backDefaultServerUrl + '/api/file/image/';
    await this.init();
  },
  methods: {
    async init() {
      await this.getUserInfo();
    },
    logout() {
      this.$router.push("/quickLogin")
      this.clearStorage("loginUserInfo")
    },
    async getUserInfo() {
      await this.axios({
        url: "/api/user/one",
        method: "post",
        headers: this.buildHeader(true),
        data: this.buildSecretBody(JSON.stringify({
          "userId": JSON.parse(this.getStorage("loginUserInfo")).userId
        }))
      }).then(res => {
        if (res.data && res.data.result) {
          this.userInfo = res.data.result.userInfo;
          this.accountInfo = res.data.result.userAccounts[0];

          this.saveStorage("loginUserInfo",JSON.stringify( res.data.result.userInfo))

        }
      }).catch(e => {
        console.log(e);
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  min-height: 100vh;
  height: 100%;
  background: #F1F2F6;
  .userinfo {
    padding: 40px 15px 15px 20px;
    background: white;
  }
  .userNav {
    background: white;
    padding: 10px 10px 6px 10px;
  }



}
</style>
