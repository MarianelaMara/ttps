<template>
  <div>
    <div class="p-3 mb-2 bg-white text-dark">
      <p>ControlCovid</p>
    </div>
    <navbar></navbar>
  </div>
</template>

<script>
import navbar from '../components/Navbar'
export default {
  name: 'Home',
  components: {
    navbar
  },
  data: () => ({
    token: $cookies.get("token"),
    nombre: $cookies.get("nombre"),
    apellido: $cookies.get("apellido"),
    rol: $cookies.get("rol"),
    idsistema: $cookies.get("idsistema")
  })
}
</script>

<style>

</style>