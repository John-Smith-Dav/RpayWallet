<template>
  <section class="zhuanqian">
    <div class="header">
      <van-row>
        <van-col span="2">
          <van-icon class="header-left-icon" @click="toHome" name="arrow-left" size="21"/>
        </van-col>
        <van-col span="20">
          <span>支付结果</span>
        </van-col>
        <van-col span="2" class="rightCol">
          <van-icon name="balance-list-o"  size="25" style="padding-top: 3px" @click="$router.push('/trade_detail')"/>
        </van-col>
      </van-row>
    </div>

    <div class="cointype">
      <van-row>
        <van-col span="24">
          <van-icon name="checked" color="#1989fa"/><span style="color: #1989fa">支付成功</span>
        </van-col>
      </van-row>
    </div>

    <div class="cointype">
      <van-row>
        <van-col span="24">
          <img :src="imageUrl +　toUserInfo.avatar" width="50px" height="50px">
        </van-col>
      </van-row>
      <van-row>
        <van-col span="24">
          <span>{{toUserInfo.surname}}</span>
        </van-col>
      </van-row>

    </div>

    <div class="cointype">
      <van-row>
        <van-col span="24">
         <h2>¥{{num}}</h2>
        </van-col>
      </van-row>

    </div>

    <div class="btn" @click="toHome" style="background: #1989fa"> 完成</div>

  </section>
</template>
<script>
import Const from "@/plugins/const";

export default {
  name: "zhuanqian_result",
  data() {
    return {
      toUserId : '',
      toUserInfo : {},
      imageUrl : '',
      num : '',
      notifyUrl : ''
    };
  },
  async created (){
    this.imageUrl = Const.backDefaultServerUrl + '/api/file/image/';
    if(this.$route.query.result){
      this.toUserId = this.$route.query.result;
    }
    if(this.$route.query.num){
      this.num = this.$route.query.num;
    }
    if(this.$route.query.notifyUrl){
      this.notifyUrl = this.$route.query.notifyUrl;
    }
    await this.init();
  },
  watch : {

  },
  methods: {
    init: async function () {
      let toUserInfo = await this.axios({
        url: "/api/user/info",
        method: "post",
        headers: this.buildHeader(true),
        data: this.buildSecretBody(JSON.stringify({"userId": this.toUserId}))
      });
      // 第一版默认就一个账户、如果有多个账户修改这个
      this.toUserInfo = toUserInfo.data.result;
    },
    toHome() {
      if (this.isEmpty(this.notifyUrl)) {
        this.$router.push("/home")
      } else {
        this.$router.push({path:'/iFrameShop', query:{ url: this.notifyUrl }});
      }
    }
  }
};
</script>
<style lang="scss" scoped>
// 转钱    ---     选择币种
.zhuanqian {
  text-transform: uppercase;
  background: $d_bg_grey1;
  height: 100%;
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

    .header-left-icon {
      top: 2px;
    }

    .text_r {
      position: absolute;
      right: 15px;
      font-size: 14px;
      color: $d_font_gray1;
    }
  }

  .cointype {
    padding: 20px;
    text-align: center;
  }
}
</style>
