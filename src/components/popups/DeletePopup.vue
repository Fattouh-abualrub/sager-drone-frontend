<template>
  <div>
    <button
      @click="isOpen = true"
      type="button"
      class="bg-red-600 hover:bg-red-800 text-white font-bold py-1 px-3 border-b-4 border-red-700 hover:border-red-900 rounded"
    >
      <i class="fa-solid fa-trash"></i>
    </button>
    <!-- Main modal -->
    <div
      v-show="isOpen"
      class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-20"
    >
      <div class="max-w-md w-full p-6 bg-white rounded-md shadow-xl">
        <div class="flex items-center justify-between">
          <h3 class="text-2xl">Delete #{{ id }}</h3>
          <span @click="isOpen = false"
            ><i class="fa-regular fa-circle-xmark cursor-pointer text-lg"></i
          ></span>
        </div>
        <div class="mt-4">
          <p class="mb-4 text-lg">Are you sure you want delete this?</p>
          <div class="text-right">
            <button
              @click="isOpen = false"
              class="px-6 py-2 text-blue-800 border border-blue-600 rounded"
            >
              No
            </button>
            <button
              @click.prevent="delete_item"
              class="px-6 py-2 ml-2 text-red-100 bg-red-600 rounded"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeletePopup",
  props: ["id", "type"],
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    async delete_item() {
      var dataToSend = {
        type: this.type,
        id: this.id,
      };
      let response = await this.$store.dispatch("delete_item", dataToSend);
      if (response.status == true) {
        let that = this;
        this.isOpen = false;
        this.$toast.success(response.message, {
          timeout: 1000,
          closeButton: "button",
          icon: true,
        });

        setTimeout(function () {
          that.$router.go("/"+ that.type);
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
