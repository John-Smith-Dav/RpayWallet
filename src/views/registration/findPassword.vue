<template>
    <div class="container">
      <HeaderD title="找回登录密码"></HeaderD>
      <div class="content" >
        <van-row>
          <van-col span="24" style="text-align: center;font-weight: bold">
            <van-field v-model="username"
                       name="手机号"
                       label="手机号"
                       type="text"
                       placeholder="请输入手机号"
                       :rules="[{ required: true, message: '请输入手机号' }]"
            />
          </van-col>
        </van-row>
        <van-row>
          <van-col span="24" style="text-align: center;font-weight: bold">
            <Vcode
                :show="isShow"
                @success="success"
                @close="close"
            />
          </van-col>
        </van-row>

        <van-row style="padding-top: 20px;text-align: center;">
          <van-col span="24" style="text-align: center;padding-right: 15px;padding-left: 15px" >
            <van-button type="primary" style="border-radius: 10px;width: 100%" @click="goNext" >下一步</van-button>
          </van-col>
        </van-row>
      </div>


  </div>
</template>

<script>

import Const from "@/plugins/const";
import Vcode from "vue-puzzle-vcode";

export default {
  data() {
    return {
      username : "",
      countryCode: "",
      isShow: false, // 验证码模态框是否出现
    }
  },
  watch: {

  },
  components: {
    Vcode
  },
  created() {
    this.username = this.getStorage(Const.localStorageKeyUserName);
    this.countryCode = this.getStorage(Const.localStorageKeyCountryCode);
  },
  methods: {
    reply() {
      this.$router.go(-1);
    },
    // 用户通过了验证
    success(msg){
      this.isShow = false; // 通过验证后，需要手动隐藏模态框
      this.$router.push({path:'/findPasswordSecond', query:{
          username: this.username,
          countryCode: this.countryCode
        }});
    },
    // 用户点击遮罩层，应该关闭模态框
    close(){
      this.isShow = false;
    },
    goNext() {
      if (!this.isPhone(this.username)) {
        this.$toast.show('请输入正确的电话号码');
        return;
      }
      this.isShow = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  background: white;
  height: 50px;
  width: 100%;
  border-bottom: 1px solid $d_header_bottom_border;
  padding-top: 10px;
  color: $d_font_black;
  font-size: 16px;
  font-weight: bold;
  text-align: center;

}
.container {

}
</style>
