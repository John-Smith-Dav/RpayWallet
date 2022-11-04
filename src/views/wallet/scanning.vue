<template>
  <section class="scanning">
    <HeaderD title="扫码付款"></HeaderD>
    <van-icon class="scan-img"  @click="scanImg" name="photo-o" size="30px" color="black"/>
    <div class="content" id="qr_transfer">
    </div>

  </section>
</template>
<script>
export default {
  name: "scanning",
  data() {
    return {

    }
  },
  mounted() {
    setTimeout(() => {
      this.createBarcode();
    }, 300);
  },
  beforeDestroy() {
    // console.log('beforeDestroy');
    if (this.barcode) {
      console.log('beforeDestroy');
      this.barcode.cancel();
      this.barcode.close();
      this.barcode = null;
    }
  },
  methods: {
    createBarcode() {
      if (typeof plus == 'object') {
        let that = this;
        if (!that.barcode) {
          that.barcode = new plus.barcode.Barcode('qr_transfer');
          console.log(that.barcode);
          that.barcode.onmarked = function (type, result) {
            let queryObj = JSON.parse(result);
            that.$router.push({path:'/transferThird', query:{ oppAccountId: queryObj.oppAccountId, changeType: '3', prepayId: queryObj.prepayId, totalAmount: queryObj.totalAmount }});

          };
          that.barcode.onerror = function (error) {
            // loaded code
            console.log(error);
            that.$store.commit('msg', error.message);
          }
        }
        that.barcode.start();
      }
    },
    scanImg() {
      // 从系统相册选择文件
      if (!window.plus) return;
      var that = this;
      plus.gallery.pick(
          function(path) {
            plus.barcode.scan(path,
                function(type, result) {
                  that.$router.push({path:'/transferThird', query:{ oppAccountId: result.oppAccountId, changeType: '3', prepayId: result.prepayId, totalAmount: result.totalAmount }});
                },
                function(e) {
                  //图片无法识别,请用扫码上传
                  plus.nativeUI.alert('图片无法识别,请用扫码上传', function(e){}, "", '确认');
                }
            );
          },
          function(e) {
            //取消图片选择响应
          },
          { filter: "image" }
      );
    },
  }
};
</script>
<style lang="scss" scoped>
.scanning {
  background: $bg;
  text-align: center;
  display: flex;
  justify-content: center;

  .content {
    position: absolute;
    top: 50px;
    bottom: 0px;
    left: 0;
    width: 100vw;
    opacity: 0.1;
  }

  .coloractive {
    color: $d_font_blue;
  }

  .erweim {
    position: absolute;
    bottom: 40px;
    width: 100%;
    display: flex;
    justify-content: space-around;

    .erbox {
      color: $d_font_black;
      font-size: 14px;

      img {
        width: 30px;
        height: 30px;
        margin-bottom: 10px;
      }
    }
  }
}
.scan-img{
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 100;
}
</style>

