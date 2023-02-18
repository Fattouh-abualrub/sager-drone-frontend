<template>
  <div class="container mt-4 mb-2 mx-auto">
    <h1 class="text-lg font-bold mb-3">Users</h1>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <ve-table
        id="UserTable"
        :columns="columns"
        :table-data="tableRecord"
        :border-around="true"
        :border-x="true"
        :border-y="false"
        :fixed-header="true"
        :max-height="400"
      />

      <ve-pagination
        :total="total"
        :page-index="pageIndex"
        :page-size="pageSize"
        @on-page-number-change="pageNumberChange"
        @on-page-size-change="pageSizeChange"
        :layout="layout_table"
        :page-size-option="[10, 25, 50, 100]"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueMoment from "vue-moment";
import moment from "moment-timezone";
import DeletePopup from "../popups/DeletePopup.vue";
Vue.use(require("vue-moment"));

export default {
  name: "UserTable",
  data() {
    return {
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      layout_table: ["total", "sizer", "prev", "pager", "next"],
      tableRecord: [],
      columns: [
        {
          field: "name",
          key: "a",
          title: "Name",
          align: "left",
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return <div>{row.name}</div>;
          },
        },
        {
          field: "email",
          key: "b",
          title: "Email",
          align: "left",
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return <div>{row.email}</div>;
          },
        },
        {
          field: "created_at",
          key: "c",
          title: "Created at",
          align: "left",
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return (
              <div>
                {moment.tz(row.created_at, "Asia/Amman").format("YYYY-MM-DD h:mm:ss A")}
              </div>
            );
          },
        },
        {
          field: "action",
          key: "d",
          title: "Action",
          align: "left",
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            let url = "/edit-user/" + row.id;
            return (
              <div class="flex">
                <router-link
                  to={url}
                  class="bg-blue-600 mr-2 hover:bg-blue-800 text-white font-bold py-1 px-3 border-b-4 border-blue-700 hover:border-blue-900 rounded"
                >
                  <i class="fa-solid fa-pen-to-square"></i>
                </router-link>
                <DeletePopup type="users" id={row.id} />
              </div>
            );
          },
        },
      ],
    };
  },
  components: {
    DeletePopup,
  },
  created() {
    this.get_list();
  },
  methods: {
    // page number change
    pageNumberChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.get_list();
    },
    // page size change
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.get_list();
    },
    async get_list() {
      this.errors = {};
      var dataToSend = {
        limit: this.pageSize,
        page: this.pageIndex,
      };
      let response = await this.$store.dispatch("get_users", dataToSend);
      if (response == true) {
        this.total = this.$store.state.users.total;
        this.tableRecord = this.$store.state.users.users;
      } else {
        if (response.message != undefined) {
          this.$toast.error(response.message);
        }
      }
    },
  },
};
</script>

<style type="text/css">
.ve-pagination {
  margin-top: 7px !important;
}
</style>
