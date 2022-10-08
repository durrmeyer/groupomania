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
          <form @submit.prevent="addUser()" enctype="multipart/form-data">
            <label for="file" class="form-label">
             
            </label>
            <input
              id="image"
              class="form-control"
              type="file"
              ref="image"
              name="image"
              @change="select()"
            />télécharger une photo de profil

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

            
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import userService from "../../_services/userService";
import layoutUser from "../../assets/layouts/cardUser.vue";
export default {
  name: "UserAdd",
  components: {
    layoutUser,
  },
  data() {
    return {
      userId: sessionStorage.getItem("UserId"),
      token: sessionStorage.getItem("token"),
        firstName: "",
        lastName: "",
        email: "",
        image: "",
         file: "",
    };
  },
created() {
  userService
      .getUserById()
      .then((res) => {
        this.user = res.data;

        console.log(this.user);
      })
      .catch((err) => console.log(err));
},
  methods: {
    select() {
      this.image= this.$refs.image.files[0];
      this.image = URL.createObjectURL(this.image);
    },
    addUser() {
    
      const formData = new FormData();
    
        formData.append("image", this.image);
      
      formData.append("firstName", this.firstName);
      formData.append("lastName", this.lastName);
      formData.append("email", this.email);
      formData.append("userId", this.userId);
      console.log("test", formData.get("userId"));
      console.log("test", formData.get("image"));
      console.log("test", formData.get("firstName"));
      console.log("test", formData.get("email"));
        userService
        .updateUser(formData)

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

