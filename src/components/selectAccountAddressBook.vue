<template>
  <div class="content">
    <div class="header" >
      <van-row>
        <van-col span="24">
          <span>转账通讯录</span>
        </van-col>
      </van-row>
    </div>
    <van-index-bar :sticky="false" highlight-color="#fb6463" style="overflow-y: auto">
      <van-index-anchor v-for="(item,index) in books" :key="index" :index="index" class="index-anchor">
        <div style="background-color: #F0F0F0;font-weight: bold"><span style="padding-left: 15px" >{{index}}</span></div>
        <div @click="chooseBooks(citem)" v-for="(citem,cindex) in item" :key="cindex" style="text-align: left;padding-left: 5px;border-bottom: 1px solid #ebedf0;">
          <van-row>
            <van-col span="4" style="padding-top: 10px"><img :src="imageUrl +　citem.avatar" alt="" width="40px" height="40px" style="border-radius: 5px;"></van-col>
            <van-col span="20">
              <van-cell style="font-weight: bold" :title="citem.surname"  :label="citem.oppAccountId" is-link/>
            </van-col>
          </van-row>


        </div>


      </van-index-anchor>
    </van-index-bar>
  </div>
</template>

<script>
import pinyin from 'js-pinyin'
import Const from "@/plugins/const";
export default {
  data(){
    return{
      FirstPin: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "M",
        "N",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "W",
        "X",
        "Y",
        "Z"
      ],
      books: {},
      imageUrl: Const.backDefaultServerUrl + '/api/file/image/',
      avatar : '',
    }
  },
  components: {
    pinyin
  },
  mounted(){
    // 异步获取数据
    this.axios({
      url: "/api/user/address/book/query",
      method: "post",
      headers: {'Authorization': 'Bearer ' + this.getToken()},
      data: {
        "userId": JSON.parse(this.getStorage("loginUserInfo")).userId,
        "page": 0, "size": 1000
      }
    }).then(res => {
      if (res.data && res.data.result) {
        let countryName = {};
        for (let i=0; i< this.FirstPin.length; i++) {
          let pin = this.FirstPin[i];
          countryName[pin] = [];
          for (let j=0; j<res.data.result.content.length;j++) {
            let dataObj = res.data.result.content[j];
            let first = pinyin.getFullChars(dataObj.surname).substring(0, 1).toUpperCase();
            if (first == pin) {
              countryName[pin].push(dataObj);
            }
          }
        }

        console.log(countryName)
        this.books = countryName;

      }
    });

  },
  methods:  {
    hideModal() {
      this.$emit('on-cancel')
    },
    chooseBooks(item) {
      this.$emit('on-ok', item)
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
  padding-top: 15px;
  color: $d_font_black;
  font-size: 16px;
  font-weight: bold;
  text-align: center;


}

/deep/ .van-index-anchor  {
  padding: 0px;
}
</style>
