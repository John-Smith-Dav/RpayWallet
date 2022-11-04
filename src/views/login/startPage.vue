<template >
  <div class="container" >
    <div class="header" >
      <van-row>
        <van-col span="2">&nbsp;</van-col>
        <van-col span="18">&nbsp;</van-col>
        <van-col span="4" class="rightCol"></van-col>
      </van-row>
    </div>
    <div class="content" >
      <div>
        <van-row style="padding-bottom: 30px">
          <van-col span="24" style="text-align: center"><img :src="require('../../assets/images/d_logo_white_side.png')" width="60px" height="60px"></van-col>
        </van-row>
        <van-row style="padding-bottom: 300px">
          <van-col span="24" style="text-align: center"><img :src="require('../../assets/images/w_quick_login.jpg')" width="250px" height="45px"></van-col>
        </van-row>
        <van-row>
          <van-col span="24" style="text-align: center;padding-top: 10px"></van-col>
        </van-row>
      </div>
      <div>
      </div>

    </div>

  </div>
</template>

<script>
import Const from '../../plugins/const.js';
export default {
  data() {
    return {

    }
  },
  async created() {
    await this.saveKeyCloakToken();
    // 保存APP公钥
    await this.getPublicKey();

    if (this.isEmpty(this.getStorage(Const.localStorageKeyLoginUserInfo)) && this.isEmpty(this.getStorage(Const.localStorageKeyUserName))) {
      // 没有存储用户名，也没有存储用户信息，那么是第一次打开应用，应该进入loginNoStored页面
      await this.$router.push("/loginNoStored")
    } else {
      await this.$router.push("/loginHaveStoredSecond")
    }
  },
  watch: {

  },
  methods: {
    goHelpPage() {
      this.$router.push("/helpPage")
    },
    getPublicKey() {
      this.axios({
        url: "/api/index/getAppPublicKey",
        method: "post",
        data: {
          "app_id": "vue_client_0000001"
        },
        headers: {
          'Authorization': 'Bearer ' + this.getToken()
        }
      }).then(res => {
        if (res.data && res.data.retInfo.errNo == 0 ) {
          this.saveStorage("publicKey", res.data.result.publicKey);
          this.saveStorage("serialNo", res.data.result.serialNo);
        } else {
          this.$toast.show("APP公钥获取失败，请联系管理员解决。");
        }
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
