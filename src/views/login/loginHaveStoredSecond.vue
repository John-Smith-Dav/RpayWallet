<template >
  <div class="container" >
    <div>
      <van-row style="padding-top: 70px;">
        <van-col span="24" style="text-align: center;" >
          <img :src="imageUrl +　avatar" alt="" width="70px" height="70px" style="border-radius: 5px">
        </van-col>
      </van-row>
      <van-row>
        <van-col span="24" style="text-align: center;font-weight: bold">
          {{ usernameShow }}
        </van-col>
      </van-row>

      <van-row style="border-bottom: 1px solid #EAECF6">
        <van-col span="24" style="text-align: center;font-weight: bold">
          <van-field v-model="password"
                     name="密码"
                     label="密码"
                     type="password"
                     placeholder="请填写RPay密码"
                     :rules="[{ required: true, message: '请填写RPay密码' }]"
          />
        </van-col>
      </van-row>
      <van-row>
        <van-col span="24" style="padding-left: 20px;font-size: 14px;padding-top: 20px" >
          <span style="color: #1989fa" @click="goHaveStoredSmsThird">用短信验证码登录</span>
        </van-col>
      </van-row>
      <van-row style="padding-top: 300px;text-align: center;">
        <van-col span="24" style="text-align: center;padding-right: 15px;padding-left: 15px" >
          <van-button type="primary"  style="border-radius: 10px;width: 100%" @click="login" :loading="submitState ? true : false">登录</van-button>
        </van-col>
      </van-row>

      <loginFooter></loginFooter>

    </div>

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
      password: '',
      submitState: false
    }
  },
  created() {
    this.imageUrl = Const.backDefaultServerUrl + '/api/file/image/';
    this.avatar = this.getStorage(Const.localStorageKeyAvatar);
    this.username = this.getStorage(Const.localStorageKeyUserName);
    this.usernameShow = this.phoneSeparated(this.username);

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
        }))

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
    goHaveStoredSmsThird() {
      this.$router.push({
        path:'/loginHaveStoredSmsThird',
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
