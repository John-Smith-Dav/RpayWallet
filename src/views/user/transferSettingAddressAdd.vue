<template>
  <div class="container">
    <div class="header">
      <van-row>
        <van-col span="2"><van-icon class="header-left-icon" @click="reply"  name="arrow-left" size="21"/></van-col>
        <van-col span="18">添加账号</van-col>
        <van-col span="4" class="rightCol"></van-col>
      </van-row>
    </div>
    <div class="content">
      <van-row style="border-bottom: 1px solid #ebedf0;">
        <van-field v-model="oppUsername"
                   name="收款人账户名"
                   label="收款人账户名"
                   type="text"
                   placeholder="请输入收款人账户名/电话"
                   :rules="[{ required: true, message: '请输入收款人账户名/电话' }]"
                   />
      </van-row>
      <van-row style="border-bottom: 1px solid #ebedf0;">
        <van-field v-model="oppAccountId"
                   name="收款人账号"
                   label="收款人账号"
                   type="text"
                   placeholder="请输入收款人账号"
                   :rules="[{ required: true, message: '请输入收款人收款人账号' }]"
        />
      </van-row>
      <van-row style="border-bottom: 1px solid #ebedf0;">
        <van-field v-model="remark"
                   name="备注信息"
                   label="备注信息"
                   type="text"
                   placeholder="请输入备注信息(选填)"
        />
      </van-row>
      <van-row style="padding-top: 300px;text-align: center;">
        <van-col span="24" style="text-align: center;padding-right: 15px;padding-left: 15px" >
          <van-button type="primary"  style="border-radius: 10px;width: 100%" @click="submitAddAddress" :loading="submitState ? true : false">确定</van-button>
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
      userId: "",
      oppUsername: "",
      oppAccountId: "",
      remark: "",
      submitState: false

    }
  },
  async created() {
    this.userId = JSON.parse(this.getStorage("loginUserInfo")).userId;
    this.where = this.$route.params.where;
  },
  methods: {
    reply() {
      this.$router.push({path:'/transferSettingSecond/' + this.where});
    },
    submitAddAddress() {
      this.submitState = true;
      this.axios({
        url: "/api/user/address/book/insertOrUpdate/manual",
        method: "post",
        headers: this.buildHeader(true),
        data: this.buildSecretBody(JSON.stringify({
          "userId": this.userId,
          "oppUsername": this.oppUsername,
          "oppAccountId" : this.oppAccountId,
          "remark" : this.remark
        }))
      }).then(res => {
        if (res.data && res.data.retInfo.errNo == 0 ) {
          this.$toast.show("添加账号成功");
          this.$router.push({path:'/transferSettingSecond/' + this.where});
        } else {
          this.$toast.show(res.data.retInfo.message);
          this.submitState = false;
        }
      }).catch(e => {
        console.log(e);
        this.submitState = false;
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
