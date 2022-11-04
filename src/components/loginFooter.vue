<template>
  <div>
    <van-row style="padding-top: 25px;text-align: center;padding-left: 50px;padding-right: 50px;font-size: 14px">
      <van-col span="8" style="text-align: center;" >
        <span style="color: #1989fa" @click="$router.push('/registration')">注册账号</span>
      </van-col>
      <van-col span="8" style="text-align: center;padding-right: 15px;padding-left: 15px" >
        <span style="color: #1989fa" @click="$router.push('/loginNoStored')">更换账号</span>
      </van-col>
      <van-col span="8">
        <span style="color: #1989fa" @click="$router.push('/findPassword')">找回密码</span>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  mounted(){

  },
  methods:  {

  }
}
</script>

<style lang="scss" scoped>

</style>
