import {createRouter, createWebHistory } from 'vue-router';

export const routes = [
  {path:'/', component: ()=>import('../pages/Matches.vue'), name: 'Partidos', meta: {title: 'Partidos'}},
  {
    path:'/admin',
    component: ()=>import( '../pages/admin/Admin.vue' ),
    name: 'Administración',
    meta: { title: 'Administra tus Ligas'},
    children: [
      {
        path: ':league',
        component: ()=>import('../components/SeasonManager.vue'),
        name: 'Liga',
        meta: { title: 'Editando Liga' },
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
