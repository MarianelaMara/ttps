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
            <b-list-group-item><b>Cantidad de salas: </b>{{ cantidadsalas }}</b-list-group-item>
            <b-list-group-item><b>Cantidad de camas: </b>{{ total }}</b-list-group-item>
            <b-list-group-item><b>Camas disponibles: </b>{{ libres }}</b-list-group-item>
            <b-list-group-item><b>Camas ocupadas: </b>{{ ocupadas }}</b-list-group-item>
        </b-list-group>
        <div>
        <b-card no-body class="text-center">
            <div class="bg-secondary text-light">Salas del sistema de {{ nombre }}
            </div>
         </b-card>
    </div>
        <div>
            <div v-for="sala in salas"  v-bind:my="sala" v-bind:key="sala.idsala">
                <b-card>
                    <b>Nombre de la sala: </b>{{ sala.nombresala}}
                    <div>
                        <b-button variant="outline-primary" class="my-2 my-sm-0" type="submit" v-on:click="select(sala.idsala)" >Ver más</b-button>
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
  name: 'Sistema',
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
      salas:"",
      cantidadsalas: ""
    }
  },
  mounted () {
    axios
      .get('http://localhost:3000/sistema/'+ this.$route.params.id, {headers: { "user_token": sessionStorage.token }})
      .then(response => {
        this.nombre = response.data.nombresistema
      })
      .catch(error => {
        console.log(error)
    });
    axios
      .get('http://localhost:3000/cantidadsalas/'+ this.$route.params.id, {headers: { "user_token": sessionStorage.token }})
      .then(response => {
        this.cantidadsalas = response.data.salas
      })
      .catch(error => {
        console.log(error)
    });
    axios
      .get('http://localhost:3000/camassistema/'+ this.$route.params.id, {headers: { "user_token": sessionStorage.token }})
      .then(response => {
        this.total = response.data.camastotales
      })
      .catch(error => {
        console.log(error)
    });
    axios
      .get('http://localhost:3000/camasocupadassistema/'+ this.$route.params.id, {headers: { "user_token": sessionStorage.token }})
      .then(response => {
        this.ocupadas = response.data.camasocupadas,
        this.libres = this.total - this.ocupadas
      })
      .catch(error => {
        console.log(error)
    });
     axios
      .get('http://localhost:3000/salas/'+ this.$route.params.id, {headers: { "user_token": sessionStorage.token }})
      .then(response => {
        this.salas = response.data
      })
      .catch(error => {
        console.log(error)
    });
  },
  methods: {
    select(id){
      this.$router.push('/sala/'+id);
    }
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