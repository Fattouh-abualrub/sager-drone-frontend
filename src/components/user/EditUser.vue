<template>
  <section class="container my-3 px-4 mx-auto">
    <div class="px-6 h-full text-gray-800">
      <div
        class="mt-3 flex xl:justify-center justify-center items-center flex-wrap h-full g-6"
      >
       
        <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0 bg-gray-100 p-3 drop-shadow-lg rounded">
          <div class="flex flex-row items-center justify-center">
            <h2 class="text-2xl font-bold mb-3 mr-4">Edit User!</h2>
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
              <p class="text-sm font-bold">Fill password just if you want change the it</p>
            </div>
            <div class="text-center lg:text-left">
              <button
                @click.prevent="edit_user"
                type="button"
                class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "EditUser",
  data() {
    return {
      user_id: 0,
      name: "",
      email: "",
      password: "",
      errors: {
        name: "",
        email: "",
        password: ""
      },
    };
  },
  created() {
    this.user_id = this.$router.currentRoute.params.user_id;
    this.get_user();
  },
  methods: {
async get_user() {
      let response = await this.$store.dispatch("show_user", {
        id: this.user_id
      });
      if (response.status == true) {
        this.name = response.user.name;
        this.email = response.user.email;
      } else {
      }
    },
    async edit_user() {
      this.errors = {
        name: "",
        email: "",
        password: ""
      };
      let response = await this.$store.dispatch("edit_user", {
        name: this.name,
        email: this.email,
        password: this.password,
        id: this.user_id
      });
      if (response.status == true) {
        let that = this;
        this.$toast.success("Update User Successfully", {
          position: "bottom-right",
          timeout: 1000,
          closeButton: "button",
          icon: true,
        });
        setTimeout(function () {
          that.$router.replace("/users");
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
        if (response.errors.name) {
          this.errors.name = response.errors.name[0];
        }
        if (response.errors.email) {
          this.errors.email = response.errors.email[0];
        }
        if (response.errors.password) {
          this.errors.password = response.errors.password[0];
        }
      }
    },
  },
};
</script>
