import { createWebHistory, createRouter } from "vue-router";



import Login from "../components/Connection/Login";
import Register from "../components/Connection/Register";




import UsersIndex from "../components/user/UserIndex";
import UserEdit from "../components/user/UserEdit";


import Posts from "../views/Posts"
import PostIndex from "../components/post/PostIndex";
import PostEdit from "../components/post/PostEdit"
import PostAdd from "../components/post/PostAdd";

import Profil from "../components/ProfilUser";
import Dashboard from "../views/admin/Dashboard";




const routes = [


  {
    path: "/",
    name: "login",
    component: Login,

  },

  {
    path: "/register",
    name: "register",
    component: Register,
  },

  {
    path: "/posts",
    name: "posts",
    component: Posts,


  },
  {
    path: "/posts/add",
    name: "PostAdd",
    component: PostAdd,

  },
  {
    path: "/profil",
    name: "profil",
    component: Profil,
    props: true,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
 

  },

  {
    path: "/posts/index",
    name: "PostIndex",
    component: PostIndex,
    props: true,
  },

  {
    path: "/edit/:id?",
    name: "postEdit",
    component: PostEdit,
    props: true,
  },
 
  {
    path: "/users",
    name: "users",
    component: UsersIndex,
    props: true,
  },

  {
    path: "/userEdit/:id",
    name: "UserEdit",
    component: UserEdit,
    props: true
  },

];







/*************posts route*****************/





const router = createRouter({
  history: createWebHistory(),
  routes,
})


export default router;