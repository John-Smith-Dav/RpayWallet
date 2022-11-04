<template>
    <div class="container" v-show="isShowToast">
        <span class="toast-text animated shake" v-html="content.replace(/XRP/gi, 'KSW')"></span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isShowToast: false
            };
        }
    };
</script>

<style lang="scss" scoped>
    .container{
        position: fixed;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        z-index: 999999;
        background: $bg6;
    }
    .toast-text {
        max-width: 60%;
        line-height: 1.4;
        background: $d_white;
        border-radius: 10px;
        color: $d_font_black;
        font-weight: bold;
        padding: 15px 20px;
        z-index: 999999;
        text-align: center;
        box-shadow: 0px 0px 10px $d_font_gray1;
        font-size: 14px;
    }
</style>