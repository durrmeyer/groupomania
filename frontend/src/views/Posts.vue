<template>

  <section id="blog">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="section-title">
            <h2 class="text-center">Read Guides And Tips</h2>
            <p class="text-center col-md-8 offset-md-2">
              <i
                >Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s</i
              >
            </p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="blog-post">
            <div class="post-thumb">
              <a href="#"
                ><img src="//" class="img-fluid"
              /></a>
            </div>
           <label for="title">Title</label>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout
            </p>
            <a href="//" class="btn btn-warning float-right"
              >Read More</a
            >
          </div>
        </div>

        <div class="col-md-4">
          <div class="blog-post">
            <div class="post-thumb">
              <a href="#"
                ><img src="//" class="img-fluid"
              /></a>
            </div>
            <h2><a href="#">Why do we use it?</a></h2>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout
            </p>
            <a href="blog-single.html" class="btn btn-warning float-right"
              >Read More</a
            >
          </div>
        </div>

        <div class="col-md-4">
          <div class="blog-post">
            <div class="post-thumb">
              <a href="#"
                ><img src="//" class="img-fluid"
              /></a>
            </div>
            <h2><a href="#">Where can I get some?</a></h2>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout
            </p>
            <a href="blog-single.html" class="btn btn-warning float-right"
              >Read More</a
            >
          </div>
        </div>
      </div>
    </div>
  </section>

</template>
<script>
import CSS from "../assets/layouts/Post.vue";
export default {
  name: "Posts",
  components: {
    CSS,
  },
};
</script>