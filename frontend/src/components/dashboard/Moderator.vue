<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
  </div>
</template>
<script>
import ModeratorService from "../../_services/authService";
export default {
  name: "Moderator",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    ModeratorService.getModeratorBoard().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>