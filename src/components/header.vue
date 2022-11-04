<template>
    <section class="header" :style="`background:${color}`">
        <img  v-if="leftShow && !leftIcon"  @click="reply" src="../assets/images/home_search_white.png" alt="" class="icon_l">
        <img  v-if="leftShow && leftIcon"  @click="reply" :src="leftIcon" alt="" class="icon_l">
        <span>{{title}}</span>
        <span @click="totextpath"  v-if="righttext" class="text_r" >{{righttext}}</span>
        <img @click="topath"  v-if="rightIcon" :src="rightIcon || '../assets/images/d_jingxuan_5.png'" alt="" class="icon-r">
    </section>
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
            leftIcon: {
                //  左侧图标地址
                type: String,
                default: ""
            },
            leftEv: {
                // 左侧event
                type: Function,
                default: () => {
                    return null;
                }
            },
            leftShow: {
                // 是否显示返回按钮
                type: Boolean,
                default: true
            },
            title: {
                // 居中标题
                type: String,
                default: "首页"
            },
            righttext: {
                // 居中标题
                type: String,
                default: ""
            },
            rightIcon: {
                // 右侧图标地址
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
            totextpath(){
                if (this.rightEv) {
                    this.rightEv();
                    return;
                }
            },
            reply() {
                if(this.leftEv()){
                    return;
                }
                if (typeof plus == "object") {
                    let webview = plus.webview.getLaunchWebview();
                    webview.back();
                } else {
                    this.$router.go(-1);
                    // if((this.$route.name=='shoukuan'||this.$route.name=='scanning')){
                    //     this.$router.push({name:'wallet'});
                    // }else {
                    //     this.$router.go(-1);
                    // }
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
    .header {
        background: $d_bg;
        z-index: 10;
        height: 50px;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        color: $d_font_black;
		font-size: 16px;
		font-weight: bold;
        text-align: center;
        span {
            line-height: 50px;
            
        }
        img {
            width: 15px;
            height: 15px;
            margin-top: 13px;
        }
        .icon_l {
            position: absolute;
            left: 15px;
        }
        .icon-r {
            position: absolute;
            right: 15px;
        }
        .text_r{
            position: absolute;
            right: 15px;
            font-size: 14px;
            color: $d_font_gray1;
        }
    }
</style>