<template>
  <div class="header" :style="`background:${color}`">
    <van-row>
      <van-col span="2">
        <van-icon class="header-left-icon" @click="reply" v-if="leftIcon" name="arrow-left" size="21"/>
      </van-col>
      <van-col span="20">
        <span>{{ title }}</span>
      </van-col>
      <van-col span="2" class="rightCol">
        <span @click="totextpath" v-if="righttext" class="text_r">{{ righttext }}</span>
        <van-icon @click="topath" v-if="rightIcon" :name="rightIcon"/>
      </van-col>
    </van-row>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {};
  },
  props: {
    color: {
      // 背景色
      type: String,
      default: '$d_bg;',
    },
    leftEv: {
      // 左侧event
      type: Function,
      default: () => {
        return null;
      }
    },
    leftIcon: {
      type: String,
      default: "true",
    },
    title: {
      // 居中标题
      type: String,
      default: "首页"
    },
    rightIcon: {
      // 右侧图标地址
      type: String,
      default: ""
    },
    righttext: {
      // 居中标题
      type: String,
      default: ""
    },
    rightEv: {
      // 右侧event
      type: Function,
      default: () => {
        return null;
      }
    }
  },
  methods: {
    topath() {
      if (this.rightEv) {
        this.rightEv();
        return;
      }
    },
    totextpath() {
      if (this.rightEv) {
        this.rightEv();
        return;
      }
    },
    reply() {
      if (this.leftEv()) {
        return;
      }
      if ((this.$route.name == "zhuanqian" && this.$route.params.toAddress) || (this.$route.name == "zhuanqian2" && this.$route.params.toAddress) || (this.$route.name == "binding" && this.$route.params.invite)) {
        this.$router.go(-3);
      } else if (this.$route.name == "vote1" || this.$route.name == "vote2"||this.$route.name == "vote3"||this.$route.name == "vote4"){
        this.$router.push({path: '/community'});
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
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
</style>
