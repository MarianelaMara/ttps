<template>
    <div>
      <div>
        <b-card>
            <b>Número de cama: </b>{{ cama.numero}}
            <b>Estado: </b>{{ cama.estado}}
            <div v-if="(cama.estado == 'ocupada')">
                <b-button variant="outline-primary" class="my-2 my-sm-0" type="submit" v-on:click="verpaciente()" >Ver paciente</b-button>
            </div>
        </b-card>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'CardCama',
    props: {
      cama: Object
    },
  methods: {
    verpaciente(){
        this.$router.push('/vistaPaciente/'+this.cama.idpaciente);
    }
  }
}

</script>

<style>

</style>