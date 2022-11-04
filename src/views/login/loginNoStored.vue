<template >
  <div class="container" >
    <!-- 选择国家 -->
    <div>
      <van-popup v-model="showSelectCountry" :lock-scroll="false"  closeable close-icon="arrow-left" close-icon-position="top-left" position="bottom">
        <div><selectCountry @on-cancel="cancel" @on-ok="handleChangeCountry"></selectCountry></div>
      </van-popup>
    </div>

    <div class="header">
      <van-row>
        <van-col span="2">&nbsp;</van-col>
        <van-col span="18">&nbsp;</van-col>
        <van-col span="4" class="rightCol"></van-col>
      </van-row>
    </div>

    <div class="content" >
      <div>
        <van-row>
          <van-col span="24" style="text-align: center"><img :src="require('../../assets/images/w_quick_login.jpg')" width="250px" height="45px"></van-col>
        </van-row>
        <van-row>
          <van-col span="24" style="text-align: center;padding-top: 10px"><span>你好，欢迎使用RPay支付</span></van-col>
        </van-row>
        <van-row style="padding-top: 280px">
          <van-col span="24" style="text-align: center;padding-left: 15px" >
            <van-row>
              <van-col span="7">
                <van-field
                    @click="setShowCountry(true)"
                    v-model="areaCode"
                    right-icon="arrow-down"
                    style="background-color: #F0F0F0;border-bottom-left-radius: 10px;border-top-left-radius: 10px;font-size: 15px;font-weight: 600"
                />
              </van-col>
              <van-col span="16" >
                <van-field autofocus="autofocus" maxlength="15"
                           v-model="username"
                           style="background-color: #F0F0F0;border-bottom-right-radius: 10px;border-top-right-radius: 10px;font-size: 15px;font-weight: 600"
                           placeholder="输入手机号，使用RPay"
                />
              </van-col>
            </van-row>
          </van-col>
        </van-row>

        <van-row style="padding-top: 10px;text-align: center;">
          <van-col span="24" style="text-align: center;padding-right: 15px;padding-left: 15px" >
            <van-button type="primary" :disabled="buttonDisabled" style="border-radius: 10px;width: 100%" @click="goNext" :loading="submitState ? true : false">同意并继续</van-button>
          </van-col>
        </van-row>

        <van-row style="text-align: center;padding-top: 10px;padding-left: 10px;font-size: 11px">
          <van-col span="24" style="text-align: center;padding-right: 15px;padding-left: 15px" >
            <van-checkbox shape="square" icon-size="13" v-model="checked">我已阅读并同意<span style="color: #1989fa">《RPay用户服务协议》</span><span style="color: #1989fa">《用户保护隐私政策》</span></van-checkbox>
          </van-col>
        </van-row>

        <loginFooter></loginFooter>

      </div>

    </div>

  </div>
</template>

<script>
import Const from '../../plugins/const.js';
export default {
  data() {
    return {
      areaCode: "+86",
      username: "",
      showSelectCountry: false,
      buttonDisabled: true,
      submitState: false,
      checked: true
    }
  },
  created() {

  },
  watch: {
    username(n, o) {
      if (n.length >= 6) {
        this.buttonDisabled = false;
      }
    }
  },
  methods: {
    cancel (){
      this.showSelectCountry = false;
    },
    setShowCountry(val) {
      this.showSelectCountry = val;
    },
    handleChangeCountry(item) {
      this.showSelectCountry = false;
      this.areaCode = "+" + item.areaCode;
    },
    goNext() {
      this.submitState = true;
      this.$router.push({path:'/loginNoStoredSecond', query:{
          areaCode: this.areaCode,
          phone: this.username
        }});
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
