<template>
  <div>
    <nav class="bg-gray-50 dark:bg-gray-700">
      <div
        class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5"
      >
        <a href="/" class="flex items-center">
          <img
            src="@/assets/images/Sager-logo.png"
            class="h-6 mr-3 sm:h-9"
            alt="Sager Drone Logo"
          />
        </a>
        <div class="flex items-center" v-if="this.$store.state.token == ''">
          <router-link
            to="/register"
            class="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline mr-5"
            >Register</router-link
          >
          <router-link
            to="/login"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >Login</router-link
          >
        </div>
        <div class="flex items-center" v-else-if="this.$store.state.token != ''">
          <button
            @click="logout"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
    <nav
      class="bg-red-600 text-white dark:bg-red-700"
      v-if="this.$store.state.token != ''"
    >
      <div class="max-w-screen-xl px-4 py-3 mx-auto md:px-6">
        <div class="flex items-center">
          <ul class="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
            <li>
              <router-link to="/" class="text-white hover:underline"
                >Home</router-link
              >
            </li>
            <li>
              <router-link to="/users" class="text-white hover:underline"
                >Users</router-link
              >
            </li>
            <li>
              <router-link to="/products" class="text-white hover:underline"
                >Products</router-link
              >
            </li>
            <li>
              <router-link to="/categories" class="text-white hover:underline"
                >Categories</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: "Header",
  methods: {
    async logout() {
      let response = await this.$store.dispatch("logout");
      if (response) {
        let that = this;
        this.$toast.success(response.message, {
          position: "bottom-right",
          timeout: 1000,
          closeButton: "button",
          icon: true,
        });
        setTimeout(function () {
          that.$router.go("/login");
        }, 1000);
      } else {
        if (response.message != undefined) {
          this.$toast.error(response.message);
        }
      }
    },
  },
};
</script>
