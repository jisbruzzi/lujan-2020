<template>
  <q-page class="column items-center justify-evenly q-ma-md">
    <h3>Tramo Rodriguez-Luján</h3>
    <div v-html="contenido"></div>
    <div class="full-width">
      <p>Fuerzas físicas</p>
      <q-linear-progress stripe size="10px" :value="energia" />
    </div>
    <div class="full-width">
      <p>Espiritualidad</p>
      <q-linear-progress stripe size="10px" :value="oracion" />
    </div>
    <div class="full-width">
      <p>Distancia a Luján: {{distanciaLujan*19.4}} km</p>
      <q-linear-progress stripe size="10px" :value="distanciaLujan" />
    </div>
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      :duration="8000"
    >
    <div class="full-width" v-if="mostrarTiempo">
      <p>Tiempo faltante para que puedan pasar a buscarte: {{tiempoFaltante}}</p>
      <q-linear-progress stripe size="10px" :value="tiempoFaltantePorcentaje" />
    </div>
    </transition>
    <q-list bordered separator>
      <q-item clickable v-ripple @click="meQuedo">
          <q-item-section>Me quedo acá</q-item-section>
      </q-item>
      <q-item clickable v-ripple @click="rezar">
          <q-item-section>Rezar un Ave María</q-item-section>
      </q-item>
      <q-item clickable v-ripple @click="darPaso" :disable="oracion<0.1">
          <q-item-section>Dar un paso</q-item-section>
      </q-item>
      <q-item clickable v-ripple @click="correr" :disable="energia<0.3">
          <q-item-section>CORRER</q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import fuerzas from './fuerzas.json'
@Component
export default class Endgame extends Vue {
  @Prop() decisiones!:Array<string>
  @Prop() energia!:number
  @Prop() oracion!:number
  @Prop() nombre!:string
  @Prop() mostrarTiempo!:boolean
  @Prop() distanciaLujan!:number
  @Prop() tiempoLlegada!:number
  contenido = ''

  mounted () {
    this.contenido = fuerzas[Math.floor(fuerzas.length * Math.random())]
    window.setInterval(() => {
      this.datenow = Date.now()
    }, 1000)
  }

  datenow:number = Date.now()

  get tiempoFaltante ():string {
    const segundosTotales = Math.floor((this.tiempoLlegada - this.datenow) / 1000)
    if (segundosTotales <= 0) {
      return "ya te pueden pasar a buscar"
    }
    const minutos = Math.floor(segundosTotales / 60)
    const segundos = segundosTotales - 60 * minutos
    const segundosTxt = (segundos < 10) ? '0' + segundos.toString() : segundos.toString()
    return minutos.toString() + ':' + segundosTxt
  }

  get tiempoFaltantePorcentaje ():number {
    return (this.tiempoLlegada - this.datenow) / (5 * 60 * 1000) // 2 mins
  }

  async darPaso () {
    await this.avanzar('Dar un paso', -0.1, -0.1, -0.04, this.mostrarTiempo)
  }

  async correr () {
    await this.avanzar('Correr', -0.5, -0.1, -0.2, this.mostrarTiempo)
  }

  async rezar () {
    await this.avanzar('Rezar un Ave Maria', 0, 0.1, 0, this.mostrarTiempo)
  }

  async meQuedo () {
    if (this.tiempoFaltantePorcentaje <= 0) {
      await this.$router.push({
        path: '/resumen',
        query: {
          decisiones: this.decisiones
        }
      })
    } else {
      await this.avanzar('Me quedo', 0, 0, 0, true)
    }
  }

  async avanzar (decision:string, dEnergia:number, dOracion:number, dLujan:number, mostrarTiempo:boolean) {
    this.contenido = fuerzas[Math.floor(fuerzas.length * Math.random())]
    if (this.distanciaLujan + dLujan <= 0) {
      await this.$router.push({
        path: '/lujan',
        query: {
          decisiones: [...this.decisiones, decision]
        }
      })
    } else {
      await this.$router.push({
        path: '/endgame',
        query: {
          decisiones: [...this.decisiones, decision],
          energia: Math.max(this.energia + dEnergia, 0).toString(),
          oracion: Math.max(this.oracion + dOracion, 0).toString(),
          nombre: this.nombre,
          distanciaLujan: (this.distanciaLujan + dLujan).toString(),
          mostrarTiempo: mostrarTiempo.toString(),
          tiempoLlegada: this.tiempoLlegada.toString()
        }
      })
    }
  }
}
</script>

<style>

</style>
