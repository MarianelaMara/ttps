<template>
  <div>
    <Header></Header>
    <NavbarPerfil></NavbarPerfil>
    <div v-if="exitoobito">
          <b-alert show dismissible variant="success">Se realizó el alta por obito.
          </b-alert>
    </div>
    <div v-else-if="exitomedica">
          <b-alert show dismissible variant="success">Se realizó el alta médica.
          </b-alert>
    </div>
    <div v-else>
       <div v-if="errorcambio">
          <b-alert show dismissible variant="danger">No se puede realizar el cambio de sistema porque no hay camas disponibles
          </b-alert>
       </div> 
      <div v-if="cambio">
          <b-alert show dismissible variant="success"> El paciente fue asignado a la cama {{ cama }} en la sala {{ sala }}.</b-alert>
      </div>  
      <div v-else-if="cambiouti">
          <b-alert show dismissible variant="success"> No hay lugar en UTI el paciente se cambio a guardia en la cama {{ cama }} en la sala {{ sala }}.</b-alert>
      </div>  
      <div v-else>
      <b-card>
        <template #header>
          <b-navbar toggleable="md">
          <b-navbar-brand tag="h4" class="mb-0">{{ nombre }} {{ apellido}}</b-navbar-brand>
          <b-navbar-toggle target="nav_collapse" v-if="mismosistema"></b-navbar-toggle>
          <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav class="ml-auto" v-if="mismosistema" >
              <b-navbar-nav class="ml-auto" v-if="tieneinternacion">
                <b-nav-item href="#" v-on:click="agregarevolucion()">Agregar evolución</b-nav-item>
                <b-nav-item href="#" v-if="rol === 'jefe'" v-on:click="asignarmedico()">Asignar médico</b-nav-item>
                <b-nav-item href="#" v-b-modal.modal-sm>Obito</b-nav-item>
                  <b-modal id="modal-sm" size="sm" title="Alta por obito" @ok="altaobito()">Confirma alta por obito</b-modal>
                <b-nav-item href="#" v-b-modal.modal-sm>Alta médico</b-nav-item>
                  <b-modal id="modal-sm" size="sm" title="Alta médica" @ok="altamedica()">Confirma alta médica</b-modal>
                <b-nav-item-dropdown text="Ver" right>
                  <b-dropdown-item href="" v-on:click="verevoluciones()">Evoluciones</b-dropdown-item>
                  <b-dropdown-item href="" v-on:click="verinternaciones()">Internaciones</b-dropdown-item>
                </b-nav-item-dropdown> 
                <b-nav-item-dropdown text="Cambiar de sistema" right>
                   <b-dropdown-item v-on:click="cambiarsistema(1)" v-if="idsistema===4 || idsistema===5">Guardia</b-dropdown-item>
                  <b-dropdown-item v-on:click="cambiarsistema(2)" v-if="idsistema===1 || idsistema===3  || idsistema===5">Piso Covid</b-dropdown-item>
                  <b-dropdown-item v-on:click="cambiarsistema(3)" v-if="idsistema===1 || idsistema===2">UTI</b-dropdown-item>
                  <b-dropdown-item v-on:click="cambiarsistema(4)" v-if="idsistema===2">Domicilio</b-dropdown-item>
                  <b-dropdown-item v-on:click="cambiarsistema(5)" v-if="idsistema===2">Hotel</b-dropdown-item>
                </b-nav-item-dropdown>
              </b-navbar-nav>
              <b-navbar-nav class="ml-auto" v-else>
                <b-nav-item href="#" v-if="tieneinternacion === false"  v-on:click="agregarinternacion()">Agregar internación</b-nav-item>
              </b-navbar-nav>
            </b-navbar-nav>
            </b-collapse>
          </b-navbar> 
        </template>
        <b-list-group flush>
          <b-list-group-item><b>Sistema actual:</b> {{ sistema }}</b-list-group-item>
          <b-list-group-item><b>Sala:</b> {{ sala }}</b-list-group-item>
          <b-list-group-item><b>Número de cama:</b> {{ cama }}</b-list-group-item>
          <b-list-group-item><b>DNI:</b> {{ dni }}</b-list-group-item>
          <b-list-group-item><b>Domicilio:</b> {{ domicilio }}</b-list-group-item>
          <b-list-group-item><b>Fecha de nacimiento:</b> {{ fechanac.slice(0, -14) }}</b-list-group-item>
          <b-list-group-item v-bind:key="antecedentes" v-if="antecedentes !=''"><b>antecedentes personales:</b> {{ antecedentes }}</b-list-group-item>
          <b-list-group-item v-bind:key="obrasocial" v-if="obrasocial !=''"><b>Obra social:</b> {{ obrasocial }}</b-list-group-item>
        </b-list-group>
    </b-card>

    <b-card v-bind:key="nombrecontacto" v-if="nombrecontacto !=''">
      <template #header>
         <h6 class="mb-0">Datos de Contacto</h6>
        </template>
      <b-list-group flush>
          <b-list-group-item><b>Nombre del contacto:</b> {{ nombrecontacto }}</b-list-group-item>
          <b-list-group-item><b>Telefono del contacto:</b> {{ telefonocontacto }}</b-list-group-item>
          <b-list-group-item><b>Parentesco:</b> {{ parentesco }}</b-list-group-item>
        </b-list-group>
    </b-card>
    </div>  
    </div>
  </div>
