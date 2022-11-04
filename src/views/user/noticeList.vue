<template>
  <section class="detail">
    <div class="header">
      <van-row>
        <van-col span="2">
          <van-icon class="header-left-icon" @click="toHome" name="arrow-left" size="21"/>
        </van-col>
        <van-col span="14" style="padding-left: 40px">
          <span>消息明细</span>
        </van-col>
        <van-col span="4" class="rightCol">
          <span style="font-size: 12px;color: #2d67e7" @click="setAllRead">全部已读</span>
        </van-col>
        <van-col span="4" class="rightCol">
          <span  style="font-size: 12px;color: #2d67e7" @click="clearALl">清空</span>
        </van-col>
      </van-row>
    </div>
    <div class="content">
      <van-list v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                :immediate-check="false"
                @load="onLoadNew">

        <van-row v-for="(item, index) in details" :key="index" style="padding: 10px;text-align: left;border-bottom: 1px solid #ebedf0;height: 100px">
<!--          <van-col span="3">
            <van-checkbox v-model="checkFlag[index]"  style="padding-top: 15px" @click="checkboxClick(item, index)"></van-checkbox>
          </van-col>-->
          <van-col span="24">
            <van-row style="font-size: 12px;padding-bottom: 5px">
              <van-col span="24"> <span style="font-weight: 600">{{item.noticeTitle}}</span></van-col>
            </van-row>
            <van-row style="font-size: 12px;">
              <van-col span="24"> <span style="font-weight: 500">{{item.noticeInfo}}</span></van-col>
            </van-row>
            <van-row style="font-size: 12px;text-align: right">
              <van-col span="24"> <span style="font-weight: 500">{{item.startDate}}</span></van-col>
            </van-row>
          </van-col>

        </van-row>

      </van-list>
    </div>
  </section>
</template>
<script>
import Const from "@/plugins/const";

export default {
  name: "noticeList",
  data() {
    return {
      details: [],      // 列表
      checkFlag: [],    // 列表checkbox的状态
      loading: false,   // 加载中
      finished: false,  // 加载完成
      page: 0,          // 当前页数
      userId: ''
    }
  },
  async created() {
    this.userId = JSON.parse(this.getStorage("loginUserInfo")).userId;
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
        url: "/api/services/rpay/user/notices/query_notices",
        method: "post",
        headers: this.buildHeader(true),
        data: this.buildSecretBody(JSON.stringify({"userId": this.userId, "page": page, "size": page_num}))
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
      let that = this;
      that.details.forEach(function(value,index,array){
        that.checkFlag[index] = false;
      });

    },
    checkboxClick (item, index) {
      if(this.checkFlag[index]) {
        this.checkFlag[index].checkFlag = false;
      }else {
        this.checkFlag[index].checkFlag = true;
      }
    },
    toHome() {
      this.$router.push("/home")
    },
    async setAllRead() {
      let result = await this.axios({
        url: "/api/services/rpay/user/notices/mark_read",
        method: "post",
        headers: this.buildHeader(true),
        data: this.buildSecretBody(JSON.stringify({"userId": this.userId, "readFlag": "1"}))
      });
      this.$toast.show(result.data.retInfo.message);
      await this.loadDetails("new", 0, 15, "refresh");

    },
    async clearALl() {
      let result = await this.axios({
        url: "/api/services/rpay/user/notices/delete",
        method: "post",
        headers: this.buildHeader(true),
        data: this.buildSecretBody(JSON.stringify({"userId": this.userId}))
      });
      this.$toast.show(result.data.retInfo.message);
      await this.loadDetails("new", 0, 15, "refresh");
    }


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
}
</style>

