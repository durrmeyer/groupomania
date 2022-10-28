import { createWebHistory, createRouter } from "vue-router";


import Login from "../components/Login";
import Register from "../components/Register";

import Admin from "../views/Dashboard/admin";
import Moderateur from "../views/Dashboard/moderateur";

import Posts from "../views/Posts";
import PostAdd from "../components/Post/PostAdd";
import PostIndex from "../components/Post/PostIndex";


import User from "../components/User/ProfilUser";


import UserIndex from "../components/User/UserIndex";
import UserEdit from "../components/User/UserEdit";
import UserAdd from "../components/User/UserAdd";

const routes = [
  {
    path: '/',
    name: 'login',
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
    path: "/posts/index",
    name: "PostIndex",
    component: PostIndex,
    props: true,
  },
  {
    path: "/profil/",
    name: "user",
    component: User,
  },
  {
    path: "/profil/add",
    name: "UserAdd",
    component: UserAdd,

  },

  {
    path: "/profil/:id",
    name: "UserIndex",
    component: UserIndex,
    
  },

  {
    path: "/profil/edit/${id}",
    name: "UserEdit",
    component: UserEdit,
    props: true
  },


  {
    path: "/dashboard/admin",
    name: "admin",
    component: Admin,

  },

  {
    path: "/dashboard/moderateur",
    name: "moderateur",
    component: Moderateur,
  },


];
const router = createRouter({
  history: createWebHistory(),
  routes,
});





export default router;