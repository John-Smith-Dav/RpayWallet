<template>
  <section class="detail">
    <HeaderD title="交易明细"></HeaderD>
    <div class="content">
      <van-list v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                :immediate-check="false"
                @load="onLoadNew">

        <van-row v-for="(item, index) in details" :key="index" style="padding: 10px;text-align: left;border-bottom: 1px solid #ebedf0;">
          <van-col span="4">
            <img :src="imageUrl +　item.oppositeAvatar" width="40px" height="40px" style="border-radius: 50%">
          </van-col>
          <van-col span="12">
            <h5 style="padding-top: 3px" >{{item.changeTypeName + item.oppositeSurname}}</h5>
            <span style="font-size: 11px">{{timeFormat(Date.parse(item.createdDate))}}</span>
          </van-col>
          <van-col span="8">
            <h4 style="padding-top: 15px;padding-right:20px;text-align: right" v-if="item.amount <=0">{{item.amount}}</h4>
            <h4 style="padding-top: 15px;padding-right:20px;text-align: right;color: #f4a041" v-if="item.amount > 0">{{'+' + item.amount}}</h4>
          </van-col>

        </van-row>

<!--        <van-cell >

          <template #title> {{ item.oppositeUserName }} </template>
        </van-cell>-->

      </van-list>
    </div>
  </section>
</template>
<script>
import Const from "@/plugins/const";

export default {
  name: "trade_detail",
  data() {
    return {
      details: [],      // 列表
      loading: false,   // 加载中
      finished: false,  // 加载完成
      page: 0,          // 当前页数
      accountInfo : {},
      imageUrl : ''
    }
  },
  async created() {
    this.imageUrl = Const.backDefaultServerUrl + '/api/file/image/';
    // 取得登录用户账户信息
    let account = await this.axios({
      url: "/api/user/accounts/list",
      method: "post",
      headers: this.buildHeader(true),
      data: this.buildSecretBody(JSON.stringify({"userId": JSON.parse(this.getStorage("loginUserInfo")).userId}))
    });
    this.accountInfo = account.data.result[0];
    // 加载数据
    await this.loadDetails("new", 0, 15, "refresh");
  },
  methods: {
    // 加载新数据
    onLoadNew() {
      // 数量加一
      this.page += 1;
      // 增加商品
      this.loadDetails("new", this.page, 15, "add");
    },
    async loadDetails(type, page, page_num, status) {
      // 异步获取数据
      let result = await this.axios({
        url: "/api/user/account/change/detail",
        method: "post",
        headers: this.buildHeader(true),
        data: this.buildSecretBody(JSON.stringify({"accountId": this.accountInfo.accountId, "page": page, "size": page_num }))
      });
      // 刷新（首次加载）
      if (status == "refresh") {
        this.details = result.data.result.content;
      } else if (status == "add") {
        // 这里是增加数据
        if (result.data.result.content.length == 0) {
          // 没有数据的话，加载完成
          this.finished = true;
        } else {
          // 这里一定要用 setTimeout(() => {} 来增加数据
          setTimeout(() => {
            result.data.result.content.forEach((element) => {
              this.details.push(element);
            });
            // 注意，for循环完成后，一定要立马 this.loading = false;
            this.loading = false;
          }, 1000);
        }
      }
    },
  }
};
</script>
<style lang="scss" scoped>
.detail {
  background: $bg;
  text-align: center;
  display: flex;
  justify-content: center;

  .content {
    position: absolute;
    color: black;
    top: 50px;
    width: 100%
  }
}
</style>

