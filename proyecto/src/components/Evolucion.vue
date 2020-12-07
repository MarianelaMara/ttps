<template>
    <div>    
      <b-card>
        <template #header>
         <h4 class="mb-0">Evolución</h4>
        </template>
        <b-list-group flush>
          <b-list-group-item><b>Realizada por:</b> {{ nombreempleado }} {{apellidoempleado}}</b-list-group-item>
          <b-list-group-item><b>Fecha:</b> {{ evolucion.fecha }}</b-list-group-item>
          <b-list-group-item><b>Hora:</b> {{ evolucion.hora }}</b-list-group-item>
          <b-list-group-item></b-list-group-item>
        </b-list-group>
        <template>
         <h6 class="mb-0">Signos Vitales</h6>
        </template>
        <b-list-group flush>
          <b-list-group-item></b-list-group-item>
          <b-list-group-item><b>Temperatura:</b> {{ evolucion.temperatura }}</b-list-group-item>
          <b-list-group-item><b>TA sistolica:</b> {{ evolucion.tasistolica }}</b-list-group-item>
          <b-list-group-item><b>TA diastolica:</b> {{ evolucion.tadiastolica }}</b-list-group-item>
          <b-list-group-item><b>FC:</b> {{ evolucion.fc }}</b-list-group-item>
          <b-list-group-item><b>FR:</b> {{ evolucion.fr }}</b-list-group-item>
          <b-list-group-item></b-list-group-item>
        </b-list-group>
        <template>
         <h6 class="mb-0">Sistema Respiratorio</h6>
        </template>
        <b-list-group flush>
          <b-list-group-item></b-list-group-item>
          <b-list-group-item><b>Mecanica ventilatoria:</b> {{ evolucion.mecanicaventilatoria }}</b-list-group-item>
          <b-list-group-item v-if="evolucion.oxigeno === 1">
            <b>Requiere oxígeno suplementario:</b> Si
              <b-list-group flush>
                <b-list-group-item></b-list-group-item>
                <b-list-group-item v-if="evolucion.tipo === 'canula'"><b>Tipo:</b> Canula nasal</b-list-group-item>
                <b-list-group-item v-else><b>Tipo:</b> Máscara con reservorio</b-list-group-item>
                <b-list-group-item ><b>Saturación:</b> {{ evolucion.saturacion }}</b-list-group-item>
                <b-list-group-item v-if="evolucion.pafi === 1 ">
                  <b>PaFi:</b> Si
                  <b-list-group flush>
                    <b-list-group-item></b-list-group-item>
                    <b-list-group-item><b> Valor PaFi:</b> {{ evolucion.valorpafi }}</b-list-group-item>
                  </b-list-group>
                </b-list-group-item>
                <b-list-group-item v-else><b>PaFi:</b> No </b-list-group-item>                
                <b-list-group-item v-if="evolucion.pronovigil === 1 "><b>Prono vigil:</b> Si</b-list-group-item>
                <b-list-group-item v-else><b>Prono vigil:</b> No </b-list-group-item>
                <b-list-group-item v-if="evolucion.tos === 1 "><b>Tos:</b> Si</b-list-group-item>
                <b-list-group-item v-else><b>Tos:</b> No </b-list-group-item>
                <b-list-group-item ><b>Disnea:</b> {{ evolucion.disnea }}</b-list-group-item>
                <b-list-group-item v-if="evolucion.estabilidad === 1 "><b>Estabilidad:</b> Si</b-list-group-item>
                <b-list-group-item v-else><b>Estabilidad:</b> No </b-list-group-item>
              </b-list-group>
          </b-list-group-item>
          <b-list-group-item v-else><b>Requiere oxígeno suplementario:</b> No</b-list-group-item>
        </b-list-group>  
        <template>
         <h6 class="mb-0">Otros síntomas</h6>
        </template>
        <b-list-group flush>
          <b-list-group-item></b-list-group-item>
          <b-list-group-item v-if="evolucion.somnolencia === 1"><b>Somnolencia:</b> Si</b-list-group-item>
          <b-list-group-item v-else><b>Somnolencia:</b> No</b-list-group-item>
          <b-list-group-item v-if="evolucion.anosmia === 1 "><b>Anosmia:</b> Si</b-list-group-item>
          <b-list-group-item v-else><b>Anosmia:</b> No</b-list-group-item>
          <b-list-group-item v-if="evolucion.disgeusia === 1 "><b>Disgeusia:</b> Si</b-list-group-item>
          <b-list-group-item v-else><b>Disgeusia:</b> No</b-list-group-item>
        </b-list-group>
        <b-list-group flush>
          <b-list-group-item v-if="evolucion.observacion != null "><b>Observación:</b> {{ evolucion.observacion }}</b-list-group-item>
        </b-list-group>
        <div v-if="evolucion.idsistema === 3">
         <template>
         <h6 class="mb-0">Otros síntomas UTI</h6>
         </template>
        <b-list-group flush>
          <b-list-group-item></b-list-group-item>
          <b-list-group-item v-if="evolucion.arm === 1"><b>ARM:</b> Si
            <b-list-group flush>
              <b-list-group-item></b-list-group-item>
                <b-list-group-item><b>Descripción:</b> {{ evolucion.armdescripcion }}</b-list-group-item>
              </b-list-group>
          </b-list-group-item>
          <b-list-group-item v-else><b>ARM:</b> No</b-list-group-item>
          <b-list-group-item v-if="evolucion.traqueotomia === 1"><b>Traqueotomía:</b> Si</b-list-group-item>
          <b-list-group-item v-else><b>Traqueotomía:</b> No</b-list-group-item>
          <b-list-group-item v-if="evolucion.vasopresores === 1"><b>Vasopresores:</b> Si
            <b-list-group flush>
              <b-list-group-item></b-list-group-item>
                <b-list-group-item><b>Descripción:</b> {{ evolucion.vasopresoresdescripcion }}</b-list-group-item>
              </b-list-group>
          </b-list-group-item>
          <b-list-group-item v-else><b>Vasopresores:</b> No</b-list-group-item>
        </b-list-group>
        </div>
  </b-card>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Evolucion',
  props: {
      evolucion: Object
  },
  data () {
    return {
      nombreempleado: "",
      apellidoempleado: ""
    }
  },
  mounted () {
    axios
      .get('http://localhost:3000/empleado/'+ this.evolucion.idempleado, {headers: { "user_token": sessionStorage.token }})
      .then(response => {
        this.nombreempleado = response.data.nombre;
        this.apellidoempleado = response.data.apellido
    })
      .catch(error => {
        console.log(error)
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