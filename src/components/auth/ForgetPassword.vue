<template>
  <section class="container my-3 px-4 mb-32 mx-auto">
    <div class="px-6 h-full text-gray-800 mt-16">
      <div
        class="flex xl:justify-center justify-center items-center flex-wrap h-full g-6"
      >
        <div
          class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0 bg-gray-100 p-3 drop-shadow-lg rounded"
        >
          <div class="flex flex-row items-center justify-center">
            <h2 class="text-2xl font-bold mb-3 mr-4">Forget Password</h2>
          </div>
          <hr class="border-gray-200 sm:mx-auto dark:border-gray-700 mb-3" />
          <form>
            <!-- Email input -->
            <div class="mb-3">
              <input
                type="email"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="email"
                placeholder="Enter Your Email"
                v-model="email"
              />
              <div
                class="text-red-800 text-sm mb-0"
                v-show="errors.email != ''"
                v-html="errors.email"
              ></div>
            </div>

            <div class="text-center lg:text-left">
              <button
                @click.prevent="forget_password"
                type="button"
                class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Submit
              </button>
              <p class="text-sm font-semibold mt-2 pt-1 mb-0">
                Return back from
                <router-link
                  to="/login"
                  class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                  >here</router-link
                >
                ?
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ForgetPassword",
  data() {
    return {
      email: "",
      errors: {
        email: "",
      },
    };
  },
  methods: {
    async forget_password() {
      this.errors = {
        email: "",
      };
      let response = await this.$store.dispatch("forget_password", {
        email: this.email,
      });
      if (response.status == true) {
        this.$toast.success(response.message, {
          position: "bottom-right",
          timeout: 5000,
          closeButton: "button",
          icon: true,
        });
      } else {
        if (response.message != undefined) {
          this.$toast.error(response.message, {
            position: "bottom-right",
            timeout: 3000,
            closeButton: "button",
            icon: true,
          });
        }
        if (response.errors.email) {
          this.errors.email = response.errors.email[0];
        }
      }
    },
  },
};
</script>
