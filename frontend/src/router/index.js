import { createWebHistory, createRouter } from "vue-router";

import Login from "../components/Login";
import Register from "../components/Register";

import Admin from "../views/Dashboard/admin";
import Moderateur from "../views/Dashboard/moderateur";

import Posts from "../views/Posts";
import PostAdd from "../components/Post/PostAdd";
import PostIndex from "../components/Post/PostIndex";
import PostEdit from "../components/Post/PostEdit";

import CommentAdd from "../components/Comment/CommentAdd";

import User from "../components/User/ProfilUser";
import UserAdd from "../components/User/UserAdd";

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
    message:" vous avez depassé les 5 demandes. Veuillez attendre 3 min pour vous reconnecter"
  },

  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/posts",
    requiresAuth: true,
    name: "posts",
    component: Posts,
  },

  {
    path: "/posts/add",
    requiresAuth: true,
    name: "PostAdd",
    component: PostAdd,
  },
  {
    path: "/posts/index",
    requiresAuth: true,
    name: "PostIndex",
    component: PostIndex,
    props: true,
  },
  {
    path: "/posts/:id",
    requiresAuth: true,
    name: "PostEdit",
    component: PostEdit,
  },

  {
    path: "/profil/",
    requiresAuth: true,
    name: "user",
    component: User,
  },
  {
    path: "/profil/:id",
    requiresAuth: true,
    name: "UserAdd",
    component: UserAdd,
  },

  {
    path: "/comments/:id",
    requiresAuth: true,
    name: "CommentAdd",
    component: CommentAdd,
  },

  {
    path: "/dashboard/admin",
    requiresAuth: true,
    name: "admin",
    component: Admin,
  },

  {
    path: "/dashboard/moderateur",
    requiresAuth: true,
    name: "moderateur",
    component: Moderateur,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      // On utiliser les getters pour la vérification
      next();
      return;
    }
    next("/login"); // Dans le cas échéant l'user est redirigé vers la page de connexion
    alert("Vous n'avez pas accés");
  } else {
    next();
  }
});

export default router;
