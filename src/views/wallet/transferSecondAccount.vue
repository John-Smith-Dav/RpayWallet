<template>
  <div class="container">
    <div>
      <van-popup v-model="showSelectBooks" :lock-scroll="false"  closeable close-icon="arrow-left" close-icon-position="top-left" position="bottom">
        <div><selectAccountAddressBook @on-cancel="cancel" @on-ok="handleChangeBooks"></selectAccountAddressBook></div>
      </van-popup>
    </div>
    <div class="header">
      <van-row>
        <van-col span="2"><van-icon class="header-left-icon" @click="reply"  name="arrow-left" size="21"/></van-col>
        <van-col span="18">转账到卡号</van-col>
        <van-col span="4" ></van-col>
      </van-row>
    </div>
    <div class="content">
      <van-row>
        <van-cell-group inset>
          <van-field v-model="oppAccountId"
                     name="收款人卡号"
                     label="收款人卡号"
                     type="text"
                     placeholder="收款人卡号"
                     right-icon="friends-o"
                     style="font-size: 13px"

          >
            <template #right-icon>
              <van-icon name="friends-o" @click="setShowBooks(true)"></van-icon>
            </template>
          </van-field>
        </van-cell-group>

      </van-row>
      <van-row style="padding: 20px;text-align: left;font-size: 14px;font-weight: 500">
        <span style="color: #2d67e7" @click="$router.push('/transferSettingSecond/transferSecond')">收款账号管理</span>
      </van-row>
      <van-row style="padding-top: 30px;text-align: center;">
        <van-col span="24" style="text-align: center;padding-right: 15px;padding-left: 15px" >
          <van-button type="primary" :disabled="buttonDisabled" style="border-radius: 10px;width: 100%" @click="goNext" :loading="submitState ? true : false">下一步</van-button>
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
      buttonDisabled: true,
      submitState: false,
      oppAccountId: "",
      showSelectBooks: false,
    }
  },
  created() {
  },
  watch: {
    oppAccountId(n, o) {
      if (n.length >= 23) {
        this.buttonDisabled = false;
      }
    }
  },
  methods: {
    reply() {
      this.$router.push("/transferFirst")
    },
    async goNext() {
      // 判断账号是否存在
      let userAccount = await this.axios({
        url: "/api/user/accounts/one",
        method: "post",
        headers: this.buildHeader(true),
        data: this.buildSecretBody(JSON.stringify({
          "accountId": this.oppAccountId
        }))
      });
      if (this.isEmpty(userAccount.data.result)) {
        this.$toast.show('该账户不存在');
        return;
      } else {
        this.$router.push({path:'/transferThird', query:{ oppAccountId:this.oppAccountId }});
      }

    },
    cancel (){
      this.showSelectBooks = false;
    },
    setShowBooks(val) {
      this.showSelectBooks = val;
    },
    handleChangeBooks(item) {
      this.showSelectBooks = false;
      this.oppAccountId = item.oppAccountId;
    },


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
