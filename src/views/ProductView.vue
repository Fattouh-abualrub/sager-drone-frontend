<template>
  <div class="product">
  <ProductTable />
  </div>
</template>

<script>
import ProductTable from '@/components/product/ProductTable.vue'

export default {
  name: 'ProductView',
  components: {
    ProductTable
  }
}
</script>
