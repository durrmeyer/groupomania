<template>
  <div class="container">
     Dashboard Admin
        <router-view/>
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
           <td> supprimer</td>
            <td> Modifier</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
    name: 'Dashboard',
    
}
</script>

