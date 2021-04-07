import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);


const routes = [{
    path: '/',
    name: 'home',
    component: () => import('@/views/HomePage'),
    meta: {
        title: '',
        needLogin: true
    }
},

    // 授权相关
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/auth/LoginPage'),
        meta: {
            title: '账号登录？',
            needLogin: false
        }
    },
    {
        path: '/markdown/*',
        name: 'markdown',
        component: () => import('@/views/markdown/index'),
        meta: {
            title: 'markdown编辑',
            needLogin: true
        }
    }

];

export default new Router({
    routes,
    mode: "history"
});
