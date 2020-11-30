<template>
    <div>
      <div v-if="ok">
        <b-alert show dismissible variant="danger">Se asigno el médico {{ medico.nombre }} {{ medico.apellido }} al paciente.
        </b-alert>
      </div>
      <div v-else-if="err">
        <b-alert show dismissible variant="danger">No se puede asignar médico
        </b-alert>
      </div>
      <div v-else>
        <b-card>
          <p><b>Nombre y Apellido:</b> {{ medico.nombre }} {{ medico.apellido }}</p>
          <p><b>Legajo:</b> {{ medico.legajo }}</p>
          <div v-if="noasignado">
            <b-button variant="outline-primary" class="my-2 my-sm-0" v-on:click="asignar()" >Asignar</b-button>
          </div>
        </b-card>
      </div>
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
      noasignado: false,
      ok:false,
      err: false
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
  methods: {
    asignar() {
      axios
      .post('http://localhost:3000/asignarmedico', {idpaciente: this.$route.params.id, idempleado: this.medico.idempleado, idjefe: sessionStorage.idempleado}, {headers: { "user_token": sessionStorage.token }})
      .then(response => (this.ok= true))
      .catch(error => {
        this.err= true;
      })
    }
  }
}

</script>

<style>

</style>