<template>
    <div>
        
        <b-navbar toggleable="md" type="dark" variant="dark">
        <b-navbar-brand tag="h3" class="mb-0">{{ nombre }} {{ apellido}}</b-navbar-brand>
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav class="ml-auto">
                <b-nav-item href="/home" >Home</b-nav-item>
        </b-navbar-nav>
       </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
    name: 'NavbarPerfil',
    data: () => ({
        nombre: sessionStorage.nombre,
        token: sessionStorage.token,
        apellido: sessionStorage.apellido,
        rol: sessionStorage.rol,
        idsistema: sessionStorage.idsistema
  })
}
</script>

<style>

</style>