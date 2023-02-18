<template>
  <div>
    <div
      :class="hidden_class"
      id="mobile-popup"
      class="fixed inset-0 flex py-28 px-10 mobile-popup items-center justify-center bg-gray-700 bg-opacity-50 z-20"
    >
      <div class="w-full p-10 bg-white rounded-md shadow-xl">
        <div class="flex items-center justify-between">
          <h3 class="text-2xl"></h3>
        </div>
        <div class="mt-4">
          <p class="mb-4 text-2xl">
            Mobile Not Fully Responsive, Please Use Desktop Screen
          </p>
          <div class="text-right">
            <button
              @click.prevent="hidden_class = 'hidden_important'"
              class="px-6 py-2 ml-2 text-red-100 bg-red-600 rounded"
            >
              Okay!
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MobilePopup",
  data() {
    return {
      hidden_class: "hidden",
    };
  },
};
</script>
<style>
.mobile-popup.hidden_important {
  display: none !important;
}
@media only screen and (max-width: 767px) {
  #mobile-popup.mobile-popup {
    display: block;
  }
}
</style>
