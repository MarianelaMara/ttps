<template>
  <div>
    <Header></Header>
    <NavbarPerfil></NavbarPerfil>
    <!--<div class="search">
        <b-navbar type="light" variant="light">
            <b-nav-form @submit.prevent="search">
                <b-form-input v-model="nombre" class="mr-sm-2" placeholder="Nombre" required></b-form-input>
                <b-form-input v-model="apellido" class="mr-sm-2" placeholder="Apellido" required></b-form-input>
                <b-button variant="outline-primary" class="my-2 my-sm-0" type="submit">Buscar</b-button>
            </b-nav-form>
        </b-navbar>
    </div>-->
    <div v-if="err">
          <b-alert show dismissible variant="danger">No hay médicos en el sistema.
          </b-alert>
    </div>
    <div v-else>
      <div v-for="medico in medicos" v-bind:my="medico" v-bind:key="medico.idempleado">
        <CardMedicoAsignado :medico="medico"></CardMedicoAsignado>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import NavbarPerfil from '../components/NavbarPerfil'
import Header from '../components/Header'
import CardMedicoAsignado from '../components/CardMedicoAsignado'
export default {
  name: 'AsignarMedico',
  components: {
    NavbarPerfil,
    Header,
    CardMedicoAsignado
  },
  data () {
    return {
      medicos: null,
      idsistemapaciente: '',
      //nombre:"",
      //apellido:"",
      err: false
    }
  },
  mounted () {
    axios
      .get('http://localhost:3000/paciente/'+ this.$route.params.id, {headers: { "user_token": sessionStorage.token }})
      .then(response => (
        this.idsistemapaciente= response.data.idsistema,
        axios
        .get('http://localhost:3000/medicos/sistema/'+this.idsistemapaciente, {headers: { "user_token": sessionStorage.token }})
        .then(response => (this.medicos = response.data))
        .catch(error => {
          this.err= true
        })
       ))
      .catch(error => {
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