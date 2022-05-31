import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../components/Connection/Login";
import Register from "../components/Connection/Register";

// lazy-loaded
const Profile = () => import("../components/Profil")

const BoardAdmin = () => import("../components/Dashboard/Admin")
const BoardModerator = () => import("../components/Dashboard/Moderator")
const BoardUser = () => import("../components/Dashboard/User")
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
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/admin",
    name: "admin",
    // lazy-loaded
    component: BoardAdmin,
  },
  {
    path: "/mod",
    name: "moderator",
    // lazy-loaded
    component: BoardModerator,
  },
  {
    path: "/user",
    name: "user",
    // lazy-loaded
    component: BoardUser,
  },
  /*************posts route*****************/
  {
    path: "/Posts",
    name: "posts",
    component: () => import("../components/posts/List.vue")
  },
  {
    path: "/Post",
    name: "postId",
    component: () => import("../components/posts/Post")
  },
  {
    path: "/Ajouter",
    name: "add",
    component: () => import("../components/posts/Add.vue")
  }
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;