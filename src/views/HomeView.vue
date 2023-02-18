<template>
  <div class="home">
    <SmallBox />
    <Charts />
  </div>
</template>

<script>
import SmallBox from "@/components/home/SmallBox.vue";
import Charts from "@/components/home/Charts.vue";

export default {
  name: "HomeView",
  components: {
    SmallBox,
    Charts
  },
};
</script>
