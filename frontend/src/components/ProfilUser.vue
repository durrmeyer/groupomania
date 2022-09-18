

<!--<template>
  <div>
    <section class="h-100 gradient-custom-2">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-lg-9 col-xl-7">
        <div class="card">
          <div class="rounded-top text-white d-flex flex-row" style="background-color: #000; height:200px;">
            <div class="ms-4 mt-5 d-flex flex-column" style="width: 150px;">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                alt="Generic placeholder image" 
                class="img-fluid img-thumbnail mt-4 mb-2"
                style="width: 250px; z-index: 1">
              <button type="button" class="btn btn-outline-dark" data-mdb-ripple-color="dark"
                style="z-index: 1;">
                Edit profile
              </button>
            </div>
            <div class="ms-3" style="margin-top: 130px;">
              <h5>{{user.firstName}} {{user.lastName}}</h5>
             
            </div>
          </div>
         
          <div class="card-body p-4 text-black">
            <div class="mb-5">
              <p class="lead fw-normal mb-1">About</p>
              <div class="p-4" style="background-color: #f8f9fa;">
                <p class="font-italic mb-1">Web Developer</p>
                <p class="font-italic mb-1">Lives in New York</p>
                <p class="font-italic mb-0">Photographer</p>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-4">
              <p class="lead fw-normal mb-0">Recent photos</p>
              <p class="mb-0"><a href="#!" class="text-muted">Show all</a></p>
            </div>
            <div class="row g-2">
              <div class="col mb-2">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                  alt="image 1" class="w-100 rounded-3">
              </div>
              <div class="col mb-2">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                  alt="image 1" class="w-100 rounded-3">
              </div>
            </div>
            <div class="row g-2">
              <div class="col">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                  alt="image 1" class="w-100 rounded-3">
              </div>
              <div class="col">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                  alt="image 1" class="w-100 rounded-3">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  </div>
</template>

<script>
import accountService from "../_services/accountService";
export default {
  data() {
    return {
      token: sessionStorage.getItem("token"),
      userId: sessionStorage.getItem("userId"),
      file: "",
      image: "",
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },

  methods: {
    Upload() {
      this.image = this.$refs.image.files[0];
      this.image = URL.createObjectURL(this.image);
    },
    updateImage() {
      const formData = new FormData();
      formData.append("image", this.image);
      console.log(this.image, "ytfbyugn");
      accountService.updateUser(this.user.id, formData).then((res) => {
        this.user = res.data.user;
        this.image = res.data.image;
      });
    },
  },
};
</script>-->
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
                <div class="row justify-content-around">
                  <div class="card-header-info">Mon Profil</div>
                  <p class="text">
                   
                    <span class="text"> {{ user.firstName }} </span>
                  </p>
                  <p class="text">
                 
                    <span class="text">{{ user.lastName }}</span>
                  </p>
                  <p class="text">
                    Email:
                    <span class="text_color">{{ user.email }}</span>
                  </p>
                </div>
              </div>
              <form
                id="form"
                enctype="multipart/form-data"
                @submit.prevent="updatePicture()"
              >
                <div class="card-body text-center" v-bind="user">
                  <div
                    v-if="user.imageUrl == null"
                    class="dropdown text-center"
                  >
                    <img
                      src=""
                      alt="photo de profil"
                      class="rouned-circle mr-1 avatar"
                    />
                  </div>
                  <div v-else class="dropdown text-center">
                    <img
                      :src="user.image"
                      alt="photo de profil"
                      class="rouned-circle mr-1 avatar"
                      id="avatar"
                    />
                  </div>
                </div>
                
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import accountService from "../_services/accountService";
export default {
  data() {
    return {
      token: sessionStorage.getItem("token"),
      userId: sessionStorage.getItem("userId"),
      file: "",
      image: "",
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },

  methods: {
    Upload() {
      this.image = this.$refs.image.files[0];
      this.image = URL.createObjectURL(this.image);
    },
    updateImage() {
      const formData = new FormData();
      formData.append("image", this.image);
      console.log(this.image, "ytfbyugn");
      accountService.updateUser(this.user.id, formData).then((res) => {
        this.user = res.data.user;
        this.image = res.data.image;
      });
    },
  },
};
</script>

