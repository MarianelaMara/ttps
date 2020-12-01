<template>
  <div>
    <Header></Header>
    <NavbarPerfil></NavbarPerfil>
    <div>    
      <b-card>
        <template #header>
         <h4 class="mb-0">Evoluciones de la última internación</h4>
        </template>
        <div v-for="evolucion in evoluciones"  v-bind:my="evolucion" v-bind:key="evolucion.idevolucion">
            <Evolucion :evolucion="evolucion"></Evolucion>
        </div>
        <p v-if="err"> El paciente no tiene evoluciones</p>
        <p v-if="errinternacion"> El paciente no tiene internaciones registradas</p>
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