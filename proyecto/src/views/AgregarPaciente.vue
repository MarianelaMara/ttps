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
          <b-alert show dismissible variant="success"> El paciente fue asignado a la cama {{ cama }} en la sala {{ sala }}.
          </b-alert>
                   <b-alert show dismissible variant="warning">Debes agregarle una internación desde la vista del paciente.
          </b-alert>
        </div>
        <div v-else-if="err">
          <b-alert show dismissible variant="danger">No se puede agregar el paciente porque no hay cama disponible en Guardia
          </b-alert>
        </div>
        <div v-else>
            <b-card>
                <template #header>
                    <b-navbar-brand tag="h4" class="mb-0">Agregar Paciente</b-navbar-brand>
                </template>
                <div class="col-sm-6 mx-auto">
                  <b-form @submit.prevent="agregar" class="border p-3">
                    <h6><b>Datos Personales</b></h6>
                    <b-form-group label-cols="3" label-cols-lg="3" label="Nombre:">
                      <b-form-input type="text" v-model="nombre" :required="true"></b-form-input>                    
                    </b-form-group>
                     <b-form-group label-cols="3" label-cols-lg="3" label="Apellido:">
                      <b-form-input type="text" v-model="apellido" :required="true"></b-form-input>                    
                    </b-form-group>
                     <b-form-group label-cols="3" label-cols-lg="3" label="DNI:">
                      <b-form-input type="text" v-model="dni" :required="true"></b-form-input>                    
                    </b-form-group>
                    <b-form-group label-cols="3" label-cols-lg="3" label="Fecha de nacimiento:">
                      <b-input-group class= "mb-3">
                          <b-form-input  v-model="fechanac" type= "text" placeholder= "AAAA-MM-DD" autocomplete= "off" required>
                          </b-form-input> 
                          <b-input-group-append> 
                            <b-form-datepicker v-model="fechanac" button-only right locale="sp-ES">
                            </b-form-datepicker> 
                          </b-input-group-append> 
                      </b-input-group>                     
                    </b-form-group>
                     <b-form-group label-cols="3" label-cols-lg="3" label="Domicilio:">
                      <b-form-input type="text" v-model="domicilio" :required="true"></b-form-input>                    
                    </b-form-group>
                     <b-form-group label-cols="3" label-cols-lg="3" label="Teléfono:">
                      <b-form-input type="text" v-model="telefono" :required="true"></b-form-input>                    
                    </b-form-group>
                     <b-form-group label-cols="3" label-cols-lg="3" label="Obra social:">
                      <b-form-input type="text" v-model="obrasocial"></b-form-input>                    
                    </b-form-group>
                    <b-form-group label-cols="3" label-cols-lg="3" label="Antecedentes personales">
                      <b-form-textarea v-model="antecedentes" rows = "2" max-rows = "6"></b-form-textarea>
                    </b-form-group>
                     <h6><b>Datos del contacto</b></h6>
                    <b-form-group label-cols="3" label-cols-lg="3" label="Nombre:">
                      <b-form-input type="text" v-model="nombrecontacto"></b-form-input>                    
                    </b-form-group>
                     <b-form-group label-cols="3" label-cols-lg="3" label="Teléfono:">
                      <b-form-input type="text" v-model="telefonocontacto"></b-form-input>                    
                    </b-form-group>
                     <b-form-group label-cols="3" label-cols-lg="3" label="Parentesco:">
                      <b-form-input type="text" v-model="parentesco"></b-form-input>                    
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
    name: 'AgregarPaciente',
  components: {
    NavbarPerfil,
    Header
  },
  data: () => ({
    nombre: '',
    apellido: '',
    dni: '',
    domicilio: '',
    fechanac: '',
    telefono: '',
    antecedentes: '',
    obrasocial: '',
    nombrecontacto: '',
    parentesco: '',
    telefonocontacto: '',
    sala: '',
    cama: '',
    err: false,
    ok: false,
    idpaciente: ''
  }),
  methods: {
    agregar(){ 
        axios.post('http://localhost:3000/paciente', {dni: this.dni, nombre: this.nombre, apellido: this.apellido, domicilio: this.domicilio, fechanac: this.fechanac, telefono: this.telefono, antecedentes: this.antecedentes, obrasocial: this.obrasocial, nombrecontacto: this.nombrecontacto, parentesco: this.parentesco, telefonocontacto: this.telefonocontacto, fechasintomas: this.fechasintomas, fechadiagnostico: this.fechadiagnostico, enfermedadactual: this.enfermedadactual}, {headers: { "user_token": sessionStorage.token }})
        .then(response => {
            /*axios.post('http://localhost:3000/internacion', {idpaciente: response.data.idpaciente, fechasintomas: this.fechasintomas, fechadiagnostico: this.fechadiagnostico, enfermedadactual: this.enfermedadactual}, {headers: { "user_token": sessionStorage.token }})
            .then(response => {})
            .catch(error => { console.log('error de internacion')});*/
            this.ok = true;
            this.cama = response.data.numerodecama;
            this.sala = response.data.nombresala;
            this.idpaciente= response.data.idpaciente
        })
        .catch(error => {
            if(error.response.status === 404) {
                this.err = true;
            }
        });
    },
    verpaciente() {
      this.$router.push('/vistaPaciente/'+this.idpaciente);
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
