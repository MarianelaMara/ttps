<template>
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
                    <b-dropdown-item href="#">Agregar Paciente</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown v-if="rol != 'medico'" text="Sistemas" right>
                    <b-dropdown-item href="#" v-on:click="sistema(1)">Guardia</b-dropdown-item>
                    <b-dropdown-item href="#" v-on:click="sistema(2)">Piso Covid</b-dropdown-item>
                    <b-dropdown-item href="#" v-on:click="sistema(3)">UTI</b-dropdown-item>
                    <b-dropdown-item href="#" v-on:click="sistema(4)">Domicilio</b-dropdown-item>
                    <b-dropdown-item href="#" v-on:click="sistema(5)">Hotel</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown v-if="rol === 'admin'" text="Configuraciones" right>
                    <b-dropdown-item href="#">Guardias camas limitadas</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item href="#" v-on:click="cerrarsesion()">Cerrar sesión</b-nav-item>
        </b-navbar-nav>
       </b-collapse>
  </b-navbar>
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
        idsistema: ""
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
      }
  }
}
</script>

<style>

</style>