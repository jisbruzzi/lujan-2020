<template>
  <q-page class="column justify-evenly q-ma-md">
      <h3>Las decisiones que tomaste:</h3>
      <p v-for="(decision,index) in decisiones" :key="index">{{decision}}</p>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component
export default class Resumen extends Vue {
  @Prop() decisiones!:Array<string>
}
</script>

<style>

</style>
