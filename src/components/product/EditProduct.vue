<template>
  <section class="container my-3 px-4 mx-auto">
    <div class="px-6 h-full text-gray-800">
      <div
        class="mt-3 flex xl:justify-center justify-center items-center flex-wrap h-full g-6"
      >
        <div
          class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0 bg-gray-100 p-3 drop-shadow-lg rounded"
        >
          <div class="flex flex-row items-center justify-center">
            <h2 class="text-2xl font-bold mb-3 mr-4">Edit Product!</h2>
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
            <!-- Quantity input -->
            <div class="mb-3">
              <input
                type="number"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="quantity"
                placeholder="Quantity"
                v-model="quantity"
              />
              <div class="text-red-800 text-sm mb-0" v-if="errors.quantity != ''">
                {{ errors.quantity }}
              </div>
            </div>
            <!-- Price input -->
            <div class="mb-3">
              <input
                type="number"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="price"
                step="any"
                placeholder="Price"
                v-model="price"
              />
              <div class="text-red-800 text-sm mb-0" v-if="errors.price != ''">
                {{ errors.price }}
              </div>
            </div>
            <!-- Desc input -->
            <div class="mb-3">
              <textarea
                class="h-28 form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="description"
                placeholder="Description"
                v-model="description"
              ></textarea>
              <div class="text-red-800 text-sm mb-0" v-if="errors.description != ''">
                {{ errors.description }}
              </div>
            </div>
            <!-- Desc input -->
            <div class="mb-3">
              <multiselect
                v-model="categories"
                tag-placeholder="Search or choose categories"
                placeholder="Search or choose categories"
                label="name"
                track-by="id"
                :options="categories_options"
                :multiple="true"
              ></multiselect>
              <div class="text-red-800 text-sm mb-0" v-if="errors.categories != ''">
                {{ errors.categories }}
              </div>
            </div>
            <!-- Desc input -->
            <div class="mb-3">
              <input
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                type="file"
                @change="onChange"
              />
              <div class="text-red-800 text-sm mb-0" v-if="errors.images != ''">
                {{ errors.images }}
              </div>
              <img :src=image_url class="w-full object-cover object-center mt-2 max-h-28" accept="image/png, image/gif, image/jpeg">
            </div>
            <div class="text-center lg:text-left">
              <button
                @click.prevent="edit_product"
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
import Multiselect from "vue-multiselect";

export default {
  name: "EditProduct",
  data() {
    return {
      product_id: 0,
      name: "",
      quantity: "",
      price: "",
      description: "",
      image: "",
      image_url:"",
      errors: {
        name: "",
        quantity: "",
        price: "",
        description: "",
        categories: "",
        images: "",
      },
      categories: [],
      categories_options: [],
    };
  },
  components: {
    Multiselect,
  },
  created() {
    this.product_id = this.$router.currentRoute.params.product_id;
    this.get_categories();
    this.get_product();
  },
  methods: {
    onChange(e) {
      this.image = e.target.files[0];
    },
    async get_categories() {
      let response = await this.$store.dispatch("get_categories", {
        action: "all",
      });
      if (response == true) {
        let categories = this.$store.state.categories.categories;

        categories.forEach((category) => {
          this.categories_options.push({ id: category.id, name: category.name });
        });
      } else {
      }
    },
    async get_product() {
      let response = await this.$store.dispatch("show_product", {
        id: this.product_id,
      });
      if (response.status == true) {
        this.name = response.product.name;
        this.quantity = response.product.quantity;
        this.price = response.product.price;
        this.description = response.product.description;
        this.categories = response.product.categories;
        this.image_url = response.product.image;
      } else {
      }
    },
    async edit_product() {
      this.errors = {
        name: "",
        quantity: "",
        price: "",
        description: "",
        categories: "",
        images: "",
      };

      let response = await this.$store.dispatch("edit_product", {
        name: this.name,
        quantity: this.quantity,
        price: this.price,
        description: this.description,
        categories: this.categories,
        id: this.product_id,
        image: this.image,
      });
      if (response.status == true) {
        let that = this;
        this.$toast.success(response.message, {
          position: "bottom-right",
          timeout: 1000,
          closeButton: "button",
          icon: true,
        });
        setTimeout(function () {
          that.$router.replace("/products");
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
        if (response.errors.price) {
          this.errors.price = response.errors.price[0];
        }
        if (response.errors.quantity) {
          this.errors.quantity = response.errors.quantity[0];
        }
        if (response.errors.categories) {
          this.errors.categories = response.errors.categories[0];
        }
        if (response.errors.description) {
          this.errors.description = response.errors.description[0];
        }
        if (response.errors.image) {
          this.errors.images = response.errors.image[0];
        }
      }
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
