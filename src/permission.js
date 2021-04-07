import router from '@/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import config from '@/config/config';
import {getNickname} from '@/utils/auth'

NProgress.configure({
    showSpinner: false
});

const WEBSITE_NAME = config.web_name;

// 登录用户强制重定向页面
const login_redirect = ['/login', '/register', '/forget'];

router.beforeEach((to, from, next) => {
    document.title = to.meta.title ? `${WEBSITE_NAME} | ${to.meta.title}` : WEBSITE_NAME;
    var name = getNickname()
    // 如果有name说明该用户已登陆
    if (name) {
        if (login_redirect.indexOf(to.path) >= 0) {
            next('/');
        }
    } else if (to.meta.needLogin) {
        next('/login');
    }

    NProgress.start();
    next();
});

router.afterEach(() => {
    NProgress.done();
});
