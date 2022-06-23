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
                <div v-bind="user"  class="row justify-content-around">
                  <div class="card-header-info">Vos informations</div>
                  <p class="text">
                    Prénom:
                    <span class="text_color"> {{ firstName }} </span>
                  </p>
                  <p class="text">
                    Nom:
                    <span class="text_color">{{userId.lastName}}</span>
                  </p>
                  <p class="text">
                    Email:
                    <span class="text_color">email</span>
                  </p>
                </div>
              </div>

              <div>
                <form
                  id="form"
                  enctype="multipart/form-data"
                  @submit.prevent="imageUpload()"
                >
                  <div class="card-body text-center" v-bind="user">
                    <div v-if="imageUrl == null" class="dropdown text-center">
                      <img
                        src="../assets/images/avatar.png"
                        alt="photo de profil"
                        class="avatar"
                      />
                    </div>
                    <div v-else class="dropdown text-center">
                      <img
                        :src="imageUrl"
                        alt="photo de profil"
                        class="avatar"
                        id="avatar"
                      />
                    </div>
                  </div>
                <div
                    class="card-body d-flex flex-column justify-content-between"
                  >
                    <label class="text-center label" for="image"
                      ><strong>Choisir ma photo de profil</strong></label
                    >
                    <input
                      type="file"
                      class="form-control"
                      name="image"
                      id="image"
                      accept="image/*"
                      ref="file"
                      @change="file()"
                    />
                    <div class="card-body mx-auto">
                      <button
                        type="submit"
                        class="form-control btn btn-primary"
                        name="pictueUpdate"
                        id=""
                        @click.prevent="update"
                      >
                        Confirmer
                      </button>
                    </div>
                  </div>
                </form>
                <div>
                  <button
                    class="form-control btn btn-danger"
                    v-bind="user"
                    @click.prevent="deleteMyAccount(user.id)"
                  >
                    Supprimer
                  </button>
                </div>
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
        id: localStorage.getItem("userId"),
        file: null,
        firstName: "",
        lastName: "",
        email: "",
      },
      imageUrl: "",
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
    };
  },
  mounted() {
    userService
      .getUserById()
      .then((res) => {
        this.users = res.data;
      })
      .catch((err) => console.log(err));
  },

 created() {
    userService.getUserId('userId')
    console.log("a is: " + this.userId);
    userService.getUserById(+this.userId).then((res) => {
      
      this.image = res.data.image;
    });
  },
  
   methods: {
    file() {
      this.image = this.$refs.file.files[0];
      this.imageUrl = URL.createObjectURL(this.image);
    },
    imageUpload() {
      const formData = new FormData();
      formData.append("userId", parseInt(localStorage.getItem("userId")));
      formData.append("image", this.image);
        formData.append("firstName", this.firstName);
         formData.append("lastName", this.lastName);
          formData.append("image", this.image);
      console.log(this.image);
      console.log(this.imageUrl);
      console.log("test-récup", formData.get("image"));
      userService.updateUser(formData)
        .then((response) => {
          this.user.id = response.data.user;
          this.image = response.data.image;
        });
    },
    async deleteMyAccount(id) {
      let confirmDeleteUser = confirm(
        " la suppresion du compte est irréversible, voulez-vous vraiment supprimer le compte ?"
      );
      if (confirmDeleteUser == true) {
        await axios
          .delete(`http://localhost:3000/api/users/${id}`, {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          })
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