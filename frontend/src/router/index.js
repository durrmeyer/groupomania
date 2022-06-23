import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../components/Connection/Login";
import Register from "../components/Connection/Register";

import Admin from "../views/admin/Admin";
import UsersIndex from "../views/admin/UserIndex";
import UserEdit from "../views/admin/UserEdit";


import Posts from "../views/Posts"
import PostIndex from "../components/post/PostIndex";
import PostEdit from "../components/post/PostEdit"
import PostAdd from "../components/post/PostAdd";

import Profil from "../components/ProfilUser";
//import { authGuard } from "@/_services/authAdmin";




const routes = [


  {
    path: "/",
    name: "Home",
    component: Home,

  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/profil",
    name: "profil",
    component: Profil,
    props: true,

  },

  {
    path: "/posts",
    name: "posts",
    component: Posts,

    props: true,

  },
  {
    path: "/posts/index",
    name: "PostIndex",
    component: PostIndex,
    props: true,
  },
  {
    path: "/posts/add",
    name: "PostAdd",
    component: PostAdd,
    props: true,
  },
  {
    path: "/edit/:id?",
    name: "postEdit",
    component: PostEdit,
    props: true,
  },
  {
    path: "/admin",
    name: "admin",
   // beforeEnter: authGuard,
    component: Admin,


    children: [
      {
        path: "users",
        name: "users",
        component: UsersIndex,
      },

      {
        path: "userEdit/:id",
        name: "UserEdit",
        component: UserEdit,
        props: true
      },
      
      
    ]
  },






  /*************posts route*****************/


];


const router = createRouter({
  history: createWebHistory(),
  routes,
})


export default router;