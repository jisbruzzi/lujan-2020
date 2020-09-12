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
                @click="elegirOpcion(opcion)"
                >
                <q-item-section>{{opcion.descripcion}}</q-item-section>
            </q-item>
        </q-list>
        
    </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { QForm } from 'quasar'

@Component({
})
export default class Juego extends Vue {
    titulo="holis"
    contenido="holis\nholis holis holis"
    opciones=[
        {
            id:1,
            descripcion:"ir a 1"
        },
        {
            id:2,
            descripcion:"ir a dos"
        },
        {
            id:3,
            descripcion:"ir a 3333333333"
        }
    ]
    elegirOpcion(opcion:any){
        this.$router.push("/juego/asdasd")
    }
}
</script>

<style>

</style>