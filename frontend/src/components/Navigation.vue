<template>
   <nav class="navbar navbar-expand navbar-dark bg-dark">

    <div class="navbar-nav mr-auto">
        <li class="nav-item">
            <router-link to="/" class="nav-link">
                Accueil
            </router-link>
        </li>

        <li class="nav-item">
            <router-link to="/admin" class="nav-link">Admin</router-link>
        </li>
        <li  class="nav-item">
            <router-link to="/moderator" class="nav-link">Moderateur </router-link>
        </li>
        <li class="nav-item">
            <router-link  to="/post" class="nav-link">Post</router-link>
        </li>
    </div>
    
   
</nav>
</template>