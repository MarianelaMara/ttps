<template>
   <div>
        <b-card>
          <p><b>Nombre y Apellido:</b> {{ medico.nombre }} {{ medico.apellido }}</p>
          <p><b>Legajo:</b> {{ medico.legajo }}</p>
          <div v-if="noasignado">
            <b-button variant="outline-primary" class="my-2 my-sm-0" type="submit" >Asignar</b-button>
          </div>
        </b-card>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'CardMedicoAsignado',
    props: {
      medico: Object
    },
     data () {
    return {
      noasignado: false
    }
  },
    mounted() {
      axios
      .post('http://localhost:3000/medicoasignado', {idpaciente: this.$route.params.id, idempleado: this.medico.idempleado}, {headers: { "user_token": sessionStorage.token }})
      .then(response => (this.noasignado= false))
      .catch(error => {
        this.noasignado= true;
      })
  },
}

</script>

<style>

</style>