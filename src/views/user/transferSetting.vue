<template>
  <div class="container">
    <div class="header">
      <van-row>
        <van-col span="2"><van-icon class="header-left-icon" @click="reply"  name="arrow-left" size="21"/></van-col>
        <van-col span="18">转账管理</van-col>
        <van-col span="4" class="rightCol"></van-col>
      </van-row>
    </div>
    <div>
      <van-row style="border-bottom: 1px solid #ebedf0;font-weight: bold">
        <van-cell-group>
          <van-cell title="转账收款人" is-link @click="goNext"/>
        </van-cell-group>
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
      where: ''
    }
  },
  created() {

  },
  methods: {
    goNext() {
      this.$router.push("/transferSettingSecond/transferSetting")
    },
    reply() {
      this.$router.push({
        path:'/user'
      });
    },
  }
}
</script>
<style lang="scss" scoped>
.container {
  min-height: 100vh;
  height: 100%;
  background: white;
  .header {
    background: $d_header_bg;
    padding-top: 10px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    height: 50px;
    width: 100%;
    .header-left-icon {
      top: 2px;
    }
  }
}
</style>
