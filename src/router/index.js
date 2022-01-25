import {createRouter, createWebHistory} from 'vue-router';

export const routes = [
  {
    path: '/admin',
    component: () => import('../pages/admin/Admin.vue'),
    name: 'admin',
    meta: {title: 'Administra tus Ligas'},
    children: [
      {
        path: '',
        component: ()=>import('../components/LeagueManager.vue'),
        name: 'league-selector',
        meta: { title: 'Seleccionar Liga'},
        children: [
          {
            path: ':league?',
            component: () => import('../components/SeasonContainer.vue'),
            name: 'league',
            meta: {title: 'Editando Liga'},
            children: [
              {
                path: '',
                component: ()=>import('../components/SeasonManager.vue'),
                name: 'season-editor',
                meta: { title: 'Editando Temporadas'}
              },
              {
                path: 'teams',
                component: ()=>import('../components/TeamManager.vue'),
                name: 'team-editor',
                meta: { title: 'Editando Equipos'}
              },
              {
                path: ':season?',
                component: () => import('../components/MatchDayManager.vue'),
                name: 'Temporada',
                meta: {title: 'Editando Temporada'},
                children: [
                  {
                    path: ':matchday?',
                    component: ()=>import('../components/MatchManager.vue'),
                    name: 'matches',
                    meta: { title: 'Editar Partidos' },
                  }
                ]
              }
            ]
          }
        ]
      },
    ]
  },
  {
    path: '',
    component: () => import('../components/PasswordReset.vue'),
    name: 'password_reset',
    beforeEnter(to, _from, next) {
      if (to.query.type === 'recovery') {
        next();
      } else {
        next({name: 'matches', query: to.query});
      }
    },
    meta: { hideInMenu: true, title: 'Cambiar Contraseña' }
  },
  {
    path: '/:league?/:season?',
    navPath: '/',
    component: () => import('../pages/Matches.vue'),
    name: 'matches',
    meta: { title: 'Partidos' },
    children: [

    ]
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
