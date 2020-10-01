<template>
  <q-page class="column items-center justify-evenly q-ma-md">
    <h3>¿Llegaste a Luján!</h3>
    <div>
        <p>No tengo una explicación racional para esto</p>
    </div>
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
