import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import CategoryView from '../views/CategoryView.vue'
import ProductView from '../views/ProductView.vue'
import UserView from '../views/UserView.vue'
import EditUserView from '../views/EditUserView.vue'
import EditProductView from '../views/EditProductView.vue'
import ForgetPasswordView from '../views/ForgetPasswordView.vue'
import AddProductView from '../views/AddProductView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresAuth: false },
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { requiresAuth: false },
  },
  {
    path: '/forget-password',
    name: 'forget-password',
    component: ForgetPasswordView,
    meta: { requiresAuth: false },
  },  
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: '/users',
    name: 'users',
    component: UserView,
    meta: { requiresAuth: true },
  },
  {
    path: '/products',
    name: 'products',
    component: ProductView,
    meta: { requiresAuth: true },
  },
  {
    path: '/categories',
    name: 'categories',
    component: CategoryView,
    meta: { requiresAuth: true },
  },
  {
    path: '/edit-user/:user_id',
    name: 'edit-user',
    component: EditUserView,
    meta: { requiresAuth: true },
  },
  {
    path: '/add-product',
    name: 'add-product',
    component: AddProductView,
    meta: { requiresAuth: true },
  },
  {
    path: '/edit-product/:product_id',
    name: 'edit-product',
    component: EditProductView,
    meta: { requiresAuth: true },
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
