import Vue from 'vue'
import Base from './components/Base.vue'
import routes from './routes'
import store from './modules'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles

Vue.use(Vuesax)
Vue.config.productionTip = false;

const app = new Vue({
    el: '#app',
    router: routes,
    store,
    render: (h) => h(Base)
})