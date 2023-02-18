import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)


const ENDPOINT = "https://sager-drone-api.fattouh.me/api/v1/";
// const ENDPOINT = "http://127.0.0.1:8000/api/v1/";
const TOKEN = (localStorage.getItem('token')) ? localStorage.getItem('token') : '';

const headers = {
  'Authorization': `Bearer ${TOKEN}`
}

const headers_file = {
  'Authorization': `Bearer ${TOKEN}`,
  'content-type': 'multipart/form-data'
}

export default new Vuex.Store({
  state: {
    token: TOKEN,
    loader: false,
    userinfo: {},
    users: {},
    products: {}
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    setLoader(state, loader) {
      state.loader = loader;
    },
    setUserInfo(state, user) {
      state.userinfo = user;
      localStorage.setItem('userInfo', JSON.stringify(user));
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    setUsers(state, users) {
      state.users = users;
    },
    setProducts(state, products) {
      state.products = products;
    }
  },
  actions: {
    async login(context, credentials) {
      context.commit('setLoader', true);
      return axios.post(ENDPOINT + "login", {
        email: credentials.email,
        password: credentials.password
      })
        .then(res => {
          context.commit('setToken', res.data.token);
          context.commit('setUserInfo', res.data.user);
          context.commit('setLoader', false);
          return true;
        })
        .catch(error => {
          context.commit('setLoader', false);
          return error.response.data.errors;
        });
    },
    async register(context, credentials) {
      context.commit('setLoader', true);
      return axios.post(ENDPOINT + "register", {
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        password_confirmation: credentials.password_confirmation
      })
        .then(res => {
          context.commit('setToken', res.data.token);
          context.commit('setUserInfo', res.data.user);
          context.commit('setLoader', false);
          return true;
        })
        .catch(error => {
          context.commit('setLoader', false);
          return error.response.data.errors;
        });
    },
    async get_categories(context, payload) {
      context.commit('setLoader', true);
      return axios.get(ENDPOINT + "categories", {
        params: payload,
        headers: headers
      })
        .then(res => {
          context.commit('setCategories', res.data);
          context.commit('setLoader', false);
          return true;
        })
        .catch(error => {
          context.commit('setLoader', false);
          return error.response.data;
        });
    },
    async get_users(context, payload) {
      context.commit('setLoader', true);
      return axios.get(ENDPOINT + "users", {
        params: payload,
        headers: headers
      })
        .then(res => {
          context.commit('setUsers', res.data);
          context.commit('setLoader', false);
          return true;
        })
        .catch(error => {
          context.commit('setLoader', false);
          return error.response.data;
        });
    },
    async get_products(context, payload) {
      context.commit('setLoader', true);
      return axios.get(ENDPOINT + "products", {
        params: payload,
        headers: headers
      })
        .then(res => {
          context.commit('setProducts', res.data);
          context.commit('setLoader', false);
          return true;
        })
        .catch(error => {
          context.commit('setLoader', false);
          return error.response.data.errors;
        });
    },
    async logout(context) {
      context.commit('setLoader', true);
      return axios.post(ENDPOINT + "logout", {}, {
        headers: headers
      })
        .then(res => {

          localStorage.removeItem('token');
          localStorage.removeItem('userInfo');
          context.commit('setLoader', false);

          return res.data;
        })
        .catch(error => {
          localStorage.removeItem('token');
          localStorage.removeItem('userInfo');
          context.commit('setLoader', false);
          return error.response.data.errors;
        });
    },
    async delete_item(context, payload) {
      context.commit('setLoader', true);
      return axios.delete(ENDPOINT + payload.type + "/delete/" + payload.id, {
        headers: headers
      })
        .then(res => {
          context.commit('setLoader', false);
          return res.data;
        })
        .catch(error => {
          context.commit('setLoader', false);
          return error.response.data;
        });
    },
    async add_category(context, payload) {
      context.commit('setLoader', true);
      return axios.post(ENDPOINT + "categories/create", {
        "name": payload.name
      }, {
        headers: headers
      })
        .then(res => {
          context.commit('setLoader', false);
          return res.data;
        })
        .catch(error => {
          context.commit('setLoader', false);
          return error.response.data;
        });
    },
    async edit_category(context, payload) {
      context.commit('setLoader', true);
      return axios.put(ENDPOINT + "categories/update/" + payload.id, {
        "name": payload.name
      }, {
        headers: headers
      })
        .then(res => {
          context.commit('setLoader', false);
          return res.data;
        })
        .catch(error => {
          context.commit('setLoader', false);
          return error.response.data;
        });
    },
    async show_user(context, payload) {
      context.commit('setLoader', true);
      return axios.get(ENDPOINT + "users/show/" + payload.id, {
        headers: headers
      })
        .then(res => {
          context.commit('setLoader', false);
          return res.data;
        })
        .catch(error => {
          context.commit('setLoader', false);
          return error.response.data;
        });
    },
    async edit_user(context, payload) {
      context.commit('setLoader', true);
      return axios.put(ENDPOINT + "users/update/" + payload.id, {
        "name": payload.name,
        "email": payload.email,
        "password": payload.password
      }, {
        headers: headers
      })
        .then(res => {
          context.commit('setLoader', false);
          return res.data;
        })
        .catch(error => {
          context.commit('setLoader', false);
          return error.response.data;
        });
    },
    async show_product(context, payload) {
      context.commit('setLoader', true);
      return axios.get(ENDPOINT + "products/show/" + payload.id, {
        headers: headers
      })
        .then(res => {
          context.commit('setLoader', false);
          return res.data;
        })
        .catch(error => {
          context.commit('setLoader', false);
          return error.response.data;
        });
    },
    async add_product(context, payload) {
      context.commit('setLoader', true);
      return axios.post(ENDPOINT + "products/create/", {
        "name": payload.name,
        "quantity": payload.quantity,
        "price": payload.price,
        "description": payload.description,
        "categories": payload.categories,
        "image": payload.image
      }, {
        headers: headers_file
      })
        .then(res => {
          context.commit('setLoader', false);
          return res.data;
        })
        .catch(error => {
          context.commit('setLoader', false);
          return error.response.data;
        });
    },
    async edit_product(context, payload) {
      context.commit('setLoader', true);
      return axios.post(ENDPOINT + "products/update/" + payload.id, {
        "name": payload.name,
        "quantity": payload.quantity,
        "price": payload.price,
        "description": payload.description,
        "categories": payload.categories,
        "image": payload.image
      }, {
        headers: headers_file
      })
        .then(res => {
          context.commit('setLoader', false);
          return res.data;
        })
        .catch(error => {
          context.commit('setLoader', false);
          return error.response.data;
        });
    },
    async forget_password(context, payload) {
      context.commit('setLoader', true);
      return axios.post(ENDPOINT + "forget-password", {
        "email": payload.email
      }, {
        headers: headers
      })
        .then(res => {
          context.commit('setLoader', false);
          return res.data;
        })
        .catch(error => {
          context.commit('setLoader', false);
          return error.response.data;
        });
    },
    async get_totals(context) {
      context.commit('setLoader', true);
      return axios.get(ENDPOINT + "dashboard", {
        headers: headers
      })
        .then(res => {
          context.commit('setLoader', false);
          return res.data;
        })
        .catch(error => {
          context.commit('setLoader', false);
          return error.response.data;
        });
    },
  }
})
