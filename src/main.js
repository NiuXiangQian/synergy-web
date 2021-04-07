import Vue from 'vue';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import App from '@/App';
import store from '@/store';
import router from '@/router';


import './core/lazy-use';
import './core/global-component';
import './core/filter';
import './core/directives';
import '@/icons';
import '@/permission';

// 引入自定义全局css
import '@/assets/css/global.less';

Vue.config.productionTip = false;


const Instance = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

export default Instance;
