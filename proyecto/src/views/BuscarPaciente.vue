<template>
  <div>
    <Header></Header>
    <NavbarPerfil></NavbarPerfil>
    <div class="search">
        <b-navbar type="light" variant="light">
            <b-nav-form @submit.prevent="search">
                <b-form-input v-model="dni" class="mr-sm-2" placeholder="DNI" required></b-form-input>
                <b-button variant="outline-primary" class="my-2 my-sm-0" type="submit">Buscar</b-button>
            </b-nav-form>
        </b-navbar>
    </div>
    <div v-if="err">
      <p>No se encontro Paciente</p>
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
      err: false
    }
  },
  mounted () {
    axios
      .get('http://localhost:3000/pacientes', {headers: { "user_token": sessionStorage.token }})
      .then(response => (this.pacientes = response.data))
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    select(id){
      this.$router.push('/vistaPaciente/'+id);
      console.log(id);
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
    }
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