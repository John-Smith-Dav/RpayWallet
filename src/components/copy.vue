<template>
  <div class="copy-container"
       v-clipboard:copy="copyText"
       v-clipboard:success="onCopy"
       v-clipboard:error="onError">
    <slot></slot>
    <i :class="icon"></i>

  </div>
</template>

<script>
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)

export default {
  props: {
    copyText: String,
    icon: String,
  },
  methods: {
    onCopy(e) {
      this.$toast.show(this.$t('copySucceed'))
    },
    onError(err) {
      // console.log(err);
      this.$toast.show(this.$t('复制失败'))
    }
  }
}
</script>

<style lang="scss" scoped>
i {
  display: inline-block;
  width: 14px;
  height: 14px;
  background-size: 100% 100%;
  vertical-align: middle;
  margin-left: 3px;
}

i.copy_blue {
  background-image: url("../assets/images/d_copy_blue.png");
}

i.copy_white {
  background-image: url("../assets/images/d_copy_white.png");
}

</style>