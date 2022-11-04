<template>
  <div class="container">
    <HeaderD title="实名认证"></HeaderD>
    <div class="userinfo">
      <van-row style="position: relative;height: 40px;padding: 8px 16px;color: #ed6a0c;font-size: 14px;line-height: 24px;background-color: #fffbe8;text-align: center;">
        <h3 v-if="userInfo.auditStatus == 1" >已提交认证</h3>
        <h3 v-if="userInfo.auditStatus == 0" >未认证</h3>
        <h3 v-if="userInfo.auditStatus == 2" >认证通过</h3>
        <h3 v-if="userInfo.auditStatus == 3" >未通过认证</h3>
      </van-row>

      <van-row style="border-bottom: 1px solid #ebedf0;">
        <van-field label="证件类型" v-model="identityTypeName" is-link @focus="showIdentityType =true" :border="false"></van-field>
        <van-action-sheet v-model="showIdentityType" :round="false" :actions="identityTypes" @select="onSelectIdentityType" ></van-action-sheet>
      </van-row>
      <van-row style="border-bottom: 1px solid #ebedf0;">
        <van-field label="证件号码" v-model="identityNumber" type="text" placeholder="请输入证件号码"></van-field>
      </van-row>

      <van-row style="border-bottom: 1px solid #ebedf0;padding: 10px;margin-right: 12px;padding: 10px 16px;">
        <van-col span="5" style="padding-top: 15px;color: #646566;font-size: 14px;">证件正面</van-col>
        <van-col span="19" style="text-align: right">
          <van-uploader :after-read="uploaderImg1" >
            <img :src="imageUrl +　img1" width="200px" height="140px" v-if="img1 != ''">
          </van-uploader>
        </van-col>
      </van-row>

      <van-row style="border-bottom: 1px solid #ebedf0;padding: 10px;margin-right: 12px;padding: 10px 16px;">
        <van-col span="5" style="padding-top: 15px;color: #646566;font-size: 14px;">证件反面</van-col>
        <van-col span="19" style="text-align: right">
          <van-uploader :after-read="uploaderImg2" >
            <img :src="imageUrl +　img2" width="200px" height="140px" v-if="img2 != ''">
          </van-uploader>
        </van-col>
      </van-row>

      <van-row style="padding-top: 40px;text-align: center;">
        <van-col span="24" style="text-align: center;padding-right: 15px;padding-left: 15px" >
          <van-button type="primary"  style="border-radius: 10px;width: 100%" @click="updateKyc">保存更改</van-button>
        </van-col>
      </van-row>


    </div>
    <br>


  </div>
</template>
<script>

import Const from "@/plugins/const";

export default {
  data() {
    return {
      imageUrl : '',
      userInfo : {},

      identityTypeName: '',
      identityType: '',
      showIdentityType: false,
      identityTypes: [
        {name: "身份证", value: "1"},
        {name: "护照", value: "2"},
        {name: "营业执照", value: "3"},
      ],
      identityNumber: '',
      img1: '',
      img2: ''

    }
  },
  async created() {
    this.imageUrl = Const.backDefaultServerUrl + '/api/file/image/';
    await this.getUserInfo();
  },
  methods: {
    onSelectIdentityType(item) {
      this.showIdentityType = false;
      this.identityTypeName = item.name;
      this.identityType = item.value;
    },
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

          this.saveStorage("loginUserInfo", JSON.stringify(res.data.result.userInfo))
          if (this.userInfo.identityType == "1") {
            this.identityTypeName = "身份证";
          }
          if (this.userInfo.identityType == "2") {
            this.identityTypeName = "护照";
          }
          if (this.userInfo.identityType == "3") {
            this.identityTypeName = "营业执照";
          }

          this.identityNumber = this.userInfo.identityNumber;
          this.img1 = this.userInfo.identityImg1;
          this.img2 = this.userInfo.identityImg2;
        }
      }).catch(e => {
        console.log(e);
      });
    },
    async uploaderImg1(e){
      console.log(e)
      let content = e.file;
      let fileNameRes = await this.axios({
        url: "/api/file/saveBase64",
        method: "post",
        headers: {'Authorization': 'Bearer ' + this.getToken()},
        data: { "data": e.content}
      });
      this.img1 = fileNameRes.data.result;
    },
    async uploaderImg2(e){
      console.log(e)
      let content = e.file;
      let fileNameRes = await this.axios({
        url: "/api/file/saveBase64",
        method: "post",
        headers: {'Authorization': 'Bearer ' + this.getToken()},
        data: { "data": e.content}
      });
      this.img2 = fileNameRes.data.result;
    },
    updateKyc() {
      if (this.identityNumber.length <=0) {
        this.$toast.show('请输入证件号码');
        return;
      }

      this.axios({
        url: "/api/user/kyc",
        method: "post",
        headers: this.buildHeader(true),
        data: this.buildSecretBody(JSON.stringify({
          "userId": this.userInfo.userId,
          "identityType": this.identityType,
          "identityNumber" : this.identityNumber,
          "identityImg1" : this.img1,
          "identityImg2" : this.img2,
          "auditStatus" :　1
        }))
      }).then(res => {
        if (res.data && res.data.retInfo.errNo == 0 ) {
          this.$toast.show(res.data.retInfo.message);

         this.getUserInfo();

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
  background: white;
  .userinfo {
    padding: 10px 15px 15px 20px;
    background: white;
  }
  .userNav {
    background: white;
    padding: 10px 10px 6px 10px;
  }



}
</style>
