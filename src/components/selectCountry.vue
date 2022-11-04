<template>
  <div class="content">
    <div class="header" >
      <van-row>
        <van-col span="24">
          <span>手机号归属地</span>
        </van-col>
      </van-row>
    </div>
    <van-index-bar :sticky="false" highlight-color="#fb6463" style="overflow-y: auto">
      <van-index-anchor v-for="(item,index) in country" :key="index" :index="index" class="index-anchor">
        <div style="background-color: #F0F0F0;font-weight: bold"><span style="padding-left: 15px" >{{index}}</span></div>
        <van-cell @click="chooseCountry(citem)" v-for="(citem,cindex) in item" :key="cindex" :title="citem.name" :value="'+' + citem.areaCode" is-link style="padding-right: 15px"/>
      </van-index-anchor>
    </van-index-bar>
  </div>
</template>

<script>
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
      country: {}
    }
  },
  mounted(){
    this.axios({
      url: "/api/public/country/getAll",
      method: "post",
      data: {},
      headers: {
        'Authorization': 'Bearer ' + this.getToken(),
      }
    }).then(res => {
      if (res.data && res.data.result) {
        let countryName = {};
        for (let i=0; i< this.FirstPin.length; i++) {
            let pin = this.FirstPin[i];
            countryName[pin] = [];
            for (let j=0; j<res.data.result.length;j++) {
              let dataObj = res.data.result[j];
              let first = dataObj.nameEn.substring(0, 1).toUpperCase();
              if (first == pin) {
                countryName[pin].push(dataObj);
              }
            }
        }

        console.log(countryName)
        this.country = countryName;

      }
    }).catch(e => {
      console.log(e);
    });

  },
  methods:  {
    hideModal() {
      this.$emit('on-cancel')
    },
    chooseCountry(item) {
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
