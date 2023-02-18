<template>
  <div class="flex">
    <div
      class="item h-28 w-full bg-sky-500 p-3 m-4 flex justify-between items-center rounded-lg"
    >
      <div class="info">
        <h1 class="text-4xl text-white">{{ users }}</h1>
        <h3 class="text-lg text-white">Users</h3>
      </div>
      <div class="icon bg-white rounded-full w-20 h-20 flex justify-center items-center">
        <i class="fa-solid fa-users text-sky-500 text-5xl"></i>
      </div>
    </div>
    <div
      class="item h-28 w-full bg-sky-700 p-3 m-4 flex justify-between items-center rounded-lg"
    >
      <div class="info">
        <h1 class="text-4xl text-white">{{ products }}</h1>
        <h3 class="text-lg text-white">Products</h3>
      </div>
      <div class="icon bg-white rounded-full w-20 h-20 flex justify-center items-center">
        <i class="fa-solid fa-boxes-stacked text-sky-700 text-5xl"></i>
      </div>
    </div>
    <div
      class="item h-28 w-full bg-sky-900 p-3 m-4 flex justify-between items-center rounded-lg"
    >
      <div class="info">
        <h1 class="text-4xl text-white">{{ categories }}</h1>
        <h3 class="text-lg text-white">Categories</h3>
      </div>
      <div class="icon bg-white rounded-full w-20 h-20 flex justify-center items-center">
        <i class="fa-solid fa-list text-sky-900 text-5xl"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SmallBox",
  data() {
    return {
      categories: 0,
      users: 0,
      products: 0,
    };
  },
  async mounted() {
    let response = await this.$store.dispatch("get_totals");
    if (response.status == true) {
      this.users = response.total_numbers[0];
      this.products = response.total_numbers[1];
      this.categories = response.total_numbers[2];
    } else {
      if (response.message != undefined) {
        this.$toast.error(response.message);
      }
    }
  },
};
</script>
