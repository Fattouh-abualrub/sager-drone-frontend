<template>
  <section class="container my-3 px-4 mx-auto">
    <div class="px-6 h-full text-gray-800">
      <div
        class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
      >
        <div
          class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
        >
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            class="w-full"
            alt="Sample image"
          />
        </div>
        <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
          <div class="flex flex-row items-center justify-center lg:justify-start">
            <h2 class="text-2xl font-bold mb-3 mr-4">Create new account!</h2>
          </div>
          <hr class="border-gray-200 sm:mx-auto dark:border-gray-700 mb-3" />
          <form>
            <!-- Full Name input -->
            <div class="mb-3">
              <input
                type="text"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="name"
                placeholder="Name"
                v-model="name"
              />
              <div class="text-red-800 text-sm mb-0" v-if="errors.name != ''">
                {{ errors.name }}
              </div>
            </div>
            <!-- Email input -->
            <div class="mb-3">
              <input
                type="email"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="email"
                placeholder="Email address"
                v-model="email"
              />
              <div class="text-red-800 text-sm mb-0" v-if="errors.email != ''">
                {{ errors.email }}
              </div>
            </div>
            <!-- Password input -->
            <div class="mb-3">
              <input
                type="password"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="password"
                placeholder="Password"
                v-model="password"
              />
              <div class="text-red-800 text-sm mb-0" v-if="errors.password != ''">
                {{ errors.password }}
              </div>
            </div>
            <!-- Confirm Password input -->
            <div class="mb-3">
              <input
                type="password"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="password_confirmation"
                placeholder="Confirm Password"
                v-model="password_confirmation"
              />
              <div
                class="text-red-800 text-sm mb-0"
                v-if="errors.password_confirmation != ''"
              >
                {{ errors.password_confirmation }}
              </div>
            </div>
            <div class="text-center lg:text-left">
              <button
                @click.prevent="register"
                type="button"
                class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Register
              </button>
              <p class="text-sm font-semibold mt-2 pt-1 mb-0">
                Do you have an account?
                <router-link
                  to="/login"
                  class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                  >Login</router-link
                >
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
  name: "Register",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      errors: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
    };
  },
  methods: {
    async register() {
      this.errors = {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      };
      let response = await this.$store.dispatch("register", {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
      });
      if (response == true) {
        let that = this;
        this.$toast.success("Create account Successfully", {
          position: "bottom-right",
          timeout: 1000,
          closeButton: "button",
          icon: true,
        });
        setTimeout(function () {
          that.$router.go("/");
        }, 1000);
      } else {
        if (response.message != undefined) {
          this.$toast.error(response.message, {
            position: "bottom-right",
            timeout: 3000,
            closeButton: "button",
            icon: true,
          });
        }
        if (response.name) {
          this.errors.name = response.name[0];
        }
        if (response.email) {
          this.errors.email = response.email[0];
        }
        if (response.password) {
          this.errors.password = response.password[0];
        }
        if (response.password_confirmation) {
          this.errors.password_confirmation = response.password_confirmation[0];
        }
      }
    },
  },
};
</script>
