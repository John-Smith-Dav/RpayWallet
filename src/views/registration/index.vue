<template>
    <div class="container">
      <!-- 选择国家 -->
      <div>
        <van-popup v-model="showSelectCountry" :lock-scroll="false"  closeable close-icon="arrow-left" close-icon-position="top-left" position="bottom">
          <div><selectCountry @on-cancel="cancel" @on-ok="handleChangeCountry"></selectCountry></div>
        </van-popup>
      </div>

      <HeaderD title="手机号注册"></HeaderD>
      <div class="content" >
        <van-row style="border-bottom: 1px solid #ebedf0;padding: 10px">
          <van-col span="24" style="text-align: center">
            <van-uploader :after-read="uploader" >
              <img :src="imageUrl +　avatar" width="50px" height="50px" v-if="avatar != ''">
            </van-uploader>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="24" style="text-align: center;font-weight: bold">
            <van-field v-model="surname"
                       name="昵称"
                       label="昵称"
                       type="text"
                       placeholder="例如: 张三、英博商店"
                       :rules="[{ required: true, message: '请填写RPay密码' }]"
            />
          </van-col>
        </van-row>
        <van-row>
          <van-col span="24" style="text-align: center;font-weight: bold;border-bottom: 1px solid #EAECF6" >
            <van-field v-model="countryCodeShow"
                       @click="setShowCountry(true)"
                       name="国家/地区"
                       label="国家/地区"
                       type="text"
                       placeholder=""
                       :rules="[{ required: true, message: '请填写国家/地区' }]"
            />
          </van-col>
        </van-row>
        <van-row>
          <van-col span="24" style="text-align: center;font-weight: bold">
            <van-field v-model="username"
                       name="手机号"
                       label="手机号"
                       type="text"
                       placeholder="请填写手机号"
                       :rules="[{ required: true, message: '请填写手机号' }]"
            />
          </van-col>
        </van-row>

        <van-row style="font-weight: bold;border-bottom: 1px solid #EAECF6">
          <van-col span="15" style="text-align: center;">
            <van-field
                v-model="smsCode"
                type="smsCode"
                name="验证码"
                label="验证码"
                placeholder="请填写验证码"
                :rules="[{ required: true, message: '请填写验证码' }]"
                :onfocus="true"
            />
          </van-col>
          <van-col span="9" style="text-align: center;padding-top: 5px">
            <van-button size="small"
                        type="primary"
                        style="border-radius: 5px"
                        @click="gainCode">{{time}}
            </van-button>
          </van-col>
        </van-row>

        <van-row>
          <van-col span="24" style="text-align: center;font-weight: bold">
            <van-field v-model="password"
                       name="密码"
                       label="密码"
                       type="password"
                       placeholder="请填写密码"
                       :rules="[{ required: true, message: '请填写密码' }]"
            />
          </van-col>
        </van-row>
        <van-row style="font-weight: bold;border-bottom: 1px solid #EAECF6">
          <van-col span="24" style="text-align: center;font-weight: bold">
            <van-field v-model="reUserPassword"
                       name="密码确认"
                       label="密码确认"
                       type="password"
                       placeholder="请填写确认密码"
                       :rules="[{ required: true, message: '请填写确认密码' }]"
            />
          </van-col>
        </van-row>
        <van-row >
          <van-col span="24" style="text-align: center;font-weight: bold">
            <van-field v-model="email"
                       name="Email"
                       label="Email"
                       type="text"
                       placeholder="请填写Email"
            />
          </van-col>
        </van-row>

        <van-row style="text-align: center;padding-top: 50px;padding-left: 10px;font-size: 11px">
          <van-col span="24" style="text-align: center;padding-right: 10px;padding-left: 10px" >
            <van-checkbox shape="square" icon-size="13" v-model="checked">阅读并同意<span style="color: #1989fa">《RPay用户服务协议》</span><span style="color: #1989fa">《用户保护隐私政策》</span></van-checkbox>
          </van-col>
        </van-row>

        <van-row style="padding-top: 10px;text-align: center;">
          <van-col span="24" style="text-align: center;padding-right: 15px;padding-left: 15px" >
            <van-button type="primary" style="border-radius: 10px;width: 100%" @click="registration" :loading="submitState ? true : false">同意并继续</van-button>
          </van-col>
        </van-row>

      </div>

  </div>
