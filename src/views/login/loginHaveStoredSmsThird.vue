<template >
  <div class="container" >
    <div class="header">
      <van-row>
        <van-col span="2"><van-icon class="header-left-icon" @click="reply"  name="arrow-left" size="21"/></van-col>
        <van-col span="18">&nbsp;</van-col>
        <van-col span="4" class="rightCol"></van-col>
      </van-row>
    </div>
    <div>
      <van-row style="padding-top: 37px;">
        <van-col span="24" style="text-align: center;" >
          <img :src="imageUrl +　avatar" alt="" width="70px" height="70px" style="border-radius: 5px">
        </van-col>
      </van-row>
      <van-row>
        <van-col span="24" style="text-align: center;font-weight: bold">
          {{ usernameShow }}
        </van-col>
      </van-row>
      <van-row style="font-weight: bold;border-bottom: 1px solid #EAECF6">
        <van-col span="15" style="text-align: center;">
          <van-field
              v-model="smsCode"
              type="smsCode"
              name="验证码"
              label="验证码"
              placeholder="请填写验证码"
              :rules="[{ required: true, message: '请填写验证码' }]"
              :onfocus="true"
          />
        </van-col>
        <van-col span="9" style="text-align: center;padding-top: 5px">
          <van-button size="small"
                      type="primary"
                      style="border-radius: 5px"
                      @click="gainCode">{{time}}
          </van-button>
        </van-col>
      </van-row>

      <van-row>
        <van-col span="24" style="padding-left: 20px;font-size: 14px;padding-top: 20px" >
          <span style="color: #1989fa" @click="goLoginWithPassword">用密码登录</span>
        </van-col>
      </van-row>
      <van-row style="padding-top: 300px;text-align: center;">
        <van-col span="24" style="text-align: center;padding-right: 15px;padding-left: 15px" >
          <van-button type="primary"  style="border-radius: 10px;width: 100%" @click="login" :loading="submitState ? true : false">登录</van-button>
        </van-col>
      </van-row>
    </div>

    <loginFooter></loginFooter>

  </div>
</template>

<script>
import Const from '../../plugins/const.js';
export default {
  data() {
    return {
      imageUrl : '',
      avatar : '',
      username: '',
      usernameShow: '',
      countryCode: '',
      smsCode: '',
      submitState: false,
      time: '获取验证码',
      isClick: true,
    }
  },
  created() {
    this.imageUrl = Const.backDefaultServerUrl + '/api/file/image/';
    this.avatar = this.getStorage(Const.localStorageKeyAvatar);
    this.username = this.getStorage(Const.localStorageKeyUserName);
    this.usernameShow = this.phoneSeparated(this.username);
    this.countryCode = this.getStorage(Const.localStorageKeyCountryCode);

  },
  watch: {

  },
  methods: {
    login() {
      this.submitState = true;
      if (this.smsCode.length <=0) {
        this.$toast.show('请输入验证码');
        this.submitState = false;
        return;
      }
      this.axios({
        url: "/api/index/login/sms",
        method: "post",
        headers: this.buildHeader(false),
        data: this.buildSecretBody(JSON.stringify({
          "phone": this.username,
          "smsCode": this.smsCode,
          "allPhone": this.countryCode + this.username
        })),
      }).then(res => {
        if (res.data && res.data.retInfo.errNo == 0 ) {
          this.$toast.show("登录成功");

          this.saveLoginStorage(res);

          this.$router.push("/home")
        } else {
          this.submitState = false;
          this.$toast.show(res.data.retInfo.message);
        }
      });

    },
    reply() {
      this.$router.push({
        path:'/loginHaveStoredSecond'
      });
    },
    async gainCode() {
      if (this.isClick) {
        if (/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(this.username)) {
          let sms = await this.axios({
            url: "/api/index/sendSms",
            method: "post",
            headers: this.buildHeader(false),
            data: this.buildSecretBody(JSON.stringify({ "phone": this.countryCode + this.username}))
          });

          this.isClick = false
          let s = 60
          this.time = s + 's'
          let interval = setInterval(() => {
            s--
            this.time = s + 's'
            if (s < 0) {
              this.time = '重新获取'
              this.isClick = true
              clearInterval(interval)
            }
          }, 1000)
        } else {
          this.$toast.show('请输入正确的手机号码');
        }
      }
    },
    goLoginWithPassword() {
      this.$router.push({
        path:'/loginHaveStoredSecond'
      });
    }
  }
}
</script>

<style lang="scss" scoped>

.container {
  .header {
    background: white;
    padding-top: 10px;
    font-size: 15px;
  }

}
</style>
