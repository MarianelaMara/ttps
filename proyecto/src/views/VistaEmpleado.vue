<template>
  <div>
    <Header></Header>
    <NavbarPerfil></NavbarPerfil>
    <div>    
      <b-card>
        <template #header>
         <h4 class="mb-0">{{ nombre }} {{ apellido }}</h4>
        </template>
        <b-list-group flush>
          <b-list-group-item><b>Sistema asignado:</b> {{ sistema }}</b-list-group-item>
          <b-list-group-item><b>Legajo:</b> {{ legajo }}</b-list-group-item>
          <b-list-group-item><b>DNI:</b> {{ dni }}</b-list-group-item>
          <b-list-group-item><b>Domicilio:</b> {{ domicilio }}</b-list-group-item>
          <b-list-group-item><b>Fecha de nacimiento:</b> {{ fechanac }}</b-list-group-item>
          <b-list-group-item><b>Teléfono:</b> {{ telefono }}</b-list-group-item>
          <b-list-group-item><b>Email:</b> {{ email }}</b-list-group-item>
        </b-list-group>

    <b-card-body>
      <a href="#" class="card-link">Card link</a>
      <a href="#" class="card-link">Another link</a>
    </b-card-body>
  
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
      idsistema:"",
      sistema:"",
      err: false
    }
  },
  mounted () {
    axios
      .get('http://localhost:3000/empleado/'+ this.$route.params.id, {headers: { "user_token": sessionStorage.token }})
      .then(response => {
        this.nombre = response.data.nombre,
        this.apellido = response.data.apellido,
        this.dni = response.data.dni,
        this.domicilio = response.data.domicilio,
        this.fechanac = response.data.fechanac,
        this.telefono = response.data.telefono,
        this.email = response.data.email,
        this.legajo = response.data.legajo,
        this.idsistema = response.data.idsistema,
        //this.sistema = response.data.nombresistema
        axios.get('http://localhost:3000/sistema/'+ this.idsistema, {headers: { "user_token": sessionStorage.token }})
          .then(response => {
          this.sistema = response.data.nombresistema
        })
      })
      .catch(error => {
        console.log(error)
    });
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