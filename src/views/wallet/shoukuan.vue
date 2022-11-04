<template>
  <section class="shoukuan">

    <HeaderD title="收款码" ></HeaderD>
    <div class="content">
      <div class="tab-address">
        <span>人民币</span>
      </div>
      <div class="erwema">
        <rQrcode :qrcodeContent="JSON.stringify(qrcodeContentJson)"/>
      </div>
      <div class="adderss">{{qrcodeContentJson.oppAccountId}}</div>
      <r-copy :copyText="qrcodeContentJson.oppAccountId">
        <div class="copy" style="color: gray;">点击可复制</div>
      </r-copy>
    </div>

  </section>
</template>
<script>

export default {
  name: "shoukuan",
  data() {
    return {
      qrcodeContentJson: {}
    };
  },
  async created (){
    await this.getAccountInfo(JSON.parse(this.getStorage("loginUserInfo")).userId);
  },
  methods: {
    getAccountInfo: async function(userId) {
      let accountInfo = await this.axios({
          url: "/api/user/accounts/list",
          method: "post",
          headers: this.buildHeader(true),
          data: this.buildSecretBody(JSON.stringify({ "userId": userId}))

      });
      // 第一版默认就一个账户、如果有多个账户修改这个
      let content = {};
      content.oppAccountId = accountInfo.data.result[0].accountId;
      //content.prepayId = '';
      //content.totalAmount = '';
      this.qrcodeContentJson = content;
    }
  }
};
</script>
<style lang="scss" scoped>
@media screen and (min-height: 600px) {
  .erweim {
    position: absolute;
    bottom: 40px;
    margin: 0 !important;

  }
}
.tab-address{
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: center;
  span{
    flex: 1;
    font-size: 16px;
    color: $d_font_black;
    &.active{
      cursor: pointer;
      color: $d_font_blue;
    }
  }
}
.shoukuan {
  /*background: #0693C2;*/
  background: url("../../assets/images/d_shoukuan_bg.png");
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  text-align: center;
  display: block;
  box-sizing: border-box;
  .content {
    margin: 50px 5% 0 5%;
    width: 90vw;
    // max-width: 400px;
    // height: 70vh;
    height: 400px;
    overflow: hidden;
    background: url("../../assets/images/qr_bj@2x(1).png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    text-align: center;
    .erwema {
      margin:  0 auto;
      /*margin-top: 45px;*/
      width: 220px;
      height: 220px;
      img {
        width: 220px;
        height: 220px;
      }
      p{
        color: $color1;
      }
    }
    .adderss {
      overflow: hidden;
      margin-top: 60px;
      text-align: center;
      overflow-x: scroll;
      padding: 0 5px;
      font-size: 12px;
      color: $d_font_black;
    }
    .adderss::-webkit-scrollbar {
      display: none;
    }
    .copy {
      margin-top: 10px;
      font-size: 12px;
      text-align: center;
      font-weight: 400;
      color: $up;
    }
  }
  .coloractive {
    color: $d_font_black;
  }
  .erweim {
    width: 100%;
    margin: 40px 0;
    display: flex;
    justify-content: space-around;
    .erbox {
      color: $d_font_black;
      font-size: 14px;
      font-weight: bold;
      img {
        width: 30px;
        height: 30px;
        margin-bottom: 10px;
      }
    }
  }
}
.contentTitle {
  color: $d_font_gray1;
  padding-top: 10px;
}
.tip {
  padding-left: 25px;
  text-align: left;
  color: $d_font_white;
  font-size: 12px;
  padding-top: 10px;
}

</style>
