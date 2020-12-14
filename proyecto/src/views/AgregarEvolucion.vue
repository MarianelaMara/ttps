<template>
    <div>
        <Header></Header>
        <NavbarPerfil></NavbarPerfil>
        <div v-if="ev">
          <b-card>
            <template #header>
              <b-navbar class="ml-auto">
                <b-navbar-nav class="ml-auto">
                  <b-nav-item href="#" v-on:click="verpaciente()">Ver Paciente</b-nav-item>
                </b-navbar-nav>
              </b-navbar>
            </template>
          </b-card>
          <b-alert show dismissible variant="success"> Se agregó con éxito la evolución
          </b-alert>
        </div>
        <div v-else>
            <b-card>
                <template #header>
                    <b-navbar-brand tag="h4" class="mb-0">Agregar Evolución</b-navbar-brand>
                </template>
                <div class="col-sm-6 mx-auto">
                  <b-form @submit.prevent="agregar" class="border p-3">
                    <h6><b>Signos Vitales</b></h6>
                    <b-form-group label-cols="3" label-cols-lg="3" label="Temperatura:">
                      <b-form-input type="text" v-model="temperatura" :required="true"></b-form-input>                    
                    </b-form-group>
                    <b-form-group  label-cols="3" label-cols-lg="3" label="TA Sistolica:">
                      <b-form-input type="text" v-model="tasistolica" :required="true"></b-form-input>                    
                    </b-form-group>
                    <b-form-group  label-cols="3" label-cols-lg="3" label="TA Diastolica:">
                      <b-form-input type="text" v-model="tadiastolica" :required="true"></b-form-input>                    
                    </b-form-group>
                    <b-form-group  label-cols="3" label-cols-lg="3" label="FC:">
                      <b-form-input type="text" v-model="fc" :required="true"></b-form-input>                    
                    </b-form-group> 
                    <b-form-group  label-cols="3" label-cols-lg="3" label="FR:">
                      <b-form-input type="text" v-model="fr" :required="true"></b-form-input>                    
                    </b-form-group>
                    <h6><b>Sistema Respiratorio</b></h6>
                    <b-form-group label-cols="3" label-cols-lg="4" label="Mecánica ventilatoria"> 
                      <b-form-select v-model="mecanicaventilatoria" :options = "['Buena', 'Regular', 'Mala']" :required="true"></b-form-select>
                    </b-form-group>
                    <b-form-group label-cols="3" label-cols-lg="3" label="Requiere oxígeno">
                      <toggle-button color="black" :sync="true" v-model="oxigeno"/>
                    </b-form-group>
                    <b-form-group v-if="oxigeno=== true" label-cols="3" label-cols-lg="3" label="Tipo"> 
                      <b-form-select v-model="tipo" :options = "['Canula nasal', 'Máscara con reservorio']" :required="true"></b-form-select>
                    </b-form-group>
                    <b-form-group v-if="(tipo=== 'Canula nasal')&& (oxigeno===true) " label-cols="3" label-cols-lg="3" label="Litros por minuto"> 
                      <b-form-select v-model="litros" :options = "[1, 2, 3, 4, 5, 6]" :required="true"></b-form-select>
                    </b-form-group>
                    <b-form-group v-if="(tipo=== 'Máscara con reservorio') && (oxigeno===true)" label-cols="3" label-cols-lg="3" label="Porcentaje oxígeno"> 
                      <b-form-input type="text" v-model="porcentaje" placeholder="Valor entre 1 y 100" :required="true"></b-form-input>
                    </b-form-group>
                    <b-form-group v-if="oxigeno=== true" label-cols="3" label-cols-lg="3" label="Saturación:">
                      <b-form-input type="text" v-model="saturacion" :required="true"></b-form-input>                    
                    </b-form-group>
                    <b-form-group v-if="oxigeno=== true" label-cols="3" label-cols-lg="3" label="PaFi">
                      <toggle-button color="black" :sync="true" v-model="pafi"/>
                    </b-form-group>
                     <b-form-group v-if="pafi=== true" label-cols="3" label-cols-lg="3" label="Valor PaFi:">
                      <b-form-input type="text" v-model="valorpafi" :required="true"></b-form-input>                    
                    </b-form-group> 
                    <b-form-group v-if="oxigeno=== true" label-cols="3" label-cols-lg="3" label="Prono vigil">
                      <toggle-button color="black" :sync="true" v-model="pronovigil"/>
                    </b-form-group>
                    <b-form-group v-if="oxigeno=== true" label-cols="3" label-cols-lg="3" label="Tos">
                      <toggle-button color="black" :sync="true" v-model="tos"/>
                    </b-form-group>
                     <b-form-group v-if="oxigeno=== true" label-cols="3" label-cols-lg="3" label="Disnea"> 
                      <b-form-select v-model="disnea" :options = "[1, 2, 3, 4]" :value= "null" :required="true"></b-form-select>
                    </b-form-group>
                    <b-form-group v-if="oxigeno=== true" label-cols="3" label-cols-lg="3" label="Estabilidad">
                      <toggle-button color="black" :sync="true" v-model="estabilidad"/>
                    </b-form-group>
                    <h6><b>Otros síntomas</b></h6>
                    <b-form-group label-cols="3" label-cols-lg="3" label="Somnolencia">
                      <toggle-button color="black" :sync="true" v-model="somnolencia"/>
                    </b-form-group>
                    <b-form-group label-cols="3" label-cols-lg="3" label="Anosmia">
                      <toggle-button color="black" :sync="true" v-model="anosmia"/>
                    </b-form-group>
                    <b-form-group label-cols="3" label-cols-lg="3" label="Disgeusia">
                      <toggle-button color="black" :sync="true" v-model="disgeusia"/>
                    </b-form-group>
                    <h6><b>Observación</b></h6>
                    <b-form-textarea v-model= "observacion" rows = "2" max-rows = "6"></b-form-textarea>
                    <div v-if="idsistema === 3">
                    <h6><b>Síntomas de UTI</b></h6>
                    <b-form-group label-cols="3" label-cols-lg="3" label="ARM">
                      <toggle-button color="black" :sync="true" v-model="arm"/>
                    </b-form-group>
                    <b-form-group v-if="arm=== true" label-cols="3" label-cols-lg="3" label="Descripción">
                      <b-form-textarea v-model="armdescripcion" rows = "2" max-rows = "6"></b-form-textarea>
                    </b-form-group>
                    <b-form-group label-cols="3" label-cols-lg="3" label="Traqueotomía">
                      <toggle-button color="black" :sync="true" v-model="traqueotomia"/>
                    </b-form-group>
                    <b-form-group label-cols="3" label-cols-lg="3" label="Vasopresores">
                      <toggle-button color="black" :sync="true" v-model="vasopresores"/>
                    </b-form-group>
                    <b-form-group v-if="vasopresores=== true" label-cols="3" label-cols-lg="3" label="Descripción">
                      <b-form-textarea v-model="vasopresoresdescripcion" rows = "2" max-rows = "6"></b-form-textarea>
                    </b-form-group>
                    </div>
                    <div class="text-center">
                      <b-button type="submit" variant="secondary">Guardar</b-button>
                    </div>
                  </b-form>
                </div>
            </b-card>
        </div>
    </div>
