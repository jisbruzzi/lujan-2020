import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        path: 'juego',
        component: () => import('pages/Juego.vue'),
        props: route => ({
          nombre: route.query.nombre,
          forma: route.query.forma,
          vidaDeOracion: route.query.vidaDeOracion,
          historial: route.query.historial || []
        })

      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
