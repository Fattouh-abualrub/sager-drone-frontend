<template>
  <div v-show="this.$store.state.loader" class="fixed bg-white/[.90] inset-0 z-50 loader-overlay flex justify-center items-center h-screen w-full">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  name: "Loader",
  data() {
    return {};
  },
};
</script>
<style>
.loader {
  border: 8px solid #d5d0d0;
  border-radius: 50%;
  border-top: 8px solid #DC2626;
  width: 60px;
  height: 60px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
