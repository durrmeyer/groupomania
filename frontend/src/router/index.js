import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin'
import Moderateur from '../views/Moderator'
import Post from '../views/Post'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/Moderateur',
    name: 'Moderator',
    component: Moderateur
  },
  {
    path: '/Post',
    name: 'Post',
    component: Post
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
