import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import BuscarJefe from '@/views/BuscarJefe'

Vue.use(Router)

function authorization(to, from, next) {
  if(sessionStorage.token === undefined) {
    next('/');
  } else {
    next()
  }
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      beforeEnter: authorization
    },
    {
      path: '/buscarJefe',
      name: 'BuscarJefe',
      component: BuscarJefe,
      beforeEnter: authorization
    }
  ]
})
