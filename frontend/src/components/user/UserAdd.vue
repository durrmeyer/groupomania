<template>
  <div>
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <p class="h3 text-success fw-bold">contact</p>
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
          <form @submit.prevent="updateUser" enctype="multipart/form-data">
            <label for="file" class="form-label">Image</label>
            <input
              id="image"
              accept="image/png, image/jpeg,
                    image/bmp, image/gif"
              class="form-control"
              type="file"
              ref="image"
              name="image"
              @change="selectImage()"
            />télécharger une photo de profil

            <div class="mb-2">
              <label for="user_firstName">Prénom</label>
              <input
                v-model="user.firstName"
                type="text"
                class="form-control"
                placeholder="Prénom"
              />
            </div>

            <div class="mb-2">
              <label for="user_lastName">Nom</label>
              <input
                v-model="user.lastName"
                type="text"
                class="form-control"
                placeholder="Nom"
              />
            </div>

            <div class="mb-2">
              <label for="user_email">Email</label>
              <input
                v-model="user.email"
                type="text"
                class="form-control"
                placeholder="Email"
              />
            </div>
            <div class="button">
              <button type="submit" class="button" @click.prevent="addUser()">
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
import { mapState } from "vuex";
export default {
  name: "UserAdd",
  components: {
  
  },
  data() {
    return {
      userId: localStorage.getItem("UserId"),
      token: localStorage.getItem("token"),
      imageUrl: "",
      firstName: "",
      lastName: "",
      email: "",      
    };
  },

  beforeMount() {
    this.$store.dispatch("getUserById",this.$route.params.id);
  },
  
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  methods: {
    selectImage() {
      this.image = this.$refs.image.files[0];
      this.imageUrl = URL.createObjectURL(this.image);
    },
    addUser() {
      let id = this.$store.state.user.id;
      
      const formData = new FormData();
      if (this.image) {
       formData.append("image", this.image);
      }
      if (this.user.firstName !== "") {
        formData.append("firstName", this.user.firstName);
      }
      if (this.user.lastName !== "") {
        formData.append("lastName", this.user.lastName);
      }
      if (this.user.email !== "") {
        formData.append("email", this.user.email);
      }
            this.$store.dispatch("updateUser", {
        id: id,
        data: formData,
      });

      this.$router.push("/profil");
    },
  },
};
</script>

<style>

</style>