</template>

<script>
import NavbarPerfil from '../components/NavbarPerfil'
import Header from '../components/Header'
import axios from 'axios'; 
export default {
    name: 'AgregarEvolucion',
  components: {
    NavbarPerfil,
    Header
  },
  data: () => ({
    idsistema: '',
    idinternacion: '',
    fechasintomas: '',
    fc: '',
    fr: '',
    temperatura: '',
    tasistolica: '',
    tadiastolica: '',
    mecanicaventilatoria: '',
    oxigeno: false,
    tipo: '',
    litros: 0,
    porcentaje:0,
    saturacion: 0,
    tos: false,
    pafi: false,
    valorpafi: 0,
    pronovigil: false,
    disnea: 0,
    estabilidad: false,
    somnolencia: false,
    anosmia: false,
    disgeusia: false,
    observacion: '',
    arm: false,
    armdescripcion: '',
    traqueotomia: false,
    vasopresores: false,
    vasopresoresdescripcion: '',
    ev:false,
    satAnterior: '' 
  }),
   mounted () {
    axios
      .get('http://localhost:3000/paciente/'+ this.$route.params.id, {headers: { "user_token": sessionStorage.token }})
      .then(response => {
        this.idsistema= response.data.idsistema
      })
      .catch(error => {
        
    });
    axios
      .get('http://localhost:3000/internacion/'+ this.$route.params.id, {headers: { "user_token": sessionStorage.token }})
      .then(response => {
        this.idinternacion= response.data.idinternacion,
        this.fechasintomas= response.data.fechasintomas,
        axios .get('http://localhost:3000/ultimaevolucion/'+ this.idinternacion, {headers: { "user_token": sessionStorage.token }})
        .then(response => {
        this.temperatura= response.data.temperatura,
        this.tasistolica= response.data.tasistolica,
        this.tadiastolica= response.data.tadiastolica,
        this.fc= response.data.fc,
        this.fr= response.data.fr,
        this.mecanicaventilatoria= response.data.mecanicaventilatoria,      
        this.tipo= response.data.tipo,
        this.litros= response.data.litros,
        this.porcentaje= response.data.porcentaje,
        this.saturacion= response.data.saturacion,
        this.satAnterior= response.data.saturacion,
        this.valorpafi= response.data.valorpafi,
        this.disnea= response.data.disnea,
        this.observacion= response.data.observacion,
        this.armdescripcion= response.data.armdescripcion,
        this.vasopresoresdescripcion= response.data.vasopresoresdescripcion;
         if (response.data.vasopresores === 1){
          this.vasopresores= true
        }
         if (response.data.traqueotomia === 1){
          this.traqueotomia= true
        }
         if (response.data.arm === 1){
          this.arm= true
        }
         if (response.data.oxigeno === 1){
          this.oxigeno= true
        }
          if (response.data.tos === 1){
          this.tos= true
        }
         if (response.data.pafi === 1){
          this.pafi= true
        }
         if (response.data.pronovigil === 1){
          this.pronovigil= true
        }
         if (response.data.estabilidad === 1){
          this.estabilidad= true
        }
         if (response.data.anosmia === 1){
          this.anosmia= true
        }
         if (response.data.disgeusia === 1){
          this.disgeusia= true
        }
         if (response.data.somnolencia === 1){
          this.somnolencia= true
        }
      })
      })
      .catch(error => {
        
    });
  },
  methods: {
    agregar(){     
        axios.post('http://localhost:3000/evolucion', {idsistema: this.idsistema, idinternacion: this.idinternacion, idpersonal: sessionStorage.idempleado, temperatura: this.temperatura, tasistolica: this.tasistolica, tadiastolica: this.tadiastolica, fc: this.fc, fr: this.fr , mecanicaventilatoria: this.mecanicaventilatoria , oxigeno: this.oxigeno, tipo: this.tipo, litros: this.litros, porcentaje: this.porcentaje, saturacion: this.saturacion, pafi: this.pafi, valorpafi: this.valorpafi, pronovigil: this.pronovigil, tos: this.tos, disnea: this.disnea, estabilidad: this.estabilidad, somnolencia: this.somnolencia, anosmia: this.anosmia, disgeusia: this.disgeusia, observacion: this.observacion, arm: this.arm, armdescripcion: this.armdescripcion, traqueotomia: this.traqueotomia, vasopresores: this.vasopresores, vasopresoresdescripcion: this.vasopresoresdescripcion , satAnterior: this.satAnterior, fechasintomas: this.fechasintomas, idpaciente:  this.$route.params.id }, {headers: { "user_token": sessionStorage.token }})
        .then(response => {
            this.ev= true;
        })
        .catch(error => {
        });
    },  
    verpaciente() {
      this.$router.push('/vistaPaciente/'+this.$route.params.id);
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');
.vue-tempalte
 {
  width: 100%;
  height: 100%;
}
.vue-tempalte{
  display: flex;
  align-items: center;
  justify-content: center;
}
.form{
  background-color: white;
}


</style>
