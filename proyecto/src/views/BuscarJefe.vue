<template>
  <div>
    <Header></Header>
    <NavbarPerfil></NavbarPerfil>
    <div class="search">
        <b-navbar type="light" variant="light">
            <b-nav-form @submit.prevent="search">
                <b-form-input v-model="apellido" class="mr-sm-2" placeholder="Apellido" required></b-form-input>
                <b-button variant="outline-primary" class="my-2 my-sm-0" type="submit">Filtrar</b-button>
            </b-nav-form>
        </b-navbar>
    </div>
    <div v-if="err">
          <b-alert show dismissible variant="danger">No se encontro jefe.
          </b-alert>
    </div>
    <div v-else>
      <div v-for="jefe in jefes"  v-bind:my="jefe" v-bind:key="jefe.idempleado">
        <b-card>
          <p><b>Nombre y Apellido:</b> {{ jefe.nombre }} {{ jefe.apellido }}</p>
          <p><b>Legajo:</b> {{ jefe.legajo }}</p>
          <div>
            <b-button variant="outline-primary" class="my-2 my-sm-0" type="submit" v-on:click="select(jefe.idempleado)" >Ver más</b-button>
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
  name: 'BuscarJefe',
  components: {
    NavbarPerfil,
    Header
  },
  data () {
    return {
      jefes: null,
      apellido:"",
      err: false
    }
  },
  mounted () {
    axios
      .get('http://localhost:3000/jefes', {headers: { "user_token": sessionStorage.token }})
      .then(response => (this.jefes = response.data))
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    select(id){
      this.$router.push('/vistaEmpleado/'+id);
    },
    search(){
      axios.post('http://localhost:3000/buscarjefe', {apellido: this.apellido}, {headers: { "user_token": sessionStorage.token }})
        .then(response => {
          this.jefes = response.data;
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