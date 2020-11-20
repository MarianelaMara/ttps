<template>
  <div>
    <Header></Header>
    <NavbarPerfil></NavbarPerfil>
    <div>    
       {{ $route.params.id }}  
       {{ nombre }}
       <b-card>
    <template #header>
      <h4 class="mb-0">Hello World</h4>
    </template>

    <b-card-body>
      <b-card-title>Card Title</b-card-title>
      <b-card-sub-title class="mb-2">Card Sub Title</b-card-sub-title>
      <b-card-text>
        Some quick example text to build on the card title and make up the bulk of the card's
        content.
      </b-card-text>
    </b-card-body>

    <b-list-group flush>
      <b-list-group-item>Cras justo odio</b-list-group-item>
      <b-list-group-item>Dapibus ac facilisis in</b-list-group-item>
      <b-list-group-item>Vestibulum at eros</b-list-group-item>
    </b-list-group>

    <b-card-body>
      <a href="#" class="card-link">Card link</a>
      <a href="#" class="card-link">Another link</a>
    </b-card-body>

    <b-card-footer>This is a footer</b-card-footer>

    
  </b-card>
    </div>
  </div>
</template>

<script>
import NavbarPerfil from '../components/NavbarPerfil'
import Header from '../components/Header'
import axios from 'axios';
export default {
  name: 'VistaJefe',
  components: {
    NavbarPerfil,
    Header
  },
  data () {
    return {
      nombre: "",
      apellido: "",
      dni:"",
      domicilio:"",
      fechanac:"",
      telefono:"",
      email:"",
      legajo:"",

      err: false
    }
  },
  mounted () {
    axios
      .get('http://localhost:3000/jefe/'+ this.$route.params.id, {headers: { "user_token": sessionStorage.token }})
      .then(response => {
        this.nombre = response.data.nombre,
        this.apellido = response.data.apellido,
        this.dni = response.data.dni,
        this.domicilio = response.data.domicilio,
        this.fechanac = response.data.fechanac,
        this.telefono = response.data.telefono,
        this.email = response.data.email,
        this.legajo = response.data.legajo
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style>

.search {
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>