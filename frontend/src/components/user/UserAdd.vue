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
          <form @submit.prevent="updateUser" enctype="multipart/form-data">
            <label for="file" class="form-label">Image</label>
            <input
              for="image"
              accepts="image/*"
              class="form-control"
              type="file"
              ref="file"
              name="image"
              @change="selectImage()"
            />télécharger une photo de profil

            <div class="mb-2">
              <label for="user_firstName">Prénom</label>
              <input
                :value="user.firstName"
                type="text"
                class="form-control"
                placeholder="Prénom"
              />
            </div>

            <div class="mb-2">
              <label for="user_lastName">Nom</label>
              <input
               :value="user.lastName"
                type="text"
                class="form-control"
                placeholder="Nom"
              />
            </div>

            <div class="mb-2">
              <label for="user_email">Email</label>
              <input
               :value="user.email"
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
      file: null,
      image: "",
      firstName:"",
    };
  },
  computed: {
    ...mapState({
     user: (state) => state.user,
     
    }),
  },

  methods: {
    selectImage() {
      const file = this.$refs.file.files[0];
      this.image = file;
      console.log(this.image, "unthseruoth,o");
    },
    addUser() {
      const formData = new FormData();
   
      formData.append("image", this.image);
       if(this.firstName !==""){
      formData.append("firstName", this.firstName)};
      if(this.lastName !==""){
      formData.append("lastName", this.lastName)};
      
      formData.append("email", this.email);
      formData.append("userId", this.userId);

      let id = this.$store.state.user.id;
      this.$store
      
        .dispatch("updateUser", { id: id, data: formData })
        .then(() => {
          this.$router.push("/profil");
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