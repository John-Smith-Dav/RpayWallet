<template>
  <div class="container">
    <div class="header">
      <van-row>
        <van-col span="2"><van-icon class="header-left-icon" @click="reply"  name="arrow-left" size="21"/></van-col>
        <van-col span="18">转账通讯录</van-col>
        <van-col span="4" class="rightCol"><van-icon class="header-left-icon" @click="addAddress"  name="plus" size="21"/></van-col>
      </van-row>
    </div>
    <div class="content">
      <van-tabs v-model="tabActive" @click="onTabClick">
        <van-tab title="最近" name="1">

            <van-row v-for="(item, index) in detailRecent" :key="index" style="padding: 10px;text-align: left;border-bottom: 1px solid #ebedf0;">
              <van-col span="4">
                <img :src="imageUrl +　item.avatar" width="30px" height="30px" style="border-radius: 50%">
              </van-col>
              <van-col span="20">
                <h5 style="padding-top: 3px" >{{item.surname}}</h5>
                <span style="font-size: 11px">{{item.oppAccountId}}</span>
              </van-col>
            </van-row>


        </van-tab>
        <van-tab title="全部" name="2">

          <van-row v-for="(item, index) in detailAll" :key="index" style="padding: 10px;text-align: left;border-bottom: 1px solid #ebedf0;">
            <van-col span="4">
              <img :src="imageUrl +　item.avatar" width="30px" height="30px" style="border-radius: 50%">
            </van-col>
            <van-col span="20">
              <h5 style="padding-top: 3px" >{{item.surname}}</h5>
              <span style="font-size: 11px">{{item.oppAccountId}}</span>
            </van-col>
          </van-row>

        </van-tab>
      </van-tabs>



    </div>
    <br>


  </div>
</template>
<script>
import Const from '../../plugins/const.js';

export default {
  data() {
    return {
      tabActive: "1",
      detailRecent: [],      // 最近列表
      detailAll: [],         // 所有列表
      imageUrl : '',
      where: ''
    }
  },
  async created() {
    this.imageUrl = Const.backDefaultServerUrl + '/api/file/image/';
    this.where = this.$route.params.where;
    // 加载数据
    await this.getDetailRecent(0, 8, "1");
  },
  methods: {
    reply() {
      if(this.where == 'transferSetting') {
        this.$router.push({
          path:'/transferSetting'
        });
      }
      if(this.where == 'transferSecond') {
        this.$router.push({
          path:'/transferSecondAccount'
        });
      }

    },
    addAddress() {
      this.$router.push({path:'/transferSettingAddressAdd/' + this.where});
    },
    onTabClick(name, title) {
      let pagNum = 0;
      if (name == "1") {
        pagNum= 8;
      }
      if (name == "2") {
        pagNum= 100;
      }
      this.getDetailRecent(0, pagNum, name);
    },
    async getDetailRecent(page, page_num, name) {
      // 获取数据
      let result = await this.axios({
        url: "/api/user/address/book/query",
        method: "post",
        headers: this.buildHeader(true),
        data: this.buildSecretBody(JSON.stringify({
          "userId": JSON.parse(this.getStorage("loginUserInfo")).userId,
          "page": page, "size": page_num
        }))
      });
      if (name == "1") {
        this.detailRecent = result.data.result.content;
      }
      if (name == "2") {
        this.detailAll = result.data.result.content;
      }

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
  .content {
    padding: 10px 15px 15px 20px;
    background: white;
    text-align: center;
  }

}
</style>
