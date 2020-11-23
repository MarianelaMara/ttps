import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import BuscarJefe from '@/views/BuscarJefe'
import BuscarMedico from '@/views/BuscarMedico'
import BuscarPaciente from '@/views/BuscarPaciente'
import VistaEmpleado from '@/views/VistaEmpleado'
import VistaPaciente from '@/views/VistaPaciente'
import Sistema from '@/views/VistaSistema'
import Sala from '@/views/VistaSala'

Vue.use(Router)

function authorization(to, from, next) {
  if(sessionStorage.token === undefined) {
    next('/');
  } else {
    next()
  }
}

export default new Router({
  mode:'history',
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
    },
    {
      path: '/buscarPaciente',
      name: 'BuscarPaciente',
      component: BuscarPaciente,
      beforeEnter: authorization
    },
    {
      path: '/buscarMedico',
      name: 'BuscarMedico',
      component: BuscarMedico,
      beforeEnter: authorization
    },
    {
      path: '/vistaEmpleado/:id',
      name: 'VistaEmpleado',
      component: VistaEmpleado,
      beforeEnter: authorization
    },
    {
      path: '/vistaPaciente/:id',
      name: 'VistaPaciente',
      component: VistaPaciente,
      beforeEnter: authorization
    },
    {
      path: '/sistema/:id',
      name: 'Sistema',
      component: Sistema,
      beforeEnter: authorization
    },
    {
      path: '/sala/:id',
      name: 'Sala',
      component: Sala,
      beforeEnter: authorization
    }
  ]
})
