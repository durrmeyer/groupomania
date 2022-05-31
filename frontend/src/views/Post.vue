<template>
    <div>
       <h3>Page Articles</h3> 
<thead>
    <tr>
        <th>Id</th>
         <th>Title</th>
          <th>Description</th>
    </tr>
</thead>

<tbody>
    <tr v-for="post in postsPosts" :key="post.id">
        <td>{{post.id}}</td>
         <td>{{post.title}}</td>
          <td>{{post.description}}</td>
    </tr>
</tbody>
    </div>
</template>
<script>

import axios from '../_services/axios'
export default {
      name: 'Posts',
      data() {
          return{ 
          postPosts: [],

          };
      },
      mounted() {
          axios.get('/Posts')
          .then((res) => {
              this.formatPosts(res.data);
          })
      },
      methods: {
          formatArticles(postsData) {
              for (let Key in postsData) {
                  this.postPosts.push({...postsData[Key], id: post});

              }
          }
      },
};
</script>
