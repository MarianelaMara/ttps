<template>
  <div>
    <Header></Header>
    <NavbarPerfil></NavbarPerfil>
    <div>    
      <b-card>
        <template #header>
         <h4 class="mb-0">Internaciones</h4>
        </template>
        <div v-for="internacion in internaciones"  v-bind:my="internacion" v-bind:key="internacion.idinternacion">
            <Internacion :internacion="internacion"></Internacion>
        </div>
        <p v-if="err"> El paciente no tiene internaciones</p>
  </b-card>
    </div>
  </div>
</template>

<script>
import NavbarPerfil from '../components/NavbarPerfil'
import Header from '../components/Header'
import Internacion from '../components/CardInternacion'
import axios from 'axios';
export default {
  name: 'Internaciones',
  components: {
    NavbarPerfil,
    Header,
    Internacion
  },
  data () {
    return {
        internaciones: "",
        err: false
    }
  },
  mounted () {
    axios
      .get('http://localhost:3000/internaciones/'+ this.$route.params.id, {headers: { "user_token": sessionStorage.token }})
      .then(response => {
        this.internaciones = response.data
      })
      .catch(error => {
        this.err = true;
    });
  }
}
</script>

<style>

</style>