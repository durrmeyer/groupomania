import { createWebHistory, createRouter } from "vue-router";


import Login from "../components/Login";
import Register from "../components/Register";

import Admin from "../views/dashboard/admin";
import Moderateur from "../views/dashboard/moderateur";

import Posts from "../views/Posts";
import PostAdd from "../components/Post/PostAdd";
import PostIndex from "../components/Post/PostIndex";


import User from "../views/Profil";


import UserIndex from "../components/User/UserIndex";
import UserEdit from "../components/User/UserEdit";
import UserAdd from "../components/User/UserAdd";



/*import PostEdit from "../components/post/PostEdit"*/





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


 
  children:[
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
],
},

 
  {
    path: "/profil/:id",
    name: "user",
    component: User,
    props: true,
  },

  {
    path: "/profil/userAdd",
    name: "UserAdd",
    component: UserAdd,

  },
  {
    path: "/profils/",
    name: "UserIndex",
    component: UserIndex,
    props: true,
  },

  {
    path: "/profil/userEdit/${user.id}",
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

  /*
  
  
  

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
 
 */

];
const router = createRouter({
  history: createWebHistory(),
  routes,
})


export default router;