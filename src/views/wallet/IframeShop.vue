<template>

  <iframe id='linkedFrame'
          hight='100%'
          width='100%'
          :src="url"
          frameborder='0'
          scrolling='auto'
          onload='this.height=800'>

  </iframe>

</template>
<script>

export default {
  name: "home",
  data() {
    return {
      url:""
    };
  },
  watch: {

  },
  mounted() {

  },
  created() {
    this.url = this.$route.query.url;
  },
  destroyed() {

  },
  methods: {



  }
};
</script>
