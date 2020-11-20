<template>
  <div class="vue-tempalte" >
        <form @submit.prevent="login" class="border p-3 form">
           <p class="h3 text-center mb-4">ControlCovid</p>
            <div  class="form-group">
                <input type="text" v-model="username" placeholder="Nombre de usuario" class="form-control form-control-lg" required>
            </div>
            <div class="form-group">
                <input type="password" v-model="password" placeholder="Password" class="form-control form-control-lg" required>
            </div>
            <div>
              <b-alert show variant="danger" v-if="err"> Usuario o contraseña incorrecta </b-alert>
             </div>
            <div class="form-group">
                <button type="submit" class="btn btn-dark btn-lg btn-block" >Iniciar sesión</button>
            </div>
        </form>
  </div>
</template>

<script>
import axios from 'axios'; 
export default {
  data: () => ({
    username: "",
    password: "",
    err: false
  }),
  methods: {
    login(){     
        axios.post('http://localhost:3000/login', {username: this.username, password: this.password})
        .then(response => {
          sessionStorage.setItem('nombre',response.data.nombre);
          sessionStorage.setItem('apellido',response.data.apellido);
          sessionStorage.setItem('token',response.data.token);
          sessionStorage.setItem('rol',response.data.rol);
          sessionStorage.setItem('idsistema',response.data.idsistema);
          this.$router.push('/home');
        })
        .catch(error => {
          this.err = true;
        });
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');
p {
    font-family: 'Dancing Script', cursive;
}
* {
  box-sizing: border-box;
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
  background-color: white;
}


</style>
