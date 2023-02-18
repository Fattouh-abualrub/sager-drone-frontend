<template>
  <div class="container mt-4 mb-2 mx-auto">
    <div class="flex justify-between mb-2">
      <h1 class="text-lg font-bold mb-3">Products</h1>
      <router-link
        to="/add-product"
        class="bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 border-b-4 border-teal-700 hover:border-teal-900 rounded"
      >
        <i class="fa-solid fa-plus"></i> Add Product
      </router-link>
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
Vue.use(require("vue-moment"));

export default {
  name: "ProductTable",
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
          title: "name",
          align: "left",
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            let truncate_dots = "";
            if (row.name.length <= 15) {
              truncate_dots = row.name;
            } else {
              truncate_dots = row.name.substring(0, 40) + "...";
            }
            return <div>{truncate_dots}</div>;
          },
        },
        {
          field: "quantity",
          key: "b",
          title: "Quantity",
          align: "left",
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return <div>{row.quantity}</div>;
          },
        },
        {
          field: "price",
          key: "c",
          title: "Price",
          align: "left",
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return <div>{"$" + row.price}</div>;
          },
        },
        {
          field: "categories",
          key: "d",
          title: "Categories",
          align: "left",
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return <div>{row.categories_name.join(", ")}</div>;
          },
        },
        {
          field: "created_at",
          key: "e",
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
          field: "created_by",
          key: "f",
          title: "Created by",
          align: "left",
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return <div>{row.user.name}</div>;
          },
        },
        {
          field: "action",
          key: "g",
          title: "Action",
          align: "left",
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            let url = "/edit-product/" + row.id;
            return (
              <div class="flex">
                <router-link
                  to={url}
                  class="bg-blue-600 mr-2 hover:bg-blue-800 text-white font-bold py-1 px-3 border-b-4 border-blue-700 hover:border-blue-900 rounded"
                >
                  <i class="fa-solid fa-pen-to-square"></i>
                </router-link>
                <DeletePopup type="products" id={row.id} />
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
      let response = await this.$store.dispatch("get_products", dataToSend);
      if (response == true) {
        this.total = this.$store.state.products.total;
        this.tableRecord = this.$store.state.products.products;
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
