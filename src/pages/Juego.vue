<template>
  <q-page class="column items-center justify-evenly">
    <h3>{{titulo}}</h3>
    <p>{{contenido}}</p>
    <q-list bordered separator>
      <q-item
        clickable
        v-ripple
        v-for="opcion in opciones"
        :key="opcion.id"
        @click.native="elegirOpcion(opcion.id)"
        >
          <q-item-section>{{opcion.descripcion}}</q-item-section>
      </q-item>
    </q-list>
  <q-page>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import textosReal from './textos.json'
import { formatear } from './formateador'
type OpcionType={
  id:number,
  descripcion:string
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
    return (opciones || []).map((o:OpcionType) => ({
      id: o.id,
      descripcion: formatear(o.descripcion, this.nombre)
    }))
  }

  @Prop() forma!:number;

  @Prop() vidaDeOracion!:number;

  @Prop() nombre!:string;

  @Prop() historial!:Array<string>;

  async elegirOpcion (id:string) {
    await this.$router.push({
      path: '/juego',
      query: {
        forma: `${this.forma}`,
        vidaDeOracion: `${this.vidaDeOracion}`,
        nombre: this.nombre,
        historial: [id, ...this.historial]
      }
    })
  }
}
</script>

<style>

</style>
