<template>
    <div class="container">
      <HeaderD title="重置登录密码"></HeaderD>
      <div class="content" >
        <van-row>
          <van-col span="24" style="text-align: center;font-weight: bold;border-bottom: 1px solid #EAECF6">
            <van-field v-model="password"
                       name="登录密码"
                       label="登录密码"
                       type="password"
                       placeholder="请输入登录密码"
                       :rules="[{ required: true, message: '请输入登录密码' }]"
            />
          </van-col>
        </van-row>
        <van-row style="font-weight: bold;">
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
          <van-col span="24" style="font-size: 12px;padding-top: 5px;padding-left: 15px">
            <span>免费验证码短信将会发送至手机号{{mobileFilter(username)}}</span>
          </van-col>
        </van-row>

        <van-row style="padding-top: 20px;text-align: center;">
          <van-col span="24" style="text-align: center;padding-right: 15px;padding-left: 15px" >
            <van-button type="primary" style="border-radius: 10px;width: 100%" @click="goNext" >确定</van-button>
          </van-col>
        </van-row>
      </div>


  </div>
</template>

<script>

import Const from "@/plugins/const";

export default {
  data() {
    return {
      username : "",
      countryCode: "",
      password : "",
      smsCode: '',
      submitState: false,
      time: '获取验证码',
      isClick: true,
    }
  },
  watch: {

  },
  components: {

  },
  created() {
    this.username = this.$route.query.username;
    this.countryCode = this.$route.query.countryCode;
  },
  methods: {
    goNext() {
      this.submitState = true;
      if (this.password.length <=0) {
        this.$toast.show('请输入密码');
        this.submitState = false;
        return;
      }
      if (this.smsCode.length <=0) {
        this.$toast.show('请输入验证码');
        this.submitState = false;
        return;
      }
      this.axios({
        url: "/api/index/update/password",
        method: "post",
        headers: this.buildHeader(true),
        data: this.buildSecretBody(JSON.stringify({ "username": this.username, "smsCode": this.smsCode, "password": this.password, "allPhone": this.countryCode + this.username})),
      }).then(res => {
        if (res.data && res.data.retInfo.errNo == 0 ) {
          this.$toast.show("密码重置成功");
          this.$router.push("/startPage")
        } else {
          this.submitState = false;
          this.$toast.show(res.data.retInfo.message);
        }
      });

    },
    async gainCode() {
      if (this.isClick) {
        if (/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(this.username)) {
          let sms = await this.axios({
            url: "/api/index/sendSms",
            method: "post",
            headers: this.buildHeader(true),
            data: this.buildSecretBody(JSON.stringify({ "phone": this.countryCode + this.username}))
          });
          if (sms.data.retInfo.errNo != 0 ) {
            this.$toast.show(sms.data.retInfo.message);
          }

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
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding-top: 30px;
}
</style>
