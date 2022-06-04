<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Liste des personnes</h3>
    </header>

    <table class="table table-bordered">
      <thead>
        <tr>
          <th>id</th>
          <th>Prénom</th>
          <th>Nom</th>
          <th>Email</th>
          <th>Modifier</th>
          <th>Supprimer</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.createdId }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
/*import UserService from "../../_services/userService";
export default {
  name: "UserIndex",
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    UserService.getUsers()
    .then(res => {console.log(res.data.data)
    this.users = res.data.data})
    .catch((err) => console.log(err));
  },
};*/
</script>