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
import Evoluciones from '@/views/Evoluciones'
import AgregarEvolucion from '@/views/AgregarEvolucion'
import AgregarInternacion from '@/views/AgregarInternacion'
import AgregarPaciente from '@/views/AgregarPaciente'
import AsignarMedico from '@/views/AsignarMedico'
import Alertas from '@/views/Alertas'
import HistorialAlertas from '@/views/HistorialAlertas'

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
    },
    {
      path: '/evoluciones/:id',
      name: 'Evoluciones',
      component: Evoluciones
    },
    {
      path: '/agregarevolucion/:id',
      name: 'AgregarEvolucion',
      component: AgregarEvolucion
    },
    {
      path: '/agregarinternacion/:id',
      name: 'AgregarInternacion',
      component: AgregarInternacion
    },
    {
      path: '/agregarPaciente',
      name: 'AgregarPaciente',
      component: AgregarPaciente
    },
    {
      path: '/asignarMedico/:id',
      name: 'AsignarMedico',
      component: AsignarMedico
    },
    {
      path: '/alertas',
      name: 'Alertas',
      component: Alertas,
      beforeEnter: authorization
    },
    {
      path: '/historialalertas',
      name: 'HistorialAlertas',
      component: HistorialAlertas,
      beforeEnter: authorization
    }
  ]
})
