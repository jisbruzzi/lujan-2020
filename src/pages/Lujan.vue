<template>
  <q-page class="column items-center justify-evenly q-ma-md q-gutter-md">
    <h3>¡Llegaste a Luján!</h3>
    <div v-if="caminando">
      <p>No tengo una explicación racional para esto.</p>
    </div>
    <div v-else>
      <p>No llegaste a pié, pero llegaste, y mamá está contenta.</p>
    </div>
    <q-img src="/llegada2019.jpg" />
    <q-list bordered separator>
      <q-item clickable v-ripple
        @click="resumen"
        >
          <q-item-section>Recordemos cómo...</q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component
export default class Resumen extends Vue {
  @Prop() decisiones!:Array<string>
  @Prop() caminando!:boolean
  async resumen () {
    await this.$router.push({
      path: '/resumen',
      query: {
        decisiones: this.decisiones
      }
    })
  }
}
</script>

<style>

</style>
