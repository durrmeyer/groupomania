<template>
  <div class="card" style="width: 30rem">
    <h3>Modification de l'utilisateur</h3>
{{ id }}
    
    <form @submit.prevent="modifier()" enctype="multipart/form-data">
      <div class="container col-md-12">
        <div class="mb-5">
          <label for="file" class="form-label">Image</label>
          <input
            class="form-control"
            type="file"
            accept="image/*"
            ref="file"
            name="image"
            @change="imageUpload()"
          />
        </div>
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
            v-model="user.lastName"
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
            v-model="user.firstName"
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
            placeholder="Votre post ici !"
            v-model="user.email"
            required
          />
        </div>
        <button type="submit" class="button">Modifier</button>
      </div>
    </form>
  </div>
</template>
<script>
import userService from "../../_services/userService";
export default {
  name: "UserEdit",
  props: ["id"],
  data() {
    return {
      user: {
        userId: "",
        firstName: "",
        lastName: "",
        email: "",
        imageUrl: "",
      },
    };
  },
  mounted() {
    //récupération à l'affichage de l'utilisateur
    userService
      .getUserById(this.id)
      .then((res) => {
        console.log(res, "1 ere étape");
        this.user = res.data;
        this.user.id = this.id;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    imageUpload() {
      this.image = this.$refs.file.files[0];
      this.imageUrl = URL.createObjectURL(this.image);
      console.log(this.image);
    },
    addPost() {
      const formData = new FormData();
      if (this.firstName !== "") {
        formData.append("firstname", this.firstName);
      }
      if (this.lastName !== "") {
        formData.append("lastName", this.lastName);
      }
      if (this.email !== "") {
        formData.append("description", this.email);
      }
      if (this.file !== null) {
        formData.append("image", this.file);
      }
    },
    //envoi à l'api pour modification
    modifier() {
      userService
        .updateUser(this.user)
        .then(() => {
          this.$router.push("/profil");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>