<template>
<head>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
</head>
  <v-app>
    <header-main />
    <v-main>
      <router-view />
    </v-main>
    <footer-main />
  </v-app>
</template>

<script>
import HeaderMain from "@/components/fixes/HeaderMain.vue";
import FooterMain from "@/components/fixes/FooterMain.vue";
// import Home from '@/pages/TimeLine'
export default {
  name: "App",
  components: { HeaderMain, FooterMain },
  data: () => ({
    mounted() {
      console.log(this.$route);
    },
  }),
};
</script>
<style>
.v-container {
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>