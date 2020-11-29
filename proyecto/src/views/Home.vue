<template>
  <div>
    <Header></Header>
    <Navbar></Navbar>
    <div class="body">
      <p></p>
      <p></p>
      <p></p></div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import Header from '../components/Header'
export default {
  name: 'Home',
  components: {
    Navbar,
    Header
  }
}
</script>
<style>
</style>