<template>
    <div>
        <canvas id="canvas"></canvas>
    </div>
</template>
<script>
import QRCode from 'qrcode'
export default {
    props: {
        qrcodeContent: String
    },
    mounted(){
        this.setQrcode();
    },
    watch : {
      qrcodeContent () {
            this.setQrcode();
        }
    },
    methods: {
        setQrcode(){
            const canvas = document.getElementById('canvas');
            const {qrcodeContent} = this;
            QRCode.toCanvas(canvas, qrcodeContent, err => {
                /* if(err) console.log(err);
                 console.log('qrcode success')*/
            })
        }
    }
}
</script>

<style lang="scss" scoped>
#canvas{
    width: 100% !important;
    height: 100% !important;
}
</style>