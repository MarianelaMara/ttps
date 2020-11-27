<template>
  <div>
    <Header></Header>
    <NavbarPerfil></NavbarPerfil>
    <div class="search">
        <b-navbar type="light" variant="light">
            <b-nav-form @submit.prevent="search">
                <b-form-input v-model="nombre" class="mr-sm-2" placeholder="Nombre" required></b-form-input>
                <b-form-input v-model="apellido" class="mr-sm-2" placeholder="Apellido" required></b-form-input>
                <b-button variant="outline-primary" class="my-2 my-sm-0" type="submit">Buscar</b-button>
            </b-nav-form>
        </b-navbar>
    </div>
    <div v-if="err">
          <b-alert show dismissible variant="danger">No se encontro medico.
          </b-alert>
    </div>
    <div v-else>
      <div v-for="medico in medicos"  v-bind:my="medico" v-bind:key="medico.idempleado">
        <b-card>
          <p><b>Nombre y Apellido:</b> {{ medico.nombre }} {{ medico.apellido }}</p>
          <p><b>Legajo:</b> {{ medico.legajo }}</p>
          <div>
            <b-button variant="outline-primary" class="my-2 my-sm-0" type="submit" v-on:click="select(medico.idempleado)" >Ver más</b-button>
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
  name: 'BuscarMedico',
  components: {
    NavbarPerfil,
    Header
  },
  data () {
    return {
      medicos: null,
      nombre:"",
      apellido:"",
      err: false
    }
  },
  mounted () {
    axios
      .get('http://localhost:3000/medicos', {headers: { "user_token": sessionStorage.token }})
      .then(response => (this.medicos = response.data))
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    select(id){
      this.$router.push('/vistaEmpleado/'+id);
    },
    search(){
      axios.post('http://localhost:3000/buscarmedico', {nombre: this.nombre, apellido: this.apellido}, {headers: { "user_token": sessionStorage.token }})
        .then(response => {
          this.medicos = response.data;
          console.log(response);
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