import { createRouter, createWebHistory } from 'vue-router';
import SearchRes from '~/components/SearchRes.vue';

const routes = [
    {
        path: '/search-result/:resultId',
        name: 'SearchRes',
        component: SearchRes,
        props: (route) => ({ result: route.params.result }),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;