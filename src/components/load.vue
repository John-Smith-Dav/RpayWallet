<template>
    <div class="load">
        <div style="text-align: center;">
            <div class="loader5"></div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "load",
        data() {
            return {}
        },
    }
</script>

<style scoped lang="scss">
    .load{
        width: 100%;
        min-height: 50vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .loader5 {
        display:inline-block;
        width: 0;
        height:0;
        border-left: 18px solid transparent;
        border-right: 18px solid transparent;
        border-bottom: 18px solid $active;
        border-top: 18px solid $primary;
        -webkit-animation: loader5 3s ease-in-out infinite alternate;
        animation: loader5 3s ease-in-out infinite alternate;
    }

    @keyframes loader5 {
        from {transform: rotate(0deg);}
        to {transform: rotate(720deg);}
    }
    @-webkit-keyframes loader5 {
        from {-webkit-transform: rotate(0deg);}
        to {-webkit-transform: rotate(720deg);}
    }
</style>