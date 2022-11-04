<template>
  <div class="container">
    <HeaderD title="账户设置"></HeaderD>
    <div class="userinfo">
      <van-row style="border-bottom: 1px solid #ebedf0;">
        <van-field label="币种" v-model="currencyName" is-link @focus="showCurrency =true" :border="false"></van-field>
        <van-action-sheet v-model="showCurrency" :round="false" :actions="currencyActions" @select="onSelectAccountProperty" ></van-action-sheet>
      </van-row>

      <van-row style="border-bottom: 1px solid #ebedf0;">
        <van-field label="账户状态" v-model="stateTypeName" is-link @focus="showStateType =true" :border="false"></van-field>
        <van-action-sheet v-model="showStateType" :round="false" :actions="stateTypes" @select="onSelectConsumptionType" ></van-action-sheet>
      </van-row>

      <van-row style="padding-top: 300px;text-align: center;">
        <van-col span="24" style="text-align: center;padding-right: 15px;padding-left: 15px" >
          <van-button type="primary"  style="border-radius: 10px;width: 100%" @click="updateAccount">保存更改</van-button>
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
      accountInfo : {},

      currency: '',
      currencyName: '',
      showCurrency: false,
      currencyActions: [
        {name: "人民币", value: "CNY"},
        {name: "美元", value: "USD"},
      ],

      stateType: '',
      stateTypeName: '',
      showStateType: false,
      stateTypes: [
        {name: "生效", value: "1"},
        {name: "注销", value: "3"},
        {name: "挂失", value: "4"},
      ],
    }
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      // 取得登录用户账户信息
      await this.axios({
        url: "/api/user/accounts/list",
        method: "post",
        headers: this.buildHeader(true),
        data: this.buildSecretBody(JSON.stringify({"userId": JSON.parse(this.getStorage("loginUserInfo")).userId})),
      }).then(
          res => {
            this.accountInfo = res.data.result[0];
          }
      );

      await this.axios({
        url: "/api/public/currency/getAll",
        method: "post",
        headers: this.buildHeader(false),
        data: this.buildSecretBody(JSON.stringify({id:""})),
      }).then(
          res => {
            this.currencyActions = res.data.result;
            res.data.result.forEach((item)=> {
              if (this.accountInfo.currency == item.code) {
                this.currencyName = item.name;
                this.currency = item.code;
              }
            });
          }
      );

      let that = this;
      that.stateTypes.forEach((item)=> {
        if (that.accountInfo.state == item.value) {
          that.stateTypeName = item.name;
          that.stateType = item.value;
        }
      });

    },
    onSelectAccountProperty(item) {
      this.showCurrency = false;
      this.currencyName = item.name;
      this.currency = item.code;
    },
    onSelectConsumptionType(item) {
      this.showStateType = false;
      this.stateTypeName = item.name;
      this.stateType = item.value;
    },
    updateAccount() {
      if (this.accountPassword != this.reAccountPassword) {
        this.$toast.show('验证密码必须和原密码相同');
        return;
      }
      this.axios({
        url: "/api/user/accounts/update",
        method: "post",
        headers: this.buildHeader(true),
        data: this.buildSecretBody(JSON.stringify({
          "accountId": this.accountInfo.accountId,
          "currency" : this.currency,
          "state" : this.stateType
        })),
      }).then(res => {
        if (res.data && res.data.retInfo.errNo == 0 ) {
          this.$toast.show("账户设置成功");

          this.init();

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
