<template>
    <div>
      <b-card>
          <p><b>Estado:</b> {{ internacion.estado }}</p>
          <p><b>Fecha:</b> {{ internacion.fecha.slice(0, -14) }}</p>
          <p><b>Fecha inicio de síntomas:</b> {{ internacion.fechasintomas.slice(0, -14) }}</p>
          <p v-if="internacion.fechadiagnostico"><b>Fecha diagnóstico:</b> {{ internacion.fechadiagnostico.slice(0, -14) }}</p>
          <p v-if="internacion.enfermedadactual"><b>Enfermedad actual:</b> {{ internacion.enfermedadactual }}</p>
          <p v-if="internacion.fechaegreso"><b>Fecha egreso:</b> {{ internacion.fechaegreso.slice(0, -14) }}</p>
          <p v-if="internacion.fechaobito"><b>Fecha obito:</b> {{ internacion.fechaobito.slice(0, -14) }}</p>
        </b-card>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'CardInternacion',
    props: {
      internacion: Object
    }
}

</script>

<style>

</style>