import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../components/Connection/Login";
import Register from "../components/Connection/Register";


//import PostId from "../components/Dashboard/Posts/"
////import Add from "../components/Dashboard/Posts/postAdd";
//import List from "../components/Dashboard/users/List";

// lazy-loaded
const Profile = () => import("../components/Profil");


import * as Admin from "@/views/admin"
import { authGuard } from "@/_helpers/auth-guard";


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
    path: "/profile",
    name: "profile",
    component: Profile,
  },

  {
    path: "/admin",
    name: "admin",

    component: Admin.AdminLayout,
    children: [
      { path: "dashboard", name: "dashboard", component: Admin.Dashboard, meta: { requiresAuth: true } },
      //{ path: "users", component: Admin.Users },
      { path: "users/add", component: Admin.UserAdd },
      { path: "users/edit/:id", component: Admin.UserEdit, props: true, },
    ]
  },

  /*************posts route*****************/


];


const router = createRouter({
  history: createWebHistory(),
  routes,
})

/*router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.matched[0].name == "admin") {
    authGuard()
  }
 next()
})*/
export default router;