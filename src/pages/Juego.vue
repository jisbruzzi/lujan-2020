<template>
  <q-page class="column items-center justify-evenly q-ma-md q-gutter-lg">
    <h3>{{titulo}}</h3>
    <div v-html="contenido"></div>
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      :duration="8000"
    >
    <div class="full-width" v-if="mostrarEnergia">
      <p>Fuerzas físicas</p>
      <q-linear-progress stripe size="10px" :value="energia" />
    </div>
    </transition>
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      :duration="8000"
    >
    <div class="full-width" v-if="mostrarOracion">
      <p>Espiritualidad</p>
      <q-linear-progress stripe size="10px" :value="oracion" />
    </div>
    </transition>
    <q-list bordered separator>
      <q-item
        :clickable="opcion.habilitado"
        :disable="!opcion.habilitado"
        v-ripple
        v-for="opcion in opciones"
        :key="JSON.stringify(opcion)"
        @click="elegirOpcion(opcion.id,opcion.accion,opcion.descripcion)"
        >
          <q-item-section v-html="opcion.descripcion"></q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import textosReal from './textos.json'
import { formatear, ampollado } from './formateador'

type CondicionType = string
// 'medalla' | 'cruz' | 'rosario' | 'puede-caminar' | 'no-ampollado' | 'ampollado' | 'puede-bailar' | 'buen-humor' | 'excelente-humor'
interface CambioEstadoType {
  energia?:number,
  oracion?:number
}
interface OpcionType {
  id:string,
  descripcion:string,
  accion?:string|CambioEstadoType,
  condiciones?:Array<CondicionType>
}
type TextosType={
  [id:string]:{
    titulo:string,
    descripcion:string,
    opciones?:Array<OpcionType>
  }
};

const textos:TextosType = textosReal
@Component({
})
export default class Juego extends Vue {
  @Prop() estado!: Record<string, boolean|number>;
  get id ():string {
    return this.historial[0] || '0'
  }

  get titulo () {
    return formatear(textos[this.id].titulo, this.nombre)
  }

  get contenido () {
    return formatear(textos[this.id].descripcion, this.nombre)
  }

  get ampollado ():boolean {
    if (ampollado(this.nombre)) {
      return this.energia < 0.5
    } else {
      return this.energia < 0.25
    }
  }

  cumple (condicion:CondicionType):boolean {
    type CallableType = ()=>boolean
    const conds = new Map<string, CallableType >([
      ['puede-caminar', () => this.energia > 0],
      ['no-ampollado', () => !this.ampollado],
      ['ampollado', () => this.ampollado],
      ['puede-bailar', () => this.energia > 0.6],
      ['buen-humor', () => this.oracion > 0.1],
      ['excelente-humor', () => this.oracion > 0.3]
    ])
    return Object.keys(this.estado).includes(condicion) || conds.get(condicion)?.call(this) || false
  }

  get opciones () {
    const opciones = textos[this.id].opciones
    return (opciones || []).map((o:OpcionType) => ({
      id: o.id,
      descripcion: formatear(o.descripcion, this.nombre),
      accion: o.accion,
      habilitado: o.condiciones?.some(c => this.cumple(c)) || (!o.condiciones)
    }))
  }

  @Prop() forma!:number;

  @Prop() vidaDeOracion!:number;

  @Prop() nombre!:string;

  @Prop() historial!:Array<string>;

  @Prop() decisiones!:Array<string>;

  async elegirOpcion (id:string, accion:string|undefined|CambioEstadoType, descripcion:string) {
    if (accion === 'fin') {
      await this.$router.push({
        path: '/resumen',
        query: {
          decisiones: this.decisiones
        }
      })
    } else if (accion === 'endgame') {
      await this.$router.push({
        path: '/endgame',
        query: {
          decisiones: this.decisiones,
          energia: this.energia.toString(),
          oracion: this.oracion.toString(),
          nombre: this.nombre,
          distanciaLujan: (1).toString(),
          mostrarTiempo: false.toString(),
          tiempoLlegada: (Date.now() + 1000 * 60 * 5).toString() // 2 mins
        }
      })
    } else {
      let decisiones!:Array<string>
      if (this.opciones.filter(o => o.habilitado).length > 1) {
        decisiones = [...this.decisiones, descripcion]
      } else {
        decisiones = [...this.decisiones]
      }
      await this.$router.push({
        path: '/juego',
        query: {
          forma: `${this.forma}`,
          vidaDeOracion: `${this.vidaDeOracion}`,
          nombre: this.nombre,
          historial: [id, ...this.historial],
          estado: this.siguienteEstado(accion),
          decisiones
        }
      })
    }
  }

  siguienteEstado (accion: string|undefined|CambioEstadoType): string {
    const estado:Record<string, boolean|number> = this.estado
    if (accion) {
      if (typeof accion === 'string') {
        estado[accion] = true
      } else {
        estado.energia = +(estado.energia || 0) + (accion.energia || 0)
        estado.oracion = +(estado.oracion || 0) + (accion.oracion || 0)
      }
    }
    return JSON.stringify(estado)
  }

  get energia ():number {
    return ((3 - this.forma) * 3 + 10 + (+this.estado.energia || 0)) / 19
  }

  get mostrarEnergia ():boolean {
    return (this.estado.energia || 0) !== 0
  }

  get oracion ():number {
    return ((4 - this.vidaDeOracion) + (+this.estado.oracion || 0)) / 25
  }

  get mostrarOracion ():boolean {
    return (this.estado.oracion || 0) !== 0
  }
}
</script>

<style>

</style>
