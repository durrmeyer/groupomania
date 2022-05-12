<template>
   <nav class="navbar navbar-expand navbar-dark bg-dark">

    <div class="navbar-nav mr-auto">
        <li class="nav-item">
            <router-link to="/" class="nav-link">
                Accueil
            </router-link>
        </li>
        <li class="nav-item">
            <router-link to="/Login" class="nav-link">
               Login
            </router-link>
        </li>
        <li class="nav-item">
            <router-link  to="/Posts" class="nav-link">Posts</router-link>
        </li>
<li class="nav-item">
            <router-link to="/Register" class="nav-link">
          Inscription
            </router-link>
        </li>

        <li class="nav-item">
            <router-link to="/admin" class="nav-link">Admin</router-link>
        </li>
        <li  class="nav-item">
            <router-link to="/moderator" class="nav-link">Moderateur </router-link>
        </li>
        
    </div>
    
   
</nav>
</template>