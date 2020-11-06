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
                    <b-dropdown-item href="#">Buscar Médico</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown v-if="rol != 'admin'" text="Pacientes" right>
                    <b-dropdown-item href="#">Buscar Paciente</b-dropdown-item>
                    <b-dropdown-item href="#">Agregar Paciente</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown v-if="rol != 'medico'" text="Sistemas" right>
                    <b-dropdown-item href="#">Guardia</b-dropdown-item>
                    <b-dropdown-item href="#">Piso Covid</b-dropdown-item>
                    <b-dropdown-item href="#">UTI</b-dropdown-item>
                    <b-dropdown-item href="#">Domicilio</b-dropdown-item>
                    <b-dropdown-item href="#">Hotel</b-dropdown-item>
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
export default {
    name: 'Navbar',
    data: () => ({
        nombre: sessionStorage.nombre,
        token: sessionStorage.token,
        apellido: sessionStorage.apellido,
        rol: sessionStorage.rol,
        idsistema: sessionStorage.idsistema
  }),
  methods: {
      cerrarsesion() {
          sessionStorage.clear();
          this.$router.push('/');
      }
  }
}
</script>

<style>

</style>