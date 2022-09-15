<template>
  <div class="card" style="width: 30rem">
    <h3>Modification de l'utilisateur</h3>

    <form @submit.prevent="modifier()" enctype="multipart/form-data">
      <div class="card-body text-center" v-bind="user">
        <div v-if="imageUrl == null" class="dropdown text-center">
          <img
            src="../../assets/images/avatar.png"
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
      <div class="card-body d-flex flex-column justify-content-between">
        <label class="text-center label" for="file"
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
      </div>
      <div class="card-body">
        <div class="card-form_group">
          <label for="post_title" class="form-label form-control-sm"
            >Prénom</label
          >
          <input
            type="text"
            class="form-control form-control-sm"
            rows="5"
            cols="20"
            id="lastName"
            v-model="lastName"
            required
          />
        </div>
        <div class="card-form_group">
          <label for="post_title" class="form-label form-control-sm">Nom</label>
          <input
            type="text"
            class="form-control form-control-sm"
            rows="5"
            cols="20"
            id="firstName"
            v-model="firstName"
            required
          />
        </div>
        <div class="card-form_group">
          <label for="description" class="form-label form-control-sm"
            >Email
          </label>
          <input
            class="form-control form-control-sm"
            rows="5"
            cols="20"
            type="text"
            id="email"
            name="email"
            placeholder="test@test.com !"
            v-model="email"
            required
          />
        </div>
        <button type="submit" class="button" @click.prevent="modifier">
          Modifier
        </button>
      </div>
    </form>
  </div>
</template>
<script>

export default {
  name: "UserEdit",

 /* data() {
    return {
      user: {
        firstName: "",
        lastname: "",
        email: "",
      },
      token: sessionStorage.getItem("token"),
      userId: sessionStorage.getItem("userId"),
      imageUrl: "",
    };
  },*/
  mounted() {
    console.log(this.$route.params.id)
    //récupération à l'affichage de l'utilisateur
    /*userService
      .getUser(this.id)
      .then((res) => {
        console.log(res)
        this.user = res.data;
        this.user.id = this.id;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    file() {
      this.image = this.$refs.file.files[0];
      this.imageUrl = URL.createObjectURL(this.image);
    },

    modifier() {
      const formData = new FormData();
      formData.append("userId", parseInt(sessionStorage.getItem("userId")));
      formData.append("file", this.file);
      formData.append("imageUrl", this.imageUrl);
      formData.append("firstName", this.firstName);
      formData.append("lastName", this.lastName);
      formData.append("email", this.email);

      userService
        .updateUser(this.user)
        .then((res) => this.$router.push({ name: "Profil" }))
        .catch((err) => console.log(err));
    },*/

    //envoi à l'api pour modification
  },
};
</script>