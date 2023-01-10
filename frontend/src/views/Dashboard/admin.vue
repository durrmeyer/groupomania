<template>
  <div>
    <h1 class="card-titlepost">Réseau social Groupomania</h1>
    <ListUsers />
  </div>
</template>

<script>
import ListUsers from "../../components/user/UserIndex";
export default {
  name: "Users",
  components: {
    ListUsers,
  },
  
};
</script>