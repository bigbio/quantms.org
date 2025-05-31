import { createRouter,createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../layout'),
    children: [
      {
        path: '/datasets',
        name: 'information',
        component: () => import('@/views/information')
      },
      {
        path: '/baseline',
        name: 'overview',
        component: () => import('@/views/overview'),
        children: [
          {
            path: '/baseline/tissues',
            name: 'tissues',
            component: () => import('@/components/AeShow')
          },
          {
            path: '/baseline/cellline',
            name: 'cellline',
            component: () => import('@/components/AeShow')
          }
        ]
      },
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/publications',
        name: 'publications',
        component: () => import('@/views/publications')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
