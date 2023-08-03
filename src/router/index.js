import { createRouter, createWebHistory } from 'vue-router'

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
        path: '/ae',
        name: 'overview',
        component: () => import('@/views/overview'),
        children: [
          {
            path: '/ae/tissues',
            name: 'tissues',
            component: () => import('@/components/AeShow')
          }
        ]
      },
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
