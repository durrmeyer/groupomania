<template>
  <div>
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <p class="h3 text-success fw-bold">Add contact</p>
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
          <form @submit.prevent="udapteUser" enctype="multipart/form-data">
            <label for="file" class="form-label">Image</label>
            <input
              id="image"
              class="form-control"
              type="file"
              ref="image"
              name="image"
              @change="selectImage()"
            />télécharger une photo de profil

            <div class="mb-2">
              <label for="user_firstName">Prénom</label>
              <input
                v-model="firstName"
                type="text"
                class="form-control"
                placeholder="Prénom"
              />
            </div>

            <div class="mb-2">
              <label for="user_lastName">Nom</label>
              <input
                v-model="lastName"
                type="text"
                class="form-control"
                placeholder="Nom"
              />
            </div>

            <div class="mb-2">
              <label for="user_email">Email</label>
              <input
                v-model="email"
                type="text"
                class="form-control"
                placeholder="Email"
              />
            </div>
            <div class="button">
              <button
                type="submit"
                class="button"
                @click.prevent="updateUser()"
              >
                Modifier
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import layoutUser from "../../assets/layouts/cardUser.vue";

import { mapState } from "vuex";

export default {
  name: "UserAdd",
  components: {
    layoutUser,
  },
  data() {
    return {
      userId: localStorage.getItem("UserId"),
      token: localStorage.getItem("token"),
      imageUrl: "",
      image: "",
      file: null,
    };
  },
  mounted() {
    this.$store.dispatch("getUserById");
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    ...mapState({
      firstName: (state) => state.user.firstName,
      lastName: (state) => state.user.lastName,
      email: (state) => state.user.email,
    }),
  },
  methods: {
    selectImage() {
      this.image = this.$refs.image.files[0];
      this.imageUrl = URL.createObjectURL(this.image);
    },
    updateUser() {
      const formData = new FormData();
      formData.append("image", this.image);
      formData.append("imageUrl", this.imageUrl);
      formData.append("firstName", this.firstName);
      formData.append("lastName", this.lastName);
      formData.append("email", this.email);
      formData.append("userId", this.userId);

      console.log(" image", formData.get("image"));
      console.log("test-récup", formData.get("imageUrl"));
      let id = this.$store.state.user.id;
      this.$store
        .dispatch("updateUser", { id: id, data: formData })

        .then((res) => {
          this.$router.push("/profil/");
        })
        .catch((err) => console.log(err, "erreur de connexion"));
    },
  },
};
</script>



<style>
#add-blog* {
  box-sizing: border-box;
}
#add-blog {
  margin: 20px auto;
  max-width: 500px;
}
label {
  display: block;
  margin: 20px 0 10px;
}
input[type="text"],
textarea {
  display: block;
  width: 100%;
  padding: 8px;
}
#preview {
  margin: 30px 0;
  padding: 10px 20px;
  border: 1px dotted #ccc;
}
h3 {
  margin-top: 10px;
}
p {
  display: flex;
}
button {
  margin-top: 20px;
}
</style>

