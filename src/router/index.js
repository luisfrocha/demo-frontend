import { createRouter, createWebHistory } from 'vue-router';

export const routes = [
  {
    path: '/admin',
    component: () => import('../pages/Admin.vue'),
    name: 'admin',
    meta: { title: 'Administra Ligas' },
    children: [
      {
        path: '',
        component: () => import('../components/LeagueManager.vue'),
        name: 'league-selector',
        meta: { title: 'Seleccionar Liga' },
      },
      {
        path: ':league',
        component: () => import('../components/LeagueManager.vue'),
        name: 'league-editor',
        meta: { title: 'Ligas' },
        children: [
          {
            path: '',
            component: () => import('../components/SeasonManager.vue'),
            name: 'season-selector',
            meta: { title: 'Selecciona Temporada' },
            children: [
              {
                path: '',
                component: () => import('../components/SeasonContainer.vue'),
                name: 'season-container',
                meta: { title: 'Seleccionando temporada' },
              },
            ],
          },
          {
            path: 'teams',
            component: () => import('../components/SeasonManager.vue'),
            name: 'league-teams-editor',
            meta: { title: 'Editor de equipos' },
            children: [
              {
                path: '',
                component: () => import('../components/TeamManager.vue'),
                name: 'teams-editor',
                meta: { title: 'Editor de equipos' },
              },
            ],
          },
          {
            path: ':season',
            component: () => import('../components/SeasonManager.vue'),
            name: 'season-editor',
            meta: { title: 'Editando Temporada' },
            children: [
              {
                path: '',
                component: () => import('../components/SeasonContainer.vue'),
                name: 'season-selector-2',
                meta: { title: 'Editando Temporada' },
                children: [
                  {
                    path: ':matchday?',
                    component: () => import('../components/MatchDayManager.vue'),
                    name: 'matchday-manager',
                    meta: { title: 'Selecciona Jornada' },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '',
    component: () => import('../components/PasswordReset.vue'),
    name: 'password_reset',
    beforeEnter(to, _from, next) {
      if (to.query.type === 'recovery') {
        next();
      } else {
        next({ name: 'matches', query: to.query });
      }
    },
    meta: { hideInMenu: true, title: 'Cambiar Contraseña' },
  },
  {
    path: '/',
    navPath: '/',
    component: () => import('../pages/Home.vue'),
    name: 'Home',
    meta: { title: 'Ligas' },
  },
  {
    path: '/',
    navPath: '/',
    component: () => import('../pages/Home.vue'),
    name: 'matches',
    meta: { title: 'Partidos' },
    children: [
      {
        path: ':league',
        component: () => import('../components/Wrapper.vue'),
        name: 'league-selected',
        meta: { title: 'Liga' },
        children: [
          {
            path: ':season',
            component: () => import('../components/Wrapper.vue'),
            name: 'season-wrapper',
            meta: { title: 'Temporada' },
            children: [
              {
                path: '',
                component: () => import('../components/MatchdayViews/MatchDay.vue'),
                name: 'season-wrapper-main',
              },
              {
                path: ':matchday',
                component: () => import('../components/MatchdayViews/MatchDay.vue'),
                name: 'matchday-selector',
                meta: { title: 'Jornada' },
                children: [
                  {
                    path: '',
                    name: 'position_table',
                    component: () => import('../components/MatchdayViews/Table.vue'),
                    meta: { title: 'Tabla General' },
                  },
                  {
                    path: 'posicion',
                    name: 'position_graph',
                    component: () => import('../components/MatchdayViews/Positions.vue'),
                    meta: { title: 'Posición' },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
