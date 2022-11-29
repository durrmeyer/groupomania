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
      firstName: "",
      lastName: "",
      email: "",
    };
  },
 
mounted() {
   this.$store.dispatch("getUserById"); 
},
   

  methods: {
    selectImage() {
      this.image = this.$refs.image.files[0];
      this.imageUrl = URL.createObjectURL(this.image);
    },
    addUser() {
      let id = this.$store.state.user.id;
      const formData = new FormData();

      if (this.imageUrl !== "") {
        formData.append("imageUrl", this.imageUrl);
      }
      if (this.firstName !== "") {
        formData.append("firstName", this.firstName);
      }
      if (this.lastName !== "") {
        formData.append("lastName", this.lastName);
      }
      if (this.email !== "") {
        formData.append("email", this.email);
      }
      formData.append("UserId", this.UserId);

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
