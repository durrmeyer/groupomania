<template>
  <div>
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <p class="h3 text-success fw-bold">Editer son profil</p>
          <p class="fst_italic">
            Vita est illis semper in fuga uxoresque mercenariae conductae ad
            tempus ex pacto atque, ut sit species matrimonii, dotis nomine
            futura coniunx hastam et tabernaculum offert marito, post statum
            diem si id elegerit discessura, et incredibile est quo ardore apud
            eos in venerem uterque solvitur sexus.
          </p>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <form
            id="form"
            enctype="multipart/form-data"
            @submit.prevent="updatePicture()"
          >
            <div class="card-body text-center" v-bind="user">
              <div v-if="image === null" class="dropdown text-center">
                <img
                  src="../../assets/images/avatar.png"
                  alt="photo de profil"
                  class="rouned-circle mr-1 avatar"
                />
              </div>
              <div v-else class="dropdown text-center">
                <img
                  :src="image"
                  alt="photo de profil"
                  class="rouned-circle mr-1 avatar"
                  id="avatar"
                />
              </div>
            </div>
            <div class="card-body d-flex flex-column justify-content-between">
              <label class="text-center label" for="image"
                ><strong>Choisir ma photo de profil</strong></label
              >
              <input
                type="file"
                class="form-control"
                name="image"
                id="image"
                accept="image/*"
                ref="image"
                @change="select()"
              />
              <div class="card-body mx-auto">
                <button
                  type="submit"
                  class="form-control btn btn-primary"
                  name="pictueUpdate"
                  id="imageUpdate"
                  @click.prevent="addUser"
                >
                  Confirmer
                </button>
              </div>
            </div>
          </form>

          <div class="mb-2">
            <input
              v-model="firstName"
              type="text"
              class="form-control"
              placeholder="Prénom"
            />Prénom
          </div>

          <div class="mb-2">
            <input
              v-model="lastName"
              type="text"
              class="form-control"
              placeholder="Nom"
            />Nom
          </div>

          <div class="mb-2">
            <input
              v-model="email"
              type="text"
              class="form-control"
              placeholder="Email"
            />email
          </div>

          <div class="mb-2">
            <input type="submit" class="btn btn-success" value="Créer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import userService from "../../_services/userService";
import User from "../../assets/layouts/cardUser.vue";
export default {
  name: "UserEdit",
  components: {
    User,
  },
  data() {
    return {
      userId: sessionStorage.getItem("UserId"),
      firstName: "",
      lastName: "",
      email: "",
      image: "",
      file: "",
    };
  },

  methods: {
    select() {
      this.image = this.$refs.image.files[0];
      this.image = URL.createObjectURL(this.image);
    },
    addUser() {
      const formData = new FormData();
      formData.append("image", this.image);
      formData.append("image", this.image);
      formData.append("firstName", this.firstName);
      formData.append("lastName", this.lastName);
      formData.append("email", this.email);
      formData.append("userId", this.userId);

      userService
        .updateUser( formData)

        .then(() => {
          this.user = response.data.user;
          this.image = response.data.image;
          this.$router.push("/profil/userIndex");
        })
        .catch((err) => console.log(err, "erreur de connexion"));
    },
  },
};
</script>

