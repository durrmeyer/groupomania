<template>
<div class="card">

    <div class="card-body">
        <h5 class="card-title">Réseau social de l'entreprise</h5>

        <div class="card-description">
<h3 v-if="user"> bonjour, {{user.firstName}} {{user.lastame}}</h3>
            <hr />
            <p class="card-text"> Bienvenue sur le nouveau réseau social de Groupomania.<br />
                Vous pouvez échanger entre collègues et suivre toutes les actualités
                de notre entreprise.
                <br /> Et tout cela dans le respect et la bienveillance!<br /></p>
            <a href="/posts" class="btn btn-primary">Continer</a>
        </div>

    </div>
</div>
</template>
<script>
import userService from '../_services/userService'

export default {
    name: "Home",
    props: ["id"],
    data() {
        return {
            user:null
        }
    },
    created() {
        res = userService.getUserId('user')
    },
}
</script>