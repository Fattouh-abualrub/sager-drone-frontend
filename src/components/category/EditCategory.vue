<template>
  <div>
    <button
      @click="isOpen = true"
      type="button"
      class="bg-blue-600 mr-2 hover:bg-blue-800 text-white font-bold py-1 px-3 border-b-4 border-blue-700 hover:border-blue-900 rounded"
    >
      <i class="fa-solid fa-pen-to-square"></i>
    </button>
    <!-- Main modal -->
    <div
      v-show="isOpen"
      class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50"
    >
      <div class="max-w-xl w-full p-6 bg-white rounded-md shadow-xl">
        <div class="flex items-center justify-between">
          <h3 class="text-2xl">Edit category</h3>
          <span @click="isOpen = false"
            ><i class="fa-regular fa-circle-xmark cursor-pointer text-lg"></i
          ></span>
        </div>
        <div class="mt-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="category_name">
              Category Name
            </label>
            <input
              class="h-12 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="category_name"
              type="text"
              v-model="name"
              placeholder="Category Name"
            />
          </div>
          <div class="text-right">
            <button
              @click="isOpen = false"
              class="px-6 py-2 ml-2 text-red-100 bg-red-600 rounded"
            >
              No
            </button>
            <button
              @click.prevent="edit_category"
              class="px-6 py-2 ml-2 text-blue-100 bg-blue-600 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditCategory",
  props: ["id", "name"],
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    async edit_category() {
      var dataToSend = {
        name: this.name,
        id: this.id
      };
      let response = await this.$store.dispatch("edit_category", dataToSend);
      if (response.status == true) {
        let that = this;

        this.isOpen = false;
        this.name = '';
        this.$toast.success(response.message, {
          timeout: 1000,
          closeButton: "button",
          icon: true,
        });

        setTimeout(function () {
          that.$router.go("/categories");
        }, 1000);
      } else {
        if (response.message != undefined) {
          this.isOpen = false;
          this.$toast.error(response.message);
        }
      }
    },
  },
};
</script>
