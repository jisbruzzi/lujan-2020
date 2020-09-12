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
                <q-iteon>{{opcion.descripcion}}</q-item-section>
            </q-item>
        </q-list>

 page>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decoraport { QForm } from 'quasar'
import textosReal from './textos.json'
import { formatear } from './formateador'
import { format } from 'path'
let textos:any = textosReal
@Component({
})
export default class Juego extends Vue {
  get id ():string {
    return this.historial[0] || '0';
  }

  get titulo () {
    return formatear((textos as any)[this.id].titulo, this.nombre)
  }

  get contenido () {
    return formatear((textos as any)[this.id].descripcion, this.nombre)
  }

  get opciones () {
    let opciones = (textos as any)[this.id].opciones
    return (opciones || []).map((o:any) => ({
      id: o.id,
      descripcion: formatear(o.descripcion, this.nombre)
    }))
    }
    @Prop() forma!:number;
    @Prop() vidaDeOracion!:number;
    @Prop() nombre!:string;
    @Prop() historial!:Array<string>;

    elegirOpcion (id:string) {
      this.$router.push({
 path: '/juego',
query: {
        forma: this.forma + "",
        vidaDeOracion: this.vidaDeOracion + "",
        nombre: this.nombre,
        historial: [id, ...this.historial]
      }
})
    }
}
</script>

<style>

</style>
