<template>
    <div>
        <Header></Header>
        <NavbarPerfil></NavbarPerfil>
        <div v-if="ok">
          <b-card>
            <template #header>
              <b-navbar class="ml-auto">
                <b-navbar-nav class="ml-auto">
                  <b-nav-item href="#" v-on:click="verpaciente()">Ver Paciente</b-nav-item>
                </b-navbar-nav>
              </b-navbar>
            </template>
          </b-card>
          <b-alert show dismissible variant="success">Se agrego la internación con éxito.
          </b-alert>
        </div>
        <div v-else>
            <b-card>
                <template #header>
                    <b-navbar-brand tag="h4" class="mb-0">Agregar Internación</b-navbar-brand>
                </template>
                <div class="col-sm-6 mx-auto">
                  <b-form @submit.prevent="agregar" class="border p-3">
                    <b-form-group label-cols="3" label-cols-lg="3" label="Fecha inicio de síntomas:">
                      <b-input-group class= "mb-3">
                          <b-form-input  v-model="fechasintomas" type= "text" placeholder= "AAAA-MM-DD" autocomplete= "off" required>
                          </b-form-input> 
                          <b-input-group-append> 
                            <b-form-datepicker v-model="fechasintomas" button-only right locale="sp-ES">
                            </b-form-datepicker> 
                          </b-input-group-append> 
                      </b-input-group>                     
                    </b-form-group>
                    <b-form-group  label-cols="3" label-cols-lg="3" label="Fecha diagnostico:">
                      <b-input-group class= "mb-3">
                          <b-form-input v-model="fechadiagnostico" type= "text" placeholder= "AAAA-MM-DD" autocomplete= "off">
                          </b-form-input> 
                          <b-input-group-append> 
                            <b-form-datepicker v-model="fechadiagnostico" button-only right locale="sp-ES">
                            </b-form-datepicker> 
                          </b-input-group-append> 
                      </b-input-group>                 
                    </b-form-group>
                    <b-form-group label-cols="3" label-cols-lg="3" label="Enfermedad actual">
                      <b-form-textarea v-model="enfermedadactual" rows = "2" max-rows = "6"></b-form-textarea>
                    </b-form-group>
                    <div class="text-center">
                      <b-button type="submit" variant="secondary">Guardar</b-button>
                    </div>
                  </b-form>
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
    name: 'AgregarInternacion',
  components: {
    NavbarPerfil,
    Header
  },
  data: () => ({
    fechasintomas: '',
    fechadiagnostico: '',
    enfermedadactual: '',
    ok: false
  }),
  methods: {
    agregar(){   
        axios.post('http://localhost:3000/internacion', {idpaciente: this.$route.params.id, fechasintomas: this.fechasintomas, fechadiagnostico: this.fechadiagnostico, enfermedadactual: this.enfermedadactual}, {headers: { "user_token": sessionStorage.token }})
        .then(response => {
          this.ok = true;
        })
        .catch(error => {
    
        });
    },
     verpaciente() {
      this.$router.push('/vistaPaciente/'+this.$route.params.id);
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');
.vue-tempalte
 {
  width: 100%;
  height: 100%;
}
.vue-tempalte{
  display: flex;
  align-items: center;
  justify-content: center;
}
.form{
  background-color: white;
}


</style>
