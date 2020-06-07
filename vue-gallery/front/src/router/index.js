import Vue from 'vue';
import VueRouter from 'vue-router';
import MyView from '../pages/MyView.vue';
import GalleryView from '../pages/GalleryView.vue';
import SearchView from '../pages/SearchView.vue';
Vue.use(VueRouter);

export const router = new VueRouter({
    mode:'history',
    routes: [
        {
            path: '/',
            component: GalleryView
        },
        {
            path: '/myview',
            component: MyView
        },
        {
            path: '/gallery',
            component: GalleryView
        },
        {
            path: '/search',
            component: SearchView
        },
    ]
});