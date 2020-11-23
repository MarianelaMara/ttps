<template>
  <div>
    <Header></Header>
    <NavbarPerfil></NavbarPerfil>
    <div>         
      <b-card>
        <template #header>
          <b-navbar toggleable="md">
          <b-navbar-brand tag="h4" class="mb-0">{{ nombre }} {{ apellido}}</b-navbar-brand>
          <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
          <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav class="ml-auto">
              <b-nav-item href="#">Agregar internación</b-nav-item>
              <b-nav-item href="#">Agregar evolución</b-nav-item>
              <b-nav-item href="#">Asignar médico</b-nav-item>
              <b-nav-item href="#">Obito</b-nav-item>
              <b-nav-item href="#">Alta médico</b-nav-item>
              <b-nav-item-dropdown text="Evoluciones" right>
                <b-dropdown-item href="">Ver evoluciones</b-dropdown-item>
                <b-dropdown-item href="">Ver evoluciones y sistemas</b-dropdown-item>
              </b-nav-item-dropdown> 
              <b-nav-item-dropdown text="Cambiar de sistema" right>
                <b-dropdown-item href="">Guardia</b-dropdown-item>
                <b-dropdown-item href="">Piso Covid</b-dropdown-item>
                 <b-dropdown-item href="">UTI</b-dropdown-item>
                <b-dropdown-item href="">Domicilio</b-dropdown-item>
                 <b-dropdown-item href="">Hotel</b-dropdown-item>
              </b-nav-item-dropdown>
          </b-navbar-nav>
            </b-collapse>
          </b-navbar> 
        </template>
        <b-list-group flush>
          <b-list-group-item><b>Sistema actual:</b> {{ sistema }}</b-list-group-item>
          <b-list-group-item><b>DNI:</b> {{ dni }}</b-list-group-item>
          <b-list-group-item><b>Domicilio:</b> {{ domicilio }}</b-list-group-item>
          <b-list-group-item><b>Fecha de nacimiento:</b> {{ fechanac }}</b-list-group-item>
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
      sistema: ""
    }
  },
  mounted () {
    axios
      .get('http://localhost:3000/paciente/'+ this.$route.params.id, {headers: { "user_token": sessionStorage.token }})
      .then(response => {
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