<template>
  <div class="category">
  <CategoryTable />
  </div>
</template>

<script>
import CategoryTable from '@/components/category/CategoryTable'

export default {
  name: 'CategoryView',
  components: {
    CategoryTable
  }
}
</script>
