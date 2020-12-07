<template>
  <div>
    <Header></Header>
    <NavbarPerfil></NavbarPerfil>    
    <div>    
      <b-card>
        <template #header>
          <b-navbar>
             <b-navbar-brand v-if="buscar" tag="h4" class="mb-0">Evoluciones de {{nombresistema}}</b-navbar-brand>
             <b-navbar-brand v-else tag="h4" class="mb-0">Evoluciones</b-navbar-brand>
             <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown text="Ver evoluciones por sistema" right>
                  <b-dropdown-item href="" v-on:click="verevoluciones(1)">Guardia</b-dropdown-item>
                  <b-dropdown-item href="" v-on:click="verevoluciones(2)">Pico covid</b-dropdown-item>
                  <b-dropdown-item href="" v-on:click="verevoluciones(3)">UTI</b-dropdown-item>
                  <b-dropdown-item href="" v-on:click="verevoluciones(4)">Domicilio</b-dropdown-item>
                   <b-dropdown-item href="" v-on:click="verevoluciones(5)">Hotel</b-dropdown-item>
                  <b-dropdown-item href="" v-on:click="todasevoluciones()">Todas las evoluciones</b-dropdown-item>
                </b-nav-item-dropdown> 
             </b-navbar-nav>
          </b-navbar>
        </template>
        <p v-if="err"> El paciente no tiene evoluciones</p>
        <p v-else-if="errinternacion"> El paciente no tiene internaciones registradas</p>
        <div v-else v-for="evolucion in evoluciones"  v-bind:my="evolucion" v-bind:key="evolucion.idevolucion">
            <Evolucion :evolucion="evolucion"></Evolucion>
        </div>
  </b-card>
    </div>
  </div>
</template>

<script>
import NavbarPerfil from '../components/NavbarPerfil'
import Header from '../components/Header'
import Evolucion from '../components/Evolucion'
import axios from 'axios';
export default {
  name: 'Evoluciones',
  components: {
    NavbarPerfil,
    Header,
    Evolucion
  },
  data () {
    return {
        idinternacion: "",
        evoluciones: "",
        err: false,
        errinternacion: false,
        buscar: false,
        nombresistema: "", 
    }
  },
  methods: {
      verevoluciones(id) {
        axios
        .post('http://localhost:3000/evolucionessistema', {idinternacion: this.idinternacion, idsistema: id},{headers: { "user_token": sessionStorage.token }})
        .then(response => {
          this.evoluciones = response.data;
          this.buscar = true;
          this.err = false; 
        })
        .catch(error => {
          this.err = true;
          this.buscar = true;
        });
        axios
        .get('http://localhost:3000/sistema/'+id, {headers: { "user_token": sessionStorage.token }})
        .then(response => {
          this.nombresistema = response.data.nombresistema;
        })
      },
      todasevoluciones() {
         axios.get('http://localhost:3000/evolucion/'+ this.idinternacion, {headers: { "user_token": sessionStorage.token }})
          .then(response => {
          this.evoluciones = response.data
          this.buscar =false;
        })
        .catch(error => {
        this.err = true;
    });
      }
  },
  mounted () {
    axios
      .get('http://localhost:3000/internacion/'+ this.$route.params.id, {headers: { "user_token": sessionStorage.token }})
      .then(response => {
        this.idinternacion = response.data.idinternacion,
        axios.get('http://localhost:3000/evolucion/'+ this.idinternacion, {headers: { "user_token": sessionStorage.token }})
          .then(response => {
          this.evoluciones = response.data
        })
        .catch(error => {
        this.err = true;
         });
      })
      .catch(error => {
        this.errinternacion = true;
    });
  }
}
</script>

<style>
</style>