<template>
  <div id="app">
    <Loader />
    <Header />
    <router-view />
    <Footer />
    <MobilePopup />
  </div>
</template>
<script>
import Header from "./components/layouts/Header.vue";
import Footer from "./components/layouts/Footer.vue";
import Loader from "./components/packages/Loader.vue";
import MobilePopup from "./components/popups/MobilePopup.vue";

export default {
  name: "Layout",
  components: {
    Header,
    Footer,
    Loader,
    MobilePopup
  },
};
</script>
