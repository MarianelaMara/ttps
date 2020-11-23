<template>
  <div>
    <Header></Header>
    <NavbarPerfil></NavbarPerfil>
    <div>    
      <b-card>
        <template #header>
         <h4 class="mb-0">{{ nombre }}</h4>
        </template>
        <b-list-group flush>
            <b-list-group-item><b>Cantidad de camas: </b>{{ total }}</b-list-group-item>
            <b-list-group-item><b>Camas disponibles: </b>{{ libres }}</b-list-group-item>
            <b-list-group-item><b>Camas ocupadas: </b>{{ ocupadas }}</b-list-group-item>
        </b-list-group>
        <div>
        <b-card no-body class="text-center">
            <div class="bg-secondary text-light">Camas de la sala {{ nombre }}
            </div>
         </b-card>
    </div>
        <div>
            <div v-for="cama in camas"  v-bind:my="cama" v-bind:key="cama.estado">
                <b-card>
                  <b>Número de cama: </b>{{ cama.numero}}
                  <b>Estado: </b>{{ cama.estado}}
                  <div v-if="(cama.estado == 'ocupada')">
                    <b-button variant="outline-primary" class="my-2 my-sm-0" type="submit" v-on:click="select()" >Ver más </b-button>
                  </div>
                </b-card>
            </div>
        </div>
  </b-card>
    </div>
  </div>
</template>

<script>
import NavbarPerfil from '../components/NavbarPerfil'
import Header from '../components/Header'
import axios from 'axios';
export default {
  name: 'Sala',
  components: {
    NavbarPerfil,
    Header
  },
  data () {
    return {
      nombre: "",
      total: "",
      ocupadas: "",
      libres: "",
      camas:""
    }
  },
  mounted () {
    axios
      .get('http://localhost:3000/sala/'+ this.$route.params.id, {headers: { "user_token": sessionStorage.token }})
      .then(response => {
        this.nombre = response.data.nombresala
      })
      .catch(error => {
        console.log(error)
    });
     axios
      .get('http://localhost:3000/camas/'+ this.$route.params.id, {headers: { "user_token": sessionStorage.token }})
      .then(response => {
        this.camas = response.data
      })
      .catch(error => {
        console.log(error)
    });
    axios
      .get('http://localhost:3000/camassala/'+ this.$route.params.id, {headers: { "user_token": sessionStorage.token }})
      .then(response => {
        this.total = response.data.camastotales
      })
      .catch(error => {
        console.log(error)
    });
    axios
      .get('http://localhost:3000/camasocupadassala/'+ this.$route.params.id, {headers: { "user_token": sessionStorage.token }})
      .then(response => {
        this.ocupadas = response.data.ocupadas
        this.libres = this.total - this.ocupadas
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