<template>
  <div class="add_product">
  <AddProduct />
  </div>
</template>

<script>
import AddProduct from '@/components/product/AddProduct.vue'

export default {
  name: 'AddProductView',
  components: {
    AddProduct
  }
}
</script>
