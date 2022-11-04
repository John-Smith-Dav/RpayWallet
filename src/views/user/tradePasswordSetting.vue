<template>
  <div class="container">
    <HeaderD title="账户设置"></HeaderD>
    <div class="userinfo">
      <van-row style="border-bottom: 1px solid #ebedf0;">
        <van-field label="设置交易密码" v-model="accountPassword" type="password" placeholder="******"></van-field>
      </van-row>
      <van-row style="border-bottom: 1px solid #ebedf0;">
        <van-field label="交易密码确认" v-model="reAccountPassword" type="password" placeholder="******"></van-field>
      </van-row>

      <van-row style="padding-top: 300px;text-align: center;">
        <van-col span="24" style="text-align: center;padding-right: 15px;padding-left: 15px" >
          <van-button type="primary"  style="border-radius: 10px;width: 100%" @click="updateAccount">保存更改</van-button>
        </van-col>
      </van-row>

    </div>
    <br>


  </div>
</template>
<script>
import Const from '../../plugins/const.js';

export default {
  data() {
    return {
      accountInfo : {},
      accountPassword: '',
      reAccountPassword: '',

    }
  },
  async created() {
    await this.init();
  },
  methods: {
    async init() {
      // 取得登录用户账户信息
      let account = await this.axios({
        url: "/api/user/accounts/list",
        method: "post",
        headers: this.buildHeader(true),
        data: this.buildSecretBody(JSON.stringify({"userId": JSON.parse(this.getStorage("loginUserInfo")).userId}))
      });
      this.accountInfo = account.data.result[0];
      this.accountPassword = this.accountInfo.accountPassword;
      this.reAccountPassword = this.accountInfo.accountPassword;

    },
    updateAccount() {
      if (this.accountPassword.length <=0) {
        this.$toast.show('请输入交易密码');
        return;
      }
      if (this.reAccountPassword.length <=0) {
        this.$toast.show('请输入交易验证密码');
        return;
      }
      if (this.accountPassword != this.reAccountPassword) {
        this.$toast.show('验证密码必须和原密码相同');
        return;
      }
      this.axios({
        url: "/api/user/accounts/update/tradePassword",
        method: "post",
        headers: this.buildHeader(true),
        data: this.buildSecretBody(JSON.stringify({
          "accountId": this.accountInfo.accountId,
          "accountPassword": this.accountPassword,
        }))
      }).then(res => {
        if (res.data && res.data.retInfo.errNo == 0 ) {
          this.$toast.show("交易密码设置成功");

          this.init();

        } else {
          this.$toast.show(res.data.retInfo.message);
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
  background: white;
  .userinfo {
    padding: 10px 15px 15px 20px;
    background: white;
  }
  .userNav {
    background: white;
    padding: 10px 10px 6px 10px;
  }



}
</style>
