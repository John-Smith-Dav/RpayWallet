<template>
  <div class="container">
    <div class="header">
      <van-row>
        <van-col span="2"><van-icon class="header-left-icon" @click="reply"  name="arrow-left" size="21"/></van-col>
        <van-col span="18"></van-col>
        <van-col span="4" class="rightCol"></van-col>
      </van-row>
    </div>
    <div class="content">
      <van-row >
        <van-col span="24" style="text-align: center;font-size: 20px;font-weight: bold;padding-top: 20px">
          <span>请选择转账方式</span>
        </van-col>
      </van-row>

      <van-row >
        <van-col span="24" style="text-align: center;font-size: 20px;font-weight: bold;padding-top: 20px">
          <van-divider></van-divider>
        </van-col>
      </van-row>

      <van-row style="border-bottom: 1px solid #EAECF6;padding-bottom: 15px" @click="$router.push('/transferSecondAccount')">
        <van-col span="4" style="text-align: center;">
          <img :src="require('../../assets/images/w_account.png')" style="width: 30px;height: 30px">
        </van-col>
        <van-col span="16" style="text-align: left;">
          <span>向卡号转账</span><br>
          <span style="font-size: 11px">输入卡号，可转账至对方账户</span>
        </van-col>
        <van-col span="4" style="text-align: center;">
          <van-icon name="arrow" />
        </van-col>
      </van-row>
      <van-row style="padding-top: 15px" @click="$router.push('/transferSecondPhone')">
        <van-col span="4" style="text-align: center;">
          <img :src="require('../../assets/images/w_phone.png')" style="width: 30px;height: 30px">
        </van-col>
        <van-col span="16" style="text-align: left;">
          <span>向手机号转账</span><br>
          <span style="font-size: 11px">输入手机号，可转账至对方账户</span>
        </van-col>
        <van-col span="4" style="text-align: center;">
          <van-icon name="arrow" />
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
    }
  },
  created() {
  },
  methods: {
    reply() {
      this.$router.push("/home")
    },


  }
}
</script>
<style lang="scss" scoped>
.container {
  min-height: 100vh;
  height: 100%;
  background: white;
  .header {
    background: $d_header_bg;
    height: 50px;
    width: 100%;
    border-bottom: 1px solid $d_header_bottom_border;
    padding-top: 10px;
    color: $d_font_black;
    font-size: 16px;
    font-weight: bold;
    text-align: center;

  }
  .content {
    padding: 10px 15px 15px 20px;
    background: white;
    text-align: center;
  }

}
</style>
