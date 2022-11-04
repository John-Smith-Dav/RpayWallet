<template >
  <div class="container" >
    <div class="header">
      <van-row>
        <van-col span="2"><van-icon class="header-left-icon" @click="reply"  name="arrow-left" size="21"/></van-col>
        <van-col span="18">&nbsp;</van-col>
        <van-col span="4" class="rightCol"></van-col>
      </van-row>
    </div>

    <div class="content" >
      <div>

        <van-row>
          <van-col span="24" style="text-align: center;font-size: 20px;font-weight: bold">手机号登录</van-col>
        </van-row>
        <van-row style="font-weight: bold;">
          <van-col span="24" style="text-align: center;padding-top: 20px">
            <van-field
                v-model="tel"
                name="手机号"
                label="手机号"
                :placeholder="tel"
                readonly
            />
            <van-field
                v-model="password"
                type="password"
                name="密码"
                label="密码"
                placeholder="请填写RPay密码"
                :rules="[{ required: true, message: '请填写RPay密码' }]"
                :onfocus="true"
            />
          </van-col>
        </van-row>
        <van-row >
          <van-divider></van-divider>
        </van-row>
        <van-row>
          <van-col span="24" style="padding-left: 20px;font-size: 14px" >
            <span style="color: #1989fa" @click="goNoStoredSmsThird">用短信验证码登录</span>
          </van-col>
        </van-row>
        <van-row style="padding-top: 270px;text-align: center;">
          <van-col span="24" style="text-align: center;padding-right: 15px;padding-left: 15px" >
            <van-button type="primary"  style="border-radius: 10px;width: 100%" @click="login" :loading="submitState ? true : false">登录</van-button>
          </van-col>
        </van-row>
      </div>
      <loginFooter></loginFooter>
    </div>

  </div>
</template>

<script>
import Const from '../../plugins/const.js';
export default {
  data() {
    return {
      tel: "+86",
      areaCode: '',
      username: '',
      password: '',
      submitState: false
    }
  },
  created() {
    this.areaCode = this.$route.query.areaCode;
    this.tel =this.areaCode +  this.$route.query.phone;
    this.username = this.$route.query.phone;
  },
  watch: {

  },
  methods: {
    login() {
      this.submitState = true;
      if (this.password.length <=0) {
        this.$toast.show('请输入登录密码');
        this.submitState = false;
        return;
      }
      this.axios({
        url: "/api/index/login",
        method: "post",
        headers: this.buildHeader(false),
        data: this.buildSecretBody(JSON.stringify({
          "username": this.username,
          "userPassword": this.password
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
        path:'/loginNoStored',
        query:{ areaCode: this.areaCode, phone: this.username }
      });
    },
    goNoStoredSmsThird() {
      this.$router.push({
        path:'/loginNoStoredSmsThird',
        query:{ areaCode: this.areaCode, phone: this.username }
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
  .content {
    padding-top: 50px;
  }

}
</style>
