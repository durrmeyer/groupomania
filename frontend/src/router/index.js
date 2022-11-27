import { createWebHistory, createRouter } from "vue-router";


import Login from "../components/Login";
import Register from "../components/Register";

import Admin from "../views/Dashboard/admin";
import Moderateur from "../views/Dashboard/moderateur";

import Posts from "../views/Posts";
import PostAdd from "../components/Post/PostAdd";
import PostIndex from "../components/Post/PostIndex";

import CommentAdd from "../components/Comment/CommentAdd";

import User from "../components/User/ProfilUser";



import UserAdd from "../components/User/UserAdd";

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
    path: "/profil/:id",
    name: "UserAdd",
    component: UserAdd,

  },


   {
    path: "/posts/comments/:id",
    name: "CommentAdd",
    component: CommentAdd,

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