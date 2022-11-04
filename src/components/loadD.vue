<template>
  <van-overlay class="overlay" :show="show">
    <div class="wrapper">
      <div class="block">
        <van-loading type="spinner" color="#1989fa"/>
      </div>
    </div>
  </van-overlay>
</template>

<script>
export default {
  data() {
    return {
      show: true
    }
  }
}
</script>

<style scoped lang="scss">
  .overlay{
    background-color: rgba(0,0,0,.5);
    z-index: 1000;
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 12px;
    height: 12px;
  }
</style>