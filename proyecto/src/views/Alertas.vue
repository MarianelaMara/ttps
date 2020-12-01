<template>
  <div>
    <Header></Header>
    <NavbarPerfil></NavbarPerfil>
    <div>    
      <b-card>
        <template #header>
         <h4 class="mb-0">Alertas Pendientes</h4>
        </template>
        <div v-for="alerta in alertas"  v-bind:my="alerta" v-bind:key="alerta.idalerta">
            <Alerta :alerta="alerta"></Alerta>
        </div>
        <p v-if="err">No posee alertas pendientes</p>
  </b-card>
    </div>
  </div>
</template>

<script>
import NavbarPerfil from '../components/NavbarPerfil'
import Header from '../components/Header'
import Alerta from '../components/CardAlerta'
import axios from 'axios';
export default {
  name: 'Alertas',
  components: {
    NavbarPerfil,
    Header,
    Alerta
  },
  data () {
    return {
        alertas: "",
        err: false
    }
  },
  mounted () {
    axios
      .get('http://localhost:3000/alertaspendientes/'+ sessionStorage.idempleado, {headers: { "user_token": sessionStorage.token }})
      .then(response => {
        this.alertas = response.data
      })
      .catch(error => {
        this.err = true;
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