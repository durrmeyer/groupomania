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
                    Prénom:
                    <span class="text"> {{ user.firstName }} </span>
                  </p>
                  <p class="text">
                    Nom:
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
                <div
                  class="card-body d-flex flex-column justify-content-between"
                >
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
                    @change="Upload()"
                  />
                  <div class="card-body mx-auto">
                    <button
                      type="submit"
                      class="form-control btn btn-primary"
                      name="imageUpdate"
                      id="imageUpdate"
                      @click.prevent="updateImage()"
                    >
                      Confirmer
                    </button>
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

