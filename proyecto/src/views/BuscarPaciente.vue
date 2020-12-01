<template>
  <div>
    <Header></Header>
    <NavbarPerfil></NavbarPerfil>
    <div>
        <b-navbar type="light" variant="light">
          <b-nav-form class="search" @submit.prevent="search">
                <b-form-input v-model="dni" class="mr-sm-2" placeholder="DNI" required></b-form-input>
                <b-button variant="outline-primary" class="my-2 my-sm-0" type="submit">Buscar</b-button>
            </b-nav-form>
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#" v-on:click="allPacientes()"><b>Todos los pacientes</b></b-nav-item>
          </b-navbar-nav>  
        </b-navbar>
    </div>
    <div v-if="err">
          <b-alert show dismissible variant="danger">No se encuentra registrado ese DNI.
          </b-alert>
    </div>
    <div v-else>
      <div v-for="paciente in pacientes"  v-bind:my="paciente" v-bind:key="paciente.idpaciente">
        <b-card>
          <p><b>Nombre y Apellido:</b> {{ paciente.nombre }} {{ paciente.apellido }}</p>
          <p><b>DNI:</b> {{ paciente.dni }}</p>
          <div>
            <b-button variant="outline-primary" class="my-2 my-sm-0" type="submit" v-on:click="select(paciente.idpaciente)" >Ver más</b-button>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import NavbarPerfil from '../components/NavbarPerfil'
import Header from '../components/Header'
export default {
  name: 'BuscarPaciente',
  components: {
    NavbarPerfil,
    Header
  },
  data () {
    return {
      pacientes: null,
      dni:"",
      err: false,
      idsistema: ""
    }
  },
  mounted () {
    axios
      .get('http://localhost:3000/empleado/'+ sessionStorage.idempleado, {headers: { "user_token": sessionStorage.token }})
      .then(response => {
        this.idsistema = response.data.idsistema,
        axios
        .get('http://localhost:3000/pacientessistema/'+ this.idsistema, {headers: { "user_token": sessionStorage.token }})
        .then(response => (this.pacientes = response.data))
        .catch(error => {
          console.log(error)
        })
        })
      .catch(error => {
        console.log(error)
    });
  },
  methods: {
    select(id){
      this.$router.push('/vistaPaciente/'+id);
    },
    search(){
      axios.post('http://localhost:3000/buscarpaciente', {dni: this.dni}, {headers: { "user_token": sessionStorage.token }})
        .then(response => {
          this.pacientes = response.data;
          this.err = false;
        })
        .catch(e => {
          this.err = true;
        });
    },
    allPacientes() {
      axios
      .get('http://localhost:3000/pacientes', {headers: { "user_token": sessionStorage.token }})
      .then(response => (this.pacientes = response.data))
      .catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style>


.search {
    display: flex;
    align-items: left;;
    justify-content: left;
}

</style>