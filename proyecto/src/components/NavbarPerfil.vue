<template>
    <div>
        
        <b-navbar toggleable="md" type="dark" variant="dark">
        <b-navbar-brand tag="h3" class="mb-0">{{ nombre }} {{ apellido}}</b-navbar-brand>
            <b-navbar-nav class="ml-auto">
                <b-nav-item href="/home">Home</b-nav-item>
        </b-navbar-nav>
  </b-navbar>
</div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'NavbarPerfil',
    data: () => ({
        nombre: "",
        apellido: "",
        rol: "",
        idsistema: ""
  }),
  mounted () {
    axios
      .get('http://localhost:3000/empleado/'+ sessionStorage.idempleado, {headers: { "user_token": sessionStorage.token }})
      .then(response => {
        this.nombre = response.data.nombre,
        this.apellido = response.data.apellido,
        this.idsistema = response.data.idsistema,
        this.rol = response.data.rol
      })
      .catch(error => {
        console.log(error)
    });
  }
}
</script>

<style>

</style>