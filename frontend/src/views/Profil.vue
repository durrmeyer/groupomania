<template>
  <div>
    <h1 class="card-titlepost">Réseau social Groupomania</h1>
    <UserProfil />
  </div>
</template>

<script>
import UserProfil from "../components/user/ProfilUser";
export default {
  name: "User",
  components: {
    UserProfil,
  },
  
};
</script>