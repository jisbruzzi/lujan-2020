<template>
  <q-page class="row items-center justify-evenly q-pa-md">
    <div>
      <h2>Vamos a Luján</h2>
      <p><i>Madre, abrazanos. Queremos seguir caminando.</i></p>
      <q-form class="q-gutter-md" ref="form-datos">
        <q-input
          v-model="nombre"
          label="Tu nombre"
          :rules="[ val => (val && val.length>0) || 'Escribí tu nombre']"
        />
        <q-select
          v-model="forma"
          :options="opcionesForma"
          label="Forma física"
          :rules="[ val => val || 'Elegí una opción']"
        />
        <q-select
          v-model="vidaDeOracion"
          :options="opcionesVidaDeOracion"
          label="Vida de oración"
          :rules="[ val => val || 'Elegí una opción']"
        />
        <q-input
          v-model="intencion"
          label="Intención"
          hint="¿Por qué intención ofrecés la peregrinación?"
          :rules="[ val => (val && val.length>0) || 'No olvides la intención']"
        />
      <div>
        <q-btn label="empezar" color="primary" @click="empezar"/>
      </div>
      </q-form>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { QForm } from 'quasar'

type SelectType = {
  label:string,
  value:number
}

@Component({
})
export default class PageIndex extends Vue {
  intencion:string|null=null
  forma:SelectType|null=null
  get opcionesForma ():Array<SelectType> {
    return [
      { label: 'Muy buena forma', value: 1 },
      { label: 'Camino bastante', value: 2 },
      { label: 'Cristiano de sillón', value: 3 }
    ]
  }

  vidaDeOracion:SelectType|null=null

  get opcionesVidaDeOracion ():Array<SelectType> {
    return [
      { label: 'Comunión diaria', value: 1 },
      { label: 'Rezo todos los días', value: 2 },
      { label: 'Sólo misa', value: 3 },
      { label: 'Cada tanto rezo', value: 4 }
    ]
  }

  nombre:string|null=null;

  async empezar () {
    const valido = await (this.$refs['form-datos'] as QForm).validate()
    const query = {
      forma: this.forma?.value?.toString() || null,
      vidaDeOracion: this.vidaDeOracion?.value?.toString() || null,
      nombre: this.nombre
    }
    if (valido) {
      await this.$router.push({ path: '/juego', query })
    }
  }
}
</script>
