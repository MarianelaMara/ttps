<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');
* {
  box-sizing: border-box;
}
#app {
  font-family: 'Quicksand', sans-serif;
  
}
body{
  width: 100%;
  height: 100%;
  background-image: url(images/hospital.jpg);
  background-size: auto;
  backdrop-filter: blur(10px);  
  -webkit-backdrop-filter: blur(10px);
}
</style>
