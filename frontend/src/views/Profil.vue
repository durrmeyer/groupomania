<template>
  <div>
    
    <div class="title">
      <h2>Profil</h2>
    </div>
    <main>
        <div class="row">
  <div class="profile-nav col-md-3" v-for="(user) in user" :key="user.id">
      <div class="panel">
          <div class="user-heading round">
              <a href="#">
                  <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="">
              </a>
              <h1>{{ user.firstName }}{{ user.lastName }}</h1>
              <p>{{ user.email }}</p>
          </div>

          <ul class="nav nav-pills nav-stacked">
              <li class="active"><a href="#"> <i class="fa fa-user"></i> Profile</a></li>
              <li><a href="#"> <i class="fa fa-calendar"></i> Recent Activity <span class="label label-warning pull-right r-activity">9</span></a></li>
              <li><a href="#"> <i class="fa fa-edit"></i> Edit profile</a></li>
          </ul>
      </div>
  </div>
        </div>
  
          </main>
  </div>
</template>
<script>
import userService from "../_services/userService";
export default {
    
  name: "UsersIndex",
   data() {
    return {
      user: "", 
    };
  },
  
  
  mounted() {
    
     userService
      .getUserById()
      .then(res => console.log(res.data))
      .catch(err =>console.log(err))
       
      
     
  


}
}
</script>