<template>
  <div class="modal-bg" v-show="show">
    <div class="modal-container">
      <div class="modal-header">
        {{ title }}
      </div>
      <div class="modal-content">
        <slot></slot>
      </div>
<!--      <div class="modal-footer">
        <button class="cancel" @click="hideModal">{{ $t('wallet.zhuanqian7') }}</button>
        <button class="comfirm" @click="submit">{{ btnText || $t('confirm') }}</button>
      </div>-->
      <van-row class="modal-footer">
        <van-col span="12" class="modal-button">
          <button :style="{color: cancelBtnFontColor}" class="cancel" @click="hideModal">{{ cancelBtnText || $t('wallet.zhuanqian7') }}</button>
        </van-col>
        <van-col span="12">
          <button class="comfirm" @click="submit">{{ btnText || $t('confirm') }}</button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    btnText: {
      type: String,
      default: ''
    },
    cancelBtnText: {
      type: String,
      default: ''
    },
    cancelBtnFontColor: {
      type: String,
      default: ''
    },
  },
  methods: {
    hideModal() {
      this.$emit('on-cancel')
    },
    submit() {
      this.$emit('on-ok')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .5);
  z-index: 20;

  .modal-container {
    opacity: 0.95;
    background: $d_bg;
    width: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    border-radius: 15px;
    padding: 0 0 0 0 ;
    position: absolute;
    color: $d_font_black;

    .modal-header {
      text-align: center;
      padding: 20px 15px 10px 15px;
      color: $d_font_black;
      font-size: 16px;
      font-weight: bolder;
      letter-spacing: 1px;
    }
    .modal-footer {
      margin-top: 20px;
      display: flex;
      align-items: center;
      border-top: 1px $d_header_bottom_border solid;
      .modal-button {
        border-right: 1px $d_header_bottom_border solid;
      }
      button {
        height: 40px;
        line-height: 30px;
        border-radius: 10px;
        font-size: 16px;
        text-align: center;
        border: 0;
        width: 100%;
      }

      .cancel {
        letter-spacing: 1px;
        background: inherit;
        font-size: 14px;
        font-weight: 600;
        color: $d_font_gray1;
      }

      .comfirm {
        letter-spacing: 1px;
        background: inherit;
        font-size: 14px;
        font-weight: 600;
        color: $d_card_bg2;
      }
    }
  }

  .inp-password {
    background: $d_bg;
    border-radius: 6px;
    border: 1px solid $d_header_bottom_border;
    margin: 0 20px;
    position: relative;
    input {
      border-radius: 5px;
      appearance: none;
      outline: none;
      font-size: 14px;
      padding: 5px;
      background-color: transparent;
      width: 100%;
    }
  }
}
</style>