<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-9">
        <div class="col-12 col-compte">
          <h1 class="col-title">votre compte</h1>
        </div>
        <section class="row">
          <div class="col-12">
            <div class="card bg-light my-3 class=center-block">
              <div class="card-header">
                <div v-bind="user" class="row justify-content-around">
                  <div class="card-header-info">Vos informations</div>
                  <p class="text">
                    Prénom:
                    <span class="text_color"> {{ user.firstName }} </span>
                  </p>
                  <p class="text">
                    Nom:
                    <span class="text_color">{{ lastName }}</span>
                  </p>
                  <p class="text">
                    Email:
                    <span class="text_color">email</span>
                  </p>
                </div>
              </div>
              <div class="img-container">
                <img
                  v-bind:src="imageUrl"
                  alt="image du post"
                  class="img"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import userService from "../_services/userService";
export default {
  name: "userEdit",

  data(user) {
    return {
     user: {
        userId: "",
        firstName: "",
        lastName: "",
        email: "",
        file: "",
      },
      imageUrl: "",
    };
  },
  mounted() {
    //récupération à l'affichage de l'utilisateur
    userService
      .getUserById(this.user.id)
      .then((res) => {
        console.log(res, "1ere étape");
        this.user = res.data.user;
     
      })
      .catch((err) => console.log(err));
  },

  methods: {
    file() {
      this.image = this.$refs.file.files[0];
      this.imageUrl = URL.createObjectURL(this.image);
    },
    /*imageUpload() {
      const formData = new FormData();
      formData.append("userId", parseInt(localStorage.getItem("userId")));
      formData.append("file", this.file);
      formData.append("imageUrl", this.imageUrl);
      console.log(this.file);
      console.log(this.imageUrl);
      console.log("test-récup", formData.get("imageUrl"));
      userService.updateUser(formData).then((response) => {
        this.user.id = response.data.user;
        this.image = response.data.image;
      });
    },*/
    del(id) {
      let confirmDeleteUser = confirm(
        " Voulez-vous vraiment supprimer le compte ?"
      );

      if (confirmDeleteUser == true) {
        userService
          .deleteUser(this.user.id)

          .then(() => {
            localStorage.clear();
            this.$router.push("/");
          });
      } else {
        return;
      }
    },
  },
};
</script>