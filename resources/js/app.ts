import Vue from 'vue'
import Base from './components/Base.vue'
import routes from './routes'
import store from './modules'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';

Vue.use(Vuesax)
Vue.use(require('vue-moment'));
Vue.use(ElementUI)
Vue.config.productionTip = false;

const app = new Vue({
    el: '#app',
    router: routes,
    store,
    render: (h) => h(Base)
})