</template>

<script>

import Const from "@/plugins/const";

export default {
  data() {
    return {
      imageUrl: '',
      avatar: '',

      surname: "",
      countryCodeShow: "中国大陆 (+86)",
      countryCode: "86",
      smsCode: "",

      username:"",
      password:"",
      reUserPassword: "",
      email: "",

      phone: "",

      showSelectCountry: false,
      checked: true,
      submitState: false,
      time: '获取验证码',
      isClick: true,
    }
  },
  watch: {
    username() {
      this.phone = this.username;
    }
  },
  created() {
    this.imageUrl = Const.backDefaultServerUrl + '/api/file/image/';
  },
  methods: {
    reply() {
      this.$router.go(-1);
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
    registration() {
      this.submitState = true;
      if (this.surname.length <=0) {
        this.$toast.show('请输入昵称');
        this.submitState = false;
        return;
      }
      if (this.username.length <=0) {
        this.$toast.show('请输入电话号码');
        this.submitState = false;
        return;
      }
      if (!this.isPhone(this.username)) {
        this.$toast.show('请输入正确的电话号码');
        this.submitState = false;
        return;
      }
      if (this.password.length <=0) {
        this.$toast.show('请输入密码');
        this.submitState = false;
        return;
      }
      if (this.reUserPassword.length <=0) {
        this.$toast.show('请输入验证密码');
        this.submitState = false;
        return;
      }
      if (this.password != this.reUserPassword) {
        this.$toast.show('验证密码必须和原密码相同');
        this.submitState = false;
        return;
      }
      this.axios({
        url: "/api/index/registration",
        method: "post",
        headers: this.buildHeader(false),
        data: this.buildSecretBody(JSON.stringify({
          "userName": this.username,
          "userPassword": this.password,
          "reUserPassword": this.reUserPassword,
          "email": this.email,
          "surname": this.surname,
          "phone": this.phone,
          "smsCode": this.smsCode,
          "avatar": this.avatar,
          "countryCode": this.countryCode
        })),

      }).then(res => {
        if (res.data && res.data.retInfo.errNo == 0 ) {

          this.$toast.show("注册成功，填入密码进行登录");

          this.saveLoginStorage(res);

          this.$router.push("/startPage")
        } else {
          this.submitState = false;
          this.$toast.show(res.data.retInfo.message);
        }
      }).catch(e => {
        this.submitState = false;
        console.log(e);
      });

    },
    cancel (){
      this.showSelectCountry = false;
    },
    setShowCountry(val) {
      this.showSelectCountry = val;
    },
    handleChangeCountry(item) {
      this.showSelectCountry = false;
      this.countryCodeShow = item.name +  ' (+' + item.areaCode +  ')';
      this.countryCode = item.areaCode;
    },
    async gainCode() {
      if (this.isClick) {
        if (/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(this.username)) {
          let rtn = {};
          rtn = await this.getSmsCode(this.countryCode + this.phone);
          if (rtn.data.retInfo.errNo != 0 ) {
            this.$toast.show(rtn.data.retInfo.message);
          }
          this.isClick = false
          let s = 60
          this.time = s + 's'
          let interval = setInterval(() => {
            s--
            this.time = s + 's'
            if (s < 0) {
              this.time = '重新获取'
              this.isClick = true
              clearInterval(interval)
            }
          }, 1000)
        } else {
          this.$toast.show('请输入正确的手机号码');
        }
      }
    },
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
