<template>
  <q-page class="column items-center justify-evenly">
    <h3>{{titulo}}</h3>
    <div v-html="contenido"></div>
    <q-list bordered separator>
      <q-item
        clickable
        v-ripple
        v-for="opcion in opciones"
        :key="JSON.stringify(opcion)"
        @click.native="elegirOpcion(opcion.id,opcion.accion)"
        >
          <q-item-section v-html="opcion.descripcion"></q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import textosReal from './textos.json'
import { formatear } from './formateador'
type OpcionType={
  id:string,
  descripcion:string,
  accion?:string,
  condiciones?:Array<string>
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
  @Prop() estado!: Record<string, boolean>;
  get id ():string {
    return this.historial[0] || '0'
  }

  get titulo () {
    return formatear(textos[this.id].titulo, this.nombre)
  }

  get contenido () {
    return formatear(textos[this.id].descripcion, this.nombre)
  }

  get opciones () {
    const opciones = textos[this.id].opciones
    return (opciones || []).filter((o:OpcionType) => {
      return o.condiciones?.every(c => Object.keys(this.estado).includes(c)) || (!o.condiciones)
    }).map((o:OpcionType) => ({
      id: o.id,
      descripcion: formatear(o.descripcion, this.nombre),
      accion: o.accion
    }))
  }

  @Prop() forma!:number;

  @Prop() vidaDeOracion!:number;

  @Prop() nombre!:string;

  @Prop() historial!:Array<string>;

  async elegirOpcion (id:string, accion:string|undefined) {
    await this.$router.push({
      path: '/juego',
      query: {
        forma: `${this.forma}`,
        vidaDeOracion: `${this.vidaDeOracion}`,
        nombre: this.nombre,
        historial: [id, ...this.historial],
        estado: this.siguienteEstado(accion)
      }
    })
  }

  siguienteEstado (accion: string|undefined): string|(string|null)[]|null|undefined {
    const estado:Record<string, boolean> = this.estado
    if (accion) {
      estado[accion] = true
    }
    return JSON.stringify(estado)
  }
}
</script>

<style>

</style>
