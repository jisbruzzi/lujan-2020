<template>
  <q-page class="row items-center justify-evenly">
    <div>
      <h2>Vamos a Luján</h2>
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

@Component({
})
export default class PageIndex extends Vue {
  forma=null
  get opcionesForma () {
    return [
      { label: 'Muy buena forma', value: 1 },
      { label: 'Camino bastante', value: 2 },
      { label: 'Cristiano de sillón', value: 3 }
    ]
  }

  vidaDeOracion=null

  get opcionesVidaDeOracion () {
    return [
      { label: 'Comunión diaria', value: 1 },
      { label: 'Rezo todos los días', value: 2 },
      { label: 'Sólo misa', value: 2 },
      { label: 'Cada tanto rezo', value: 3 }
    ]
  }

  nombre=null;

  empezar () {
    (this.$refs['form-datos'] as QForm).validate().then(valido => {
      if (valido) {
        this.$router.push({
          path: '/juego',
          query: {
            forma: this.forma.value,
            vidaDeOracion: this.vidaDeOracion.value,
            nombre: this.nombre
          }
        })
      }
    })
  }
}
</script>
