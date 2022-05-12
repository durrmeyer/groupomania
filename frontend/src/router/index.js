import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Posts from '../views/Posts.vue'
import Login from '../components/Connection/Login'
import Register from '../components/Connection/Register'
import Admin from '../components/Dashboard/Admin'




const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  
  {
    path: '/Posts',
    name: 'Posts',
    component: Posts
  },
 /* {
   /* path: '/about',
    name: 'about',
    
    component: () => import(/* webpackChunkName: "about" '../views/AboutView.vue')
  }*/
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
