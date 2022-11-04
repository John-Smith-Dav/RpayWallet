<template>
  <div class="container">
    <HeaderD title="个人信息"></HeaderD>
    <div class="userinfo">
      <van-row style="border-bottom: 1px solid #ebedf0;padding: 10px">
        <van-col span="5" style="padding-top: 15px;">头像</van-col>
        <van-col span="19" style="text-align: right">
          <van-uploader :after-read="uploader" >
            <img :src="imageUrl +　avatar" width="50px" height="50px" v-if="avatar != ''">
          </van-uploader>
        </van-col>
      </van-row>

      <van-row style="border-bottom: 1px solid #ebedf0;padding: 10px">
        <van-col span="5">名字</van-col>
        <van-col span="19" style="text-align: right">
          <input type="text" name="surname" v-model="surname" class="van-field__control" >
        </van-col>
      </van-row>

      <van-row style="border-bottom: 1px solid #ebedf0;padding: 10px">
        <van-col span="5">email</van-col>
        <van-col span="19" style="text-align: right">
          <input type="text" name="email" v-model="email" class="van-field__control" >
        </van-col>
      </van-row>

      <van-row style="border-bottom: 1px solid #ebedf0;padding: 10px">
        <van-col span="5">电话</van-col>
        <van-col span="19" style="text-align: right">
          <input type="text" name="phone" v-model="phone" class="van-field__control" >
        </van-col>
      </van-row>

      <div style="margin: 16px 16px 16px;">
        <button  class="van-button van-button--primary van-button--normal van-button--block van-button--round" @click="updateUser" v-preventReClick="1000">
          <div class="van-button__content"><span class="van-button__text" >保存更改</span>
          </div>
        </button>
      </div>

    </div>
    <br>


  </div>
</template>
<script>
import Const from '../../plugins/const.js';

export default {
  data() {
    return {
      imageUrl : '',
      userInfo : {},
      avatar : '',
      surname : '',
      email : '',
      phone : ''
    }
  },
  async created() {
    this.imageUrl = Const.backDefaultServerUrl + '/api/file/image/';
    await this.getUserInfo();
    this.avatar = this.userInfo.avatar;
    this.surname = this.userInfo.surname;
    this.email = this.userInfo.email;
    this.phone = this.userInfo.phone;
  },
  methods: {
    async getUserInfo() {
      await this.axios({
        url: "/api/user/one",
        method: "post",
        headers: this.buildHeader(true),
        data: this.buildSecretBody(JSON.stringify({
          "userId": JSON.parse(this.getStorage("loginUserInfo")).userId
        }))
      }).then(res => {
        if (res.data && res.data.result) {
          this.userInfo = res.data.result.userInfo;
          this.saveStorage("loginUserInfo",JSON.stringify( res.data.result.userInfo))
        }
      }).catch(e => {
        console.log(e);
      });
    },
    async uploader(e){
      console.log(e)
      let content = e.file;
       let fileNameRes = await this.axios({
         url: "/api/file/saveBase64",
         method: "post",
         headers: {'Authorization': 'Bearer ' + this.getToken()},
         data: { "data": e.content}
       });
      console.log(fileNameRes.data.result)
      this.avatar = fileNameRes.data.result;
    },
    updateUser() {
      this.axios({
        url: "/api/user/update",
        method: "post",
        headers: this.buildHeader(true),
        data: this.buildSecretBody(JSON.stringify({
          "userId": this.userInfo.userId,
          "avatar": this.avatar,
          "email" : this.email,
          "surname" : this.surname,
          "phone": this.phone
        }))
      }).then(res => {
        if (res.data && res.data.retInfo.errNo == 0 ) {
          this.$toast.show(res.data.retInfo.message);

          this.saveStorage("loginUserInfo", JSON.stringify(res.data.result))

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
  background: #F1F2F6;
  .userinfo {
    padding: 10px 10px 10px 10px;
    background: white;
  }

}
</style>
