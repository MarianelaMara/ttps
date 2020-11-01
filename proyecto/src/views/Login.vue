<template>
  <div class="vue-tempalte" >
        <form @submit="login" class="border p-3 form">
           <p class="h4 text-center mb-4">ControlCovid</p>
            <div  class="form-group">
                <input type="text" v-model="username" placeholder="Nombre de usuario" class="form-control form-control-lg" required>
            </div>
            <div class="form-group">
                <input type="password" v-model="password" placeholder="Password" class="form-control form-control-lg" required>
            </div>
            <div>
              <b-alert show variant="danger" v-if="error"> Usuario o contraseña incorrecta </b-alert>
             </div>
            <div class="form-group">
                <button type="submit" class="btn btn-dark btn-lg btn-block" >Iniciar sesión</button>
            </div>
        </form>
        
  </div>
</template>

<script>
import axios from 'axios';

const url = 'https://localhost/3000/'; 
export default {
  data: () => ({
    username: "",
    password: "",
    rol: "",
    error: false,
    info: null,
    status: null
  }),
  methods: {
    login(){     
        axios.post('http://localhost:3000/login', {username: this.username, password: this.password})
        .then(response => {
          this.info = response.data;
          this.status= response.data.status;
          if(this.status == 200){
          this.$router.push('/home');
        }
        else {
          this.error = true;
        }//hacer try catch y de la api devolver error
      })
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  background:white;
 
}

body,
html,
.vue-tempalte
 {
  
  width: 100%;
  height: 100%;
}
.vue-tempalte{
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
.form{
  widows: 400px;
}


</style>
