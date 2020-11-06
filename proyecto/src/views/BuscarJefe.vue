<template>
  <div>
    <Header></Header>
    <NavbarPerfil></NavbarPerfil>
    <div class="search">
        <b-navbar type="light" variant="light">
            <b-nav-form>
                <b-form-input class="mr-sm-2" placeholder="Buscar Jefe"></b-form-input>
                <b-button variant="outline-primary" class="my-2 my-sm-0" type="submit">Buscar</b-button>
            </b-nav-form>
        </b-navbar>
    </div>
    <div>
        <div>
            <b-card title="Nombre y apellido" sub-title="Legajo">
            </b-card>
        </div>
        <div>
            <b-card title="Nombre y apellido" sub-title="Legajo">
            </b-card>
        </div>
        <div>
            <b-card title="Nombre y apellido" sub-title="Legajo">
            </b-card>
        </div>
    </div>
  </div>
</template>

<script>
import NavbarPerfil from '../components/NavbarPerfil'
import Header from '../components/Header'
export default {
  name: 'BuscarJefe',
  components: {
    NavbarPerfil,
    Header
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