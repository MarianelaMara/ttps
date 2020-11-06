<template>
  <div>
    <Header></Header>
    <Navbar></Navbar>
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
body {
  
  width: 100%;
  height: 100%;
}

</style>