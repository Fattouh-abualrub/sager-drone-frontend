<template>
  <div class="container mt-4 mb-2 mx-auto">
    <div class="flex justify-between mb-2">
      <h1 class="text-lg font-bold mb-3">Categories</h1>
      <AddCategory />
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <ve-table
        id="CategoryTable"
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
        :page-size-option="[10, 50, 100, 500]"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueMoment from "vue-moment";
import moment from "moment-timezone";
import DeletePopup from "../popups/DeletePopup.vue";
import AddCategory from "./AddCategory.vue";
import EditCategory from "./EditCategory.vue";
Vue.use(require("vue-moment"));

export default {
  name: "CategoryTable",
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
          title: "Category name",
          align: "left",
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return <div>{row.name}</div>;
          },
        },
        {
          field: "number_of_assigned",
          key: "b",
          title: "# of assigned",
          align: "left",
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return <div>{row.products.length}</div>;
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
            return <div class="flex">
              <EditCategory name={row.name} id={row.id} />
              <DeletePopup type="categories" id={row.id} />
            </div>;
          },
        },
      ],
    };
  },
  components: {
    DeletePopup,
    AddCategory,
    EditCategory
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
      let response = await this.$store.dispatch("get_categories", dataToSend);
      if (response == true) {
        this.total = this.$store.state.categories.total;
        this.tableRecord = this.$store.state.categories.categories;
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
