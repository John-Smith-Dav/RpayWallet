<template>
  <section class="empty">
    <div class="imgbox">
         <img src="../assets/images/d_empty.png" alt="" srcset="">
    </div>
    <div class="text">暂无数据</div>
  </section>
</template>
<script>
export default {
  name: "empty"
};
</script>
<style lang="scss" scoped>
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: $d_font_gray1;
  .imgbox {
    width: 15%;
    height: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1px;
    padding-top: 5px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .text {
    font-size: 8pt;
  }
}
</style>
