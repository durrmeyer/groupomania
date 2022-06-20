<template>
  <div>
    <div class="title">
      <h2>Profil</h2>
    </div>
    <main>
      <div class="row">
        <div class="profile-nav col-md-3" v-for="user in users" :key="user.id">
          <div class="panel">
            <div class="user-heading round">
              <label for="file" class="form-label">Image</label>
              <input
                class="form-control"
                type="file"
                accept="image/*"
                ref="file"
                name="image"
                @change="imageUpload()"
              />
              <h1>fgsgsdf</h1>
              <p>fdxgsdfg</p>
            </div>

            <ul class="nav nav-pills nav-stacked">
              <li class="active">
                <a href="#"> <i class="fa fa-user"></i> Profile</a>
              </li>

              <li>
                <a href="#"> <i class="fa fa-edit"></i> Edit profile</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
/*import userService from "../_services/userService";
export default {
  name: "UsersIndex",
  data() {
    return {
      user: {
        id: localStorage.getItem("userId"),
        //isAdmin: localStorage.getItem("isAdmin"),
        firtName: "",
        lastName: "",
        email: "",
        imageUrl: "",
        file: "",
      },
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
    };
  },

  /*mounted() {
    userService
      .getUserById()
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  },
  methods: {
    imageUpload(data) {
      this.image = this.$refs.file.files[0];
      this.imageUrl = URL.createObjectURL(this.image);
      console.log(this.image);
    },

    addPost() {
      const formData = new FormData();

      formData.append("image", this.image);
      formData.append("userId", parseInt(localStorage.getItem("userId")));
      console.log("test", formData.get("file"));
      postService
        .createPost(formData)
        .then(() => {
          this.$router.push("/posts");
        })
        .catch((err) => console.log(err));
    },
  },
};*/
</script>