<template>
  <section class="zhuanqian">
    <HeaderD title="转账"></HeaderD>

    <div class="cointype">
      <div class="l">人民币</div>

    </div>

    <div class="box2">
      <div class="text1" style="padding-bottom: 10px" v-if="toAccountUserName != null"> 接收账户名: <span style="color:darkred;">{{toAccountUserName}}</span> </div>
      <div class="text1"> 接收账户号: </div>
      <div class="text2">
        <!-- 请输入或长按粘贴地址 -->
        <input type="text" style="width:300px"  v-model="toAccountId" placeholder="请输入或长按粘贴账号" maxlength="23">
        &nbsp;<img @click="$router.push('/scanning')" src="../../assets/images/d_add_scan_white@2x(2).png" alt="" srcset="">
      </div>

    </div>
    <!-- 转账数量 -->
    <div class="box2">
      <div class="text1"> 金额 </div>
      <div class="text2">
        <input type="number" v-model="num" placeholder="请输入转账金额" class="in2">
        <div class="r">
          <small>人民币</small>
        </div>
      </div>

      <div class="text1" style="padding-top: 10px"> 备注 </div>
      <div class="text2" style="padding-bottom: 10px">
        <input type="text" v-model="remark" placeholder="请输入备注" class="in2">
      </div>
    </div>
    <div class="btn" @click="submit" > 确定 {{submitState ? '...' : ''}}</div>

    <r-modal title="交易密码"
             @on-ok="submitPsw"
             :show="isShowPswModal"
             @on-cancel="cancel">
      <div class="inp-password">
        <input type="password" v-model="password" placeholder="请输入交易密码">
      </div>
    </r-modal>
  </section>
</template>
<script>
export default {
  name: "zhuanqian",
  data() {
    return {
      isShowPswModal: false,
      toAccountInfo : {},
      toAccountUserName : '',
      toAccountId : '',
      fromAccountInfo : {},
      changeType: '',
      num : "",
      remark : "",
      password : "",
      submitState : false
    };
  },
  async created (){
    let fromInfo = await this.axios({
      url: "/api/user/accounts/list",
      method: "post",
      headers: this.buildHeader(true),
      data: this.buildSecretBody(JSON.stringify({ "userId": JSON.parse(this.getStorage("loginUserInfo")).userId}))
    });
    this.fromAccountInfo = fromInfo.data.result[0];

    if (this.$route.query.accountId != null && this.$route.query.accountId != '' && this.$route.query.accountId != 'undefined') {
      let toInfo = await this.axios({
        url: "/api/user/account/getOne",
        method: "post",
        headers: this.buildHeader(true),
        data: this.buildSecretBody(JSON.stringify({ "accountId": this.$route.query.accountId}))
      });
      this.toAccountInfo = toInfo.data.result;
      this.toAccountUserName = this.toAccountInfo.userName;
      this.toAccountId = this.toAccountInfo.accountId;
    }
    this.changeType = this.$route.query.changeType; // '1:红包、2:转账、3:二维码收付款、4:商户消费、5:充值提现 6:退款 、7:自动扣款'等
  },
  watch : {
    toAccountId(n, o) {
      if (n.length === 23) {
        this.axios({
          url: "/api/user/account/getOne",
          method: "post",
          headers: this.buildHeader(true),
          data: this.buildSecretBody(JSON.stringify({
            "accountId": n
          }))
        }).then(res => {
          this.toAccountInfo = res.data.result;
          this.toAccountUserName = this.toAccountInfo.userName;
          this.toAccountId = this.toAccountInfo.accountId;
        }).catch(e => {
          this.$toast.show('取得对方账户信息异常');
          console.log(e)
        });
      }
    }
  },
  methods: {
    cancel (){
      this.isShowPswModal = false;
      this.submitState = false;
    },
    submit(){
      if(this.submitState) return;

      if(this.num <= 0){
        this.$toast.show('金额输入错误');
        return;
      }
      this.isShowPswModal = true;
    },
    async submitPsw () {
      this.isShowPswModal = false;
      this.submitState = true;

      if (this.password.length <=0) {
        this.submitState = false;
        this.$toast.show('交易密码不能为空，如果没有设置交易密码，请到账户设置中设置密码。');
        return;
      }

      this.axios({
        url: "/api/user/accounts/transferTo",
        method: "post",
        headers: this.buildHeader(true),
        data: this.buildSecretBody(JSON.stringify({
          "fromAccountId": this.fromAccountInfo.accountId,
          "toAccountId": this.toAccountInfo.accountId,
          "amount": this.num,
          "changeType": this.changeType,
          "consumptionType": this.toAccountInfo.consumptionType,
          "remark": this.remark,
          "accountPassword": this.password
        }))
      }).then(res => {
        this.submitState = false;
        if (res.data && res.data.retInfo.errNo == 0 ) {
          let tempNum = this.num;

          this.num = "";
          this.$toast.show(res.data.retInfo.message);

          this.$router.push({path:'/zhuanqian_result', query:{result: this.toAccountInfo.userId, num: tempNum}});
        } else {

          this.$toast.show(res.data.retInfo.message);
        }
      }).catch(e => {
        this.submitState = false;
        this.$toast.show(e.message);
      });
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
  .cointype {
    margin: 15px;
    display: flex;
    color: $d_font_black;
    font-weight: bold;
    justify-content: space-between;
    padding: 15px;
    background: $d_bg;          // 白色背景
    border:1px solid $d_header_bottom_border;
    border-radius: 10px;
    .r {
      color: $d_font_black;
      font-size: 13px;
    }
    img {
      width: 8px;
      height: 8px;
    }
  }
  // 接收地址
  .box2 {
    margin: 15px;
    color: $d_font_black;
    font-size: 14px;
    font-weight: bold;
    background: $d_bg;          // 白色背景
    padding: 15px;
    border-radius: 10px;
    border:1px solid $d_header_bottom_border;
    .l {
      color: $d_font_gray1;
      padding-top: 10px;
      margin-top: 20px;
      border-top: 1px solid #ccc;
      font-size: 10px;
      font-weight: 550;
    }
    .text2 {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 30px;
      .r {
        padding-left: 20px;
        width: 50%;
        small {
          color: $d_font_black;
        }
      }
      img {
        width: 20px;
        height: 20px;
      }

      input {
        outline: none;
        font-size: 10px;
        border-radius: 5px;
        border-color: #d2d6de;
        border: 1px solid #ccc;
        height: 35px;
        width: 80%;
        padding-left: 10px;
      }
      .in2 {
        min-width: 10%;
      }
    }
  }

}
.btn {
  color: $d_font_white;
  font-weight: bold;
  letter-spacing: 2px;
  background: $d_card_bg1;
  border-radius: 5px;
}
.intruduce {
  color: $d_font_gray1;
  font-size: 10px;
  font-weight: 550;
  padding-top: 5px;
}
</style>
