const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('../pages/gamePage.vue') },
      { path: '/game', component: () => import('../pages/gamePage.vue') },
      { path: '/scores', component: () => import('../pages/scorePage.vue') },
      { path: '/register', component: () => import('pages/registerPage.vue') },
      { path: '/login', component: () => import('pages/loginPage.vue') }

    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
