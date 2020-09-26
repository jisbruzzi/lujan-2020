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
        props: route => {
          const estado = route.query.estado?.toString() || '{}'
          return {
            nombre: route.query.nombre,
            forma: route.query.forma,
            vidaDeOracion: route.query.vidaDeOracion,
            historial: route.query.historial || [],
            estado: (JSON.parse(estado) as Record<string, boolean|number>) || {},
            decisiones: route.query.decisiones || []
          }
        }
      },
      {
        path: '/resumen',
        component: () => import('pages/Resumen.vue'),
        props: route => ({ decisiones: route.query.decisiones })
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