</template>

<script>
import NavbarPerfil from '../components/NavbarPerfil'
import Header from '../components/Header'
import axios from 'axios';
export default {
  name: 'VistaPaciente',
  components: {
    NavbarPerfil,
    Header
  },
  data () {
    return {
      nombre: "",
      apellido: "",
      dni:"",
      domicilio:"",
      fechanac:"",
      antecedentes:"",
      obrasocial:"",
      nombrecontacto:"",
      telefonocontacto:"",
      parentesco:"",
      idsistema: "",
      sistema: "",
      idpaciente: "",
      mismosistema: false,
      rol: "",
      tieneinternacion: false,
      modalObito: false,
      idinternacion: '',
      exitoobito: false,
      exitomedica: false,
      cambio: false,
      errorcambio: false,
      cama: '',
      sala: '',
      cambiouti: false,
    }
  },
  mounted () {
    axios
      .get('http://localhost:3000/paciente/'+ this.$route.params.id, {headers: { "user_token": sessionStorage.token }})
      .then(response => {
        this.idpaciente = response.data.idpaciente,
        this.nombre = response.data.nombre,
        this.apellido = response.data.apellido,
        this.dni = response.data.dni,
        this.domicilio = response.data.domicilio,
        this.fechanac = response.data.fechanac,
        this.antecedentes = response.data.antecedentes,
        this.obrasocial = response.data.obrasocial,
        this.nombrecontacto = response.data.nombrecontacto,
        this.telefonocontacto = response.data.telefonocontacto,
        this.parentesco = response.data.parentesco,
        this.idsistema= response.data.idsistema
        axios.get('http://localhost:3000/sistema/'+ this.idsistema, {headers: { "user_token": sessionStorage.token }})
          .then(response => {
          this.sistema = response.data.nombresistema
        })
        axios
      .get('http://localhost:3000/empleado/'+ sessionStorage.idempleado, {headers: { "user_token": sessionStorage.token }})
      .then(response => {
        if(response.data.idsistema === this.idsistema){
          this.mismosistema = true;
          this.rol = response.data.rol
        }
      })
      .catch(error => {
    });
      })
      .catch(error => {
    });
     axios.get('http://localhost:3000/info/'+ this.$route.params.id, {headers: { "user_token": sessionStorage.token }})
          .then(response => {
          this.cama = response.data.numero,
          this.sala = response.data.nombresala
      })
     axios
      .get('http://localhost:3000/internacion/'+ this.$route.params.id, {headers: { "user_token": sessionStorage.token }})
      .then(response => {
        this.tieneinternacion = true;
        this.idinternacion = response.data.idinternacion
      })
      .catch(error => {
        console.log(" ");
    });
  },
  methods: {
      verpaciente() {
        this.$router.push('/vistaPaciente/'+this.idpaciente);
      },
      verinternaciones() {
          this.$router.push('/internaciones/'+this.idpaciente);
      },
      verevoluciones() {
          this.$router.push('/evoluciones/'+this.idpaciente);
      },
      agregarevolucion() {
          this.$router.push('/agregarEvolucion/'+this.idpaciente);
      },
      agregarinternacion() {
          this.$router.push('/agregarInternacion/'+this.idpaciente);
      },
      asignarmedico() {
          this.$router.push('/asignarMedico/'+this.idpaciente);
      },
      altaobito() {
        axios
        .put('http://localhost:3000/obito', {id: this.idinternacion, idpaciente: this.idpaciente},{headers: { "user_token": sessionStorage.token }})
        .then(response => {
          this.exitoobito = true;
        })
        .catch(error => {
        });
      },
       altamedica() {
        axios
        .put('http://localhost:3000/altamedica', {id: this.idinternacion, idpaciente: this.idpaciente},{headers: { "user_token": sessionStorage.token }})
        .then(response => {
          this.exitomedica = true;
        })
        .catch(error => {
        });
      },
      cambiarsistema(id) {
        axios
        .post('http://localhost:3000/cambiarsistema', {idsistemaactual: this.idsistema, idsistema: id, idpaciente: this.idpaciente},{headers: { "user_token": sessionStorage.token }})
        .then(response => {
          this.cambio = true;
          this.cama= response.data.numerocama;
          this.sala= response.data.nombresala
        })
        .catch(error => {
          if (id === 3){
            axios
            .post('http://localhost:3000/cambiarsistema', {idsistema: 1, idpaciente: this.idpaciente},{headers: { "user_token": sessionStorage.token }})
            .then(response => {
               this.cambiouti = true;
               this.cama= response.data.numerocama;
               this.sala= response.data.nombresala
            })
           .catch(error => {
             this.errorcambio= true;
            });
          }
          else  this.errorcambio= true;
        });
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