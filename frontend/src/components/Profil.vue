<template>
  <div class="container">
    <h3>Profile</h3>

    
    <p>
      <strong>Prénom:</strong>
      {{ currentUser.firstName }}
    </p>
    <p>
      <strong>Nom:</strong>
      {{ currentUser.lasstName }}
    </p>

    <p>
      <strong>Email:</strong>
      {{ currentUser.email }}
    </p>
    <strong>Rôles:</strong>
    <ul>
      <li v-for="role in currentUser.roles" :key="role">{{ role }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Profile",
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>