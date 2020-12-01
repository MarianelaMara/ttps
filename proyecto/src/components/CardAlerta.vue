<template>
    <div>
        <div v-if="err">
        <b-alert show dismissible variant="danger">No se pudo marcar la alerta como vista
        </b-alert>
      </div>
      <div v-if="ok">
        <b-alert show dismissible variant="success">Se marcó la alerta como vista.
        </b-alert>
      </div>
      <div v-else>
        <b-card>
          <p><b>Fecha:</b> {{ alerta.fecha.slice(0, -14) }}</p>
          <p><b>Texto:</b> {{ alerta.texto }}</p>
          <div>
            <b-button variant="outline-primary" class="my-2 my-sm-0" v-on:click="verpaciente()" >Ver Paciente</b-button>
            <b-button v-if="alerta.vista===0" variant="outline-primary" class="my-2 my-sm-0" v-on:click="marcarvista()" >Marcar</b-button>
          </div>
        </b-card>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'CardAlerta',
    props: {
      alerta: Object
    },
     data () {
    return {
        ok:false,
        err:false,
    }
  },
  methods: {
    marcarvista(){
        axios
        .post('http://localhost:3000/marcaralerta', {id: this.alerta.idalerta}, {headers: { "user_token": sessionStorage.token }})
        .then(response => {
            this.ok = true
        })
        .catch(error => {
            this.err = true;
        });
    },
    verpaciente(){
        this.$router.push('/vistaPaciente/'+this.alerta.idpaciente);
    }
  }
}

</script>

<style>

</style>