<template>
    <div>
        <div>        
            <b-navbar toggleable="md" type="dark" variant="dark">
            <b-navbar-brand tag="h3" class="mb-0">{{ nombre }} {{ apellido}}</b-navbar-brand>
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown  v-if="rol === 'admin'" text="Jefes de Sistema" right>
                        <b-dropdown-item href="/buscarJefe">Buscar Jefe</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item-dropdown v-if="rol === 'admin'" text="Médicos" right>
                        <b-dropdown-item href="/buscarMedico">Buscar Médico</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item-dropdown v-if="rol != 'admin'" text="Pacientes" right>
                        <b-dropdown-item href="/buscarPaciente">Buscar Paciente</b-dropdown-item>
                        <b-dropdown-item href="/agregarPaciente">Agregar Paciente</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item-dropdown v-if="rol != 'medico'" text="Sistemas" right>
                        <b-dropdown-item href="#" v-on:click="sistema(1)">Guardia</b-dropdown-item>
                        <b-dropdown-item href="#" v-on:click="sistema(2)">Piso Covid</b-dropdown-item>
                        <b-dropdown-item href="#" v-on:click="sistema(3)">UTI</b-dropdown-item>
                        <b-dropdown-item href="#" v-on:click="sistema(4)">Domicilio</b-dropdown-item>
                        <b-dropdown-item href="#" v-on:click="sistema(5)">Hotel</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item-dropdown v-if="rol != 'admin'" text="Alertas" right>
                        <b-dropdown-item href="/alertas">Alertas Pendientes</b-dropdown-item>
                        <b-dropdown-item href="/historialalertas">Historial de alertas</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item href="#" v-if="rol === 'admin'" v-on:click="configguardia()">Configuración guardia</b-nav-item>
                    <b-nav-item href="#" v-on:click="cerrarsesion()">Cerrar sesión</b-nav-item>
                </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>
        <div v-if="ok">
          <b-alert show dismissible variant="success">Se cambió la configuración con éxito. 
          </b-alert>
        </div>
        <div v-if="err">
          <b-alert show dismissible variant="danger">No se pudo realizar el cambio de configuración.
          </b-alert>
        </div>
        <div v-if="seccionconfig">
            <b-card>
                <p><b>Configuración actual:</b> {{ config }}</p>
                <div>
                    <b-button variant="outline-primary" class="my-2 my-sm-0" v-b-modal.modal-sm>Cambiar</b-button>
                    <b-modal id="modal-sm" size="sm" title="Configuración camas de Guardia" @ok="cambiarconfig()">Confirma cambio en la configuración</b-modal>
                </div>
            </b-card>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Navbar',
    data: () => ({
        nombre: "",
        apellido: "",
        rol: "",
        idsistema: "",
        config: "",
        seccionconfig: false,
        err: false,
        ok: false
  }),
   mounted () {
    axios
      .get('http://localhost:3000/empleado/'+ sessionStorage.idempleado, {headers: { "user_token": sessionStorage.token }})
      .then(response => {
        this.nombre = response.data.nombre,
        this.apellido = response.data.apellido,
        this.idsistema = response.data.idsistema,
        this.rol = response.data.rol
      })
      .catch(error => {
        console.log(error)
    });
  },
  methods: {
      cerrarsesion() {
          sessionStorage.clear();
          this.$router.push('/');
      },
      sistema(id) {
          this.$router.push('/sistema/'+id);
      },
      configguardia (){
          this.seccionconfig=true;
          axios
         .get('http://localhost:3000/config', {headers: { "user_token": sessionStorage.token }})
         .then(response => {
            if(response.data.camasinfinitas === 0){
              this.config= 'Camas de guardia limitadas'
            }
            else this.config = 'Camas de guardia ilimitadas'        
      })
      .catch(error => {
        console.log(error)
    });
      },
      cambiarconfig() {
        axios
        .get('http://localhost:3000/cambiarconfig', {headers: { "user_token": sessionStorage.token }})
        .then(response => {
          this.ok = true,
          this.seccionconfig = false      
        })
      .catch(error => {
        this.ok = true,
        this.seccionconfig =false
          
    });
      }
  }
}
</script>

<style>

</style>