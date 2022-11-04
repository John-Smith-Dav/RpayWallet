<template>
  <div class="btn-container" @click="comfirm" :style="{width: width, height: height, textAlign: textAlign}">
    <button :style="{background: bgColor, color: btnFontColor,
                     fontWeight: fontWeight, width: btnWidth,
                     height: btnHeight, letterSpacing: letterSpace,
                     borderRadius: borderRadius,fontSize:fontSize}" class="bor-radio">
      <i :class="icon" v-if="icon"></i>
      {{ text }}{{ submitState ? '...' : '' }}
    </button>
  </div>
</template>
<script>
export default {
  props: {
    submitState: false,
    width: String,
    btnWidth: String,
    btnHeight: String,
    fontSize: String,
    height: String,
    bgColor: String,
    text: String,
    icon: String,
    fontWeight: String,
    letterSpace: String,
    textAlign: String,
    borderRadius: String,
    btnFontColor: String
  },
  data() {
    return {};
  },
  methods: {
    comfirm() {
      if (this.submitState) return;
      this.$emit("comfirm");
    }
  }
};
</script>
<style lang="scss" scoped>
.btn-container {
  text-align: center;
  margin: 0 auto;

  i {
    width: 22px;
    height: 22px;
    display: inline-block;
    background-size: 100% 100%;
    vertical-align: middle;
    margin-right: 5px;
  }

  i.download_ios {
    background-image: url("../assets/images/download_ios@2x.png");
  }

  i.download_android {
    background-image: url("../assets/images/download_android@2x.png");
  }

  i.download_web {
    background-image: url("../assets/images/download_web@2x.png");
  }

  i.transfer {
    background-image: url("../assets/images/d_transfer.png");
    background-size: 100% 100%;
    width: 14px;
    height: 14px;
  }

  i.collection {
    background-image: url("../assets/images/d_collection.png");
    background-size: 100% 100%;
    width: 15px;
    height: 15px;
  }

  button {
    height: 44px;
    color: $d_btn_white;
    font-size: 14px;
    width: 85%;
    border: 0;
    background-color: $d_card_bg1;
    font-weight: 550;

    &.bor-radio {
      border-radius: 5px;
    }
  }
}
</style>