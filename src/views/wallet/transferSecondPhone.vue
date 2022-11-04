<template>
  <div class="container">
    <div class="header">
      <van-row>
        <van-col span="2"><van-icon class="header-left-icon" @click="reply"  name="arrow-left" size="21"/></van-col>
        <van-col span="18">转账到手机号</van-col>
        <van-col span="4" ></van-col>
      </van-row>
    </div>
    <div class="content">
      <van-row>
        <van-cell-group inset>
          <van-field v-model="oppPhoneId"
                     name="收款人手机号"
                     label="收款人手机号"
                     type="text"
                     placeholder="收款人手机号"
                     style="font-size: 13px"

          >
          </van-field>
        </van-cell-group>

      </van-row>
      <van-row style="padding-top: 30px;text-align: center;">
        <van-col span="24" style="text-align: center;padding-right: 15px;padding-left: 15px" >
          <van-button type="primary" :disabled="buttonDisabled" style="border-radius: 10px;width: 100%" @click="goNext" :loading="submitState ? true : false">下一步</van-button>
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
      buttonDisabled: true,
      submitState: false,
      oppPhoneId: "",
    }
  },
  created() {
  },
  watch: {
    oppPhoneId(n, o) {
      if (n.length >= 6) {
        this.buttonDisabled = false;
      }
    }
  },
  methods: {
    reply() {
      this.$router.push("/transferFirst")
    },
    async goNext() {
      // 判断手机号是否存在
      let userInfo = await this.axios({
        url: "/api/user/phone",
        method: "post",
        headers: this.buildHeader(true),
        data: this.buildSecretBody(JSON.stringify({
          "phone": this.oppPhoneId
        }))
      });
      if (this.isEmpty(userInfo.data.result)) {
        this.$toast.show('该手机号不存在');
        return;
      } else {
        this.axios({
          url: "/api/user/accounts/list",
          method: "post",
          headers: this.buildHeader(true),
          data: this.buildSecretBody(JSON.stringify({
            "userId": userInfo.data.result.userId
          }))
        }).then(res => {
          if (res.data.result.length < 1) {
            this.$toast.show('该手机号对应的账户不存在');
            return;
          } else {
            this.$router.push({path:'/transferThird', query:{ oppAccountId:res.data.result[0].accountId }});
          }
        });

      }

     //
    },


  }
}
</script>
<style lang="scss" scoped>
.container {
  min-height: 100vh;
  height: 100%;
  background: $d_header_bg;
  .header {
    height: 50px;
    width: 100%;
    padding-top: 10px;
    color: $d_font_black;
    font-size: 16px;
    font-weight: bold;
    text-align: center;

  }
  .content {

    border-radius: 5px;
    text-align: center;
    font-weight: bold;
  }

}
</style>
