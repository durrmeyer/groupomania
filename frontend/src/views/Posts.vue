<template>
<!-- Blog Section -->
    <section id="blog">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="section-title">
                        <h2 class="text-center">Read Guides And Tips</h2>
                        <p class="text-center col-md-8 offset-md-2"><i>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</i></p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <div class="blog-post">
                        <div class="post-thumb">
                            <a href="#"><img src="images/image-one.jpg" class="img-fluid" /></a>
                        </div>
                        <h2><a href="#">What is Lorem Ipsum?</a></h2>
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</p>
                        <a href="blog-single.html" class="btn btn-warning float-right">Read More</a>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="blog-post">
                        <div class="post-thumb">
                            <a href="#"><img src="images/image-two.jpg" class="img-fluid" /></a>
                        </div>
                        <h2><a href="#">Why do we use it?</a></h2>
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</p>
                        <a href="blog-single.html" class="btn btn-warning float-right">Read More</a>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="blog-post">
                        <div class="post-thumb">
                            <a href="#"><img src="images/image-three.jpg" class="img-fluid" /></a>
                        </div>
                        <h2><a href="#">Where can I get some?</a></h2>
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</p>
                        <a href="blog-single.html" class="btn btn-warning float-right">Read More</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- End Blog Section -->


  //////////////////////////////////////////////////////////////////////////////////////
  <div class="container">
    <div v-if="User">
      <p>bonjour</p>
    </div>
    <div>
      <form @submit.prevent="submit">
        <div>
          <label for="title">Titre:</label>
          <input type="text" name="title" v-model="title" />
        </div>
        <div>
          <textarea
            name="write_up"
            v-model="write_up"
            placeholder="Desciption..."
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    <div class="posts" v-if="Posts">
      <ul>
        <li v-for="post in Posts" :key="post.id">
          <div id="post-div">
            <p></p>
            <p></p>
            <p>Written By:</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import CSS from '../assets/layouts/Post.vue'
export default {
  name:'Posts',
  components: {
    CSS
  }
}
</script>