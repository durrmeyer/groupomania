<template>
  <div>
    <router-link to="/posts/index">page de la liste des posts</router-link>||
    <router-link to="/posts"> page des posts</router-link>
    <div class="title">
      <h2>
        liste des utilisateurs il y en a
        <!-- {{ comptage }}-->
      </h2>
    </div>
    <main>

      
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Prénom</th>
            <th scope="col">Nom</th>
            <th scope="col">email</th>
            <th scope="col">Création</th>
            <th scope="col">actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id">
           
            <td>{{ user.id }}</td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.createdAt }}</td>
            <div class="add-to-action">
              <button @click="edit(user.id)">Modifier</button>
              <button @click="del(index)">supprimer</button>
            </div>
          </tr>
        </tbody>
      </table>
    </main>
  </div>
</template>
<script>
import accountService from "../../_services/accountService";
export default {
  name: "UsersIndex",
  data() {
    return {
      users: [],
    };
  },
  mounted() {
   accountService
      .getAllUsers()
      .then((res) => {
        this.users = res.data
        console.log(res, "trdvyufbtf", "userlist");
      })
      .catch((err) => console.log(err, "kekdjgi"));
  },
  method: {
    edit(id) {
      this.$router.push({ name: "UserEdit", params: { id: id } });
    },
    del(index) {
      console.log(index);
      userService
        .deleteUser(this.users[index].id)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      this.users.splice(index, 1);
    },

    computed: {
      comptage() {
        return this.users.length;
      },
      dateFormat() {
        return this.users.map((u) =>
          u.createdAt.split("T")[0].split("-").reverse().join("/")
        );
      },
    },
  },
};
</script>