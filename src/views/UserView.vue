<template>
  <div class="user">
  <UserTable />
  </div>
</template>

<script>
import UserTable from '@/components/user/UserTable.vue'

export default {
  name: 'UserView',
  components: {
    UserTable
  }
}
</script>
