<template>
  <div class="container">
    <van-popup v-model="confirmPopShow" style=" border-radius: 10px">
      <div style="padding: 20px;width: 300px;">
        <van-row style="text-align: center">
          <span style="font-size: 14px;font-weight: 600">转账提醒</span>
        </van-row>
        <van-row style="font-size: 14px;text-align: center;color: #828A95;padding-top: 10px">
          <span>请再次核对转账收款方与转账金额</span>
        </van-row>
        <van-row>
          <van-divider></van-divider>
        </van-row>
        <van-row style="font-size: 13px;">
          <van-col span="12" style="text-align: left">
            收款方
          </van-col>
          <van-col span="12" style="text-align: right">
            {{surname}}
          </van-col>
        </van-row>
        <van-row style="font-size: 13px;">
          <van-col span="12" style="text-align: left">
            收款方手机号
          </van-col>
          <van-col span="12" style="text-align: right">
            {{phone}}
          </van-col>
        </van-row>
        <van-row style="font-size: 13px;">
          <van-col span="12" style="text-align: left">
            转账金额
          </van-col>
          <van-col span="12" style="text-align: right">
            ¥{{amount}}
          </van-col>
        </van-row>
        <van-row>
          <van-divider></van-divider>
        </van-row>

        <van-row >
          <van-col span="12" style="text-align: center;padding-right: 15px;padding-left: 15px" >
           <span style="font-size: 14px;font-weight: 600" @click="oncancel">取消</span>
          </van-col>
          <van-col span="12" style="text-align: center;padding-right: 15px;padding-left: 15px" >
            <span style="font-size: 14px;font-weight: 600;color: #2d67e7" @click="goPasswordPopShow">继续转账</span>
          </van-col>
        </van-row>
      </div>

    </van-popup>

    <van-popup v-model="passwordPopShow" style=" border-radius: 10px 10px 0px 0px;padding-top: 20px" position="bottom">
      <div >
        <van-row style="text-align: center">
          <van-col span="2">
            <van-icon name="cross" />
          </van-col>
          <van-col span="22" style="padding-right: 30px">
            <span style="font-size: 14px;font-weight: 600">请输入交易密码</span>
          </van-col>
        </van-row>

        <van-row style="padding-top: 20px;text-align: center;font-size: 14px;font-weight: 600">
          <van-col span="24" style="padding-right: 30px;" >
            <span>转账给 {{surname}}</span>
          </van-col>
        </van-row>
        <van-row style="text-align: center;">
          <van-col span="24" style="font-weight: 600;font-size: 30px;margin-top: 10px">
            ¥{{amount}}
          </van-col>
        </van-row>
        <van-row>
          <van-divider></van-divider>
        </van-row>
        <van-row>
          <van-field
              v-model="password"
              center
              clearable
              label="交易密码"
              type="password"
              placeholder="请输入交易密码"
              id="passwordField"
              autofocus
          >
            <template #button>
              <van-button size="small" type="primary" @click="commitFinalDeal">确认交易</van-button>
            </template>
          </van-field>
        </van-row>

      </div>
    </van-popup>

    <van-popup v-model="tranferRemarkShow" style=" border-radius: 5px;width: 300px" >
      <div >
        <van-row style="text-align: center;padding-top: 20px;font-size: 15px;font-weight: bold">
          添加转账说明
        </van-row>
        <van-row style="text-align: center;padding-top: 5px;padding-bottom: 10px;border-bottom: 1px solid #ebedf0;">
          <van-field
              center
              clearable
              type="text"
              placeholder="最多输入10个字"
              autofocus
              maxlength="10"
              v-model="remarkPop"
          >
          </van-field>
        </van-row>
        <van-row style="padding: 10px">
          <van-col span="12" style="text-align: center" @click="remarkCancel"><span>取消</span></van-col>
          <van-col span="12" style="text-align: center" @click="remarkCommit"><span>确定</span></van-col>
        </van-row>
      </div>
    </van-popup>

    <van-row >
      <van-number-keyboard
          :show="keyboardShow"
          theme="custom"
          extra-key="."
          close-button-text="转账"
          @blur="keyboardShow = true"
          @input="onInput"
          @delete="onDelete"
          @close="onComplete"
          v-model="amount"
      />
    </van-row>


    <div class="content">
      <div class="header">
        <van-row>
          <van-col span="2"><van-icon class="header-left-icon" @click="reply"  name="arrow-left" size="21"/></van-col>
          <van-col span="18"></van-col>
          <van-col span="4" ></van-col>
        </van-row>
      </div>

      <div style="padding-bottom: 25px">
        <van-row>
          <van-col span="18">
            <van-row style="padding-top: 20px;text-align: left;padding-left: 30px;font-size: 14px;font-weight: 600">
              <van-col span="18" style="padding-right: 30px;" >
                <span>转账给 {{surname}}</span>
              </van-col>
            </van-row>
            <van-row style="text-align: left;padding-left: 30px;font-size: 14px;font-weight: 600">
              <van-col span="24" style="padding-right: 30px;font-size: 13px;font-weight: 500" >
                <span>{{phone}}</span>
              </van-col>
            </van-row>
          </van-col>
          <van-col span="6" STYLE="padding-top: 20px;text-align: left">
            <img :src="imageUrl +　avatar" width="40px" height="40px" v-if="avatar != ''">
          </van-col>
        </van-row>
      </div>
      <div style="border-radius: 10px 10px 0px 0px;padding-top: 20px;background-color: white">
        <van-row style="text-align: left;padding-left: 30px;font-size: 14px;font-weight: 500;">
          <van-col span="24"><span>转账金额</span></van-col>
        </van-row>
        <van-row style="text-align: left;padding-left: 30px;border-bottom: 1px solid #ebedf0;">
         <van-col span="2" style="font-weight: 600;font-size: 30px;margin-top: 10px">
           ¥
          </van-col>
          <van-col span="22" style="text-align: left;">
            <van-field v-model="amount" type="number" @focus="noBomBox" style="font-weight: 600;font-size: 30px;" :focused="keyboardShow"/>
          </van-col>
        </van-row>


        <van-row style="text-align: left;padding-left: 20px;font-size: 13px;font-weight: 500;padding-top: 20px;padding-bottom: 20px">
          <van-col span="24">
            <span @click="setTranferRemarkShow" :style="remarkColor">{{ remark }}</span>
            <span v-if="remark.length > 0 && remark != '添加转账说明'" style="color: #2d67e7"> 修改</span>
          </van-col>
        </van-row>
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
      accountInfo : {},
      oppAccountId: '',
      prepayId: '',
      surname: '',
      oppUserId: '',
      phone: '',
      consumptionType: '',
      changeType: '2',
      remark: '添加转账说明',
      remarkPop: '',
      remarkColor: 'color: #2d67e7',
      imageUrl: Const.backDefaultServerUrl + '/api/file/image/',
      avatar : '',
      amount: '',
      buttonDisabled: true,
      submitState: false,

      keyboardShow: true,
      confirmPopShow: false,
      tranferRemarkShow: false,

      password: '',
      passwordPopShow: false

    }
  },
  components: {

  },
  created() {

    this.oppAccountId = this.$route.query.oppAccountId;
    if (!this.isEmpty(this.$route.query.changeType)) {
      this.changeType = this.$route.query.changeType;
    }
    this.prepayId = this.$route.query.prepayId;
    if (!this.isEmpty(this.$route.query.totalAmount)) {
      this.amount = this.$route.query.totalAmount;
    }
    this.init();
  },
  watch: {
    amount() {
      this.keyboardShow = true;
    },
    remark() {
      if (this.remark != '添加转账说明') {
        this.remarkColor = "black"
      }
    }

  },
  methods: {
    reply() {
      this.$router.go(-1);
    },
    noBomBox(Event) {
      document.activeElement.blur();
      this.keyboardShow = true
    },
    oncancel() {
      this.confirmPopShow = false;
    },
    remarkCancel() {
      this.tranferRemarkShow = false;
    },
    remarkCommit() {
      this.remark = this.remarkPop;
      this.tranferRemarkShow = false;
    },
    goPasswordPopShow() {
      this.confirmPopShow = false;
      this.passwordPopShow = true;
    },
    setTranferRemarkShow() {
      this.keyboardShow = false;
      this.tranferRemarkShow = true;
    },
    commitFinalDeal() {
      if (this.isEmpty(this.password)) {
        this.$toast.show("请输入交易密码");
        return
      }
      if (this.remark == '添加转账说明') {
        this.remark = '';
      }
      this.axios({
        url: "/api/user/accounts/transferTo",
        method: "post",
        headers: this.buildHeader(true),
        data: this.buildSecretBody(JSON.stringify({
          "fromAccountId": this.accountInfo.accountId,
          "fromUserId": this.accountInfo.userId,
          "prepayId": this.prepayId,
          "toAccountId": this.oppAccountId,
          "amount": this.amount,
          "changeType": this.changeType,
          "remark": this.remark,
          "accountPassword": this.password
        }))
      }).then(res => {
        this.submitState = false;
        if (res.data && res.data.retInfo.errNo == 0 ) {
          let tempNum = this.amount;

          this.amount = "";
          this.$toast.show(res.data.retInfo.message);

          this.$router.push({path:'/zhuanqian_result', query:{result: this.oppUserId, num: tempNum, notifyUrl: res.data.prepayOrder.notifyUrl}});
        } else {

          this.$toast.show(res.data.retInfo.message);
        }
      }).catch(e => {
        this.submitState = false;
        this.$toast.show(e.message);
      });

      // 增加转账历史TODO


    },
    onInput(value) {

    },
    onDelete() {

    },
    onComplete() {
      if (this.isEmpty(this.amount) || (!this.isEmpty(this.amount) && this.amount <= 0)) {
        this.$toast.show("请输入转账金额");
        return
      }
      this.keyboardShow = false;
      this.confirmPopShow = true;
    },
    async init() {
      // 取得对方用户账户信息
      let account = await this.axios({
        url: "/api/user/accounts/oppInfo",
        method: "post",
        headers: this.buildHeader(true),
        data: this.buildSecretBody(JSON.stringify({
          "oppAccountId": this.oppAccountId
        }))
      });
      if (account.data && account.data.retInfo.errNo == 0 ) {
        this.surname =  account.data.result.surname;
        this.avatar = account.data.result.avatar;
        this.phone = account.data.result.phone;
        this.consumptionType = account.data.result.consumptionType;
        this.oppUserId = account.data.result.userId;
      }
      // 取得登录用户账户信息
      let accountInfo = await this.axios({
        url: "/api/user/accounts/list",
        method: "post",
        headers: this.buildHeader(true),
        data: this.buildSecretBody(JSON.stringify({"userId": JSON.parse(this.getStorage("loginUserInfo")).userId}))
      });
      this.accountInfo = accountInfo.data.result[0];

    }

  }
}
</script>
<style lang="scss" scoped>
.container {
  min-height: 100vh;
  height: 100%;
  background: $d_header_bg;
  .header {
    height: 50px;
    width: 100%;
    padding-top: 10px;
    color: $d_font_black;
    font-size: 16px;
    font-weight: bold;
    text-align: center;

  }
  .content {

    border-radius: 5px;
    text-align: center;
    font-weight: bold;
  }

}
</style>
