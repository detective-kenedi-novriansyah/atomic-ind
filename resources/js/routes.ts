import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from './components/Dashboard.vue'
import Login from './components/Auth/Login.vue'
import Register from './components/Auth/Register.vue'
import Forgotted from './components/Auth/Forgotted.vue'
import RecordPurse from './components/Purse/Record.vue'

Vue.use(VueRouter)

const routes = [{
    component: Dashboard,
    path: '/',
    alias: ['/', '/dashboard']
}, {
    component: Login,
    path: '/login',
    name: 'login'
}, {
    component: Register,
    path: '/signup',
    name: 'signup'
},{
    component: Forgotted,
    path: '/forgotted/password'
},{
    component: RecordPurse,
    path: '/record/purse'
}]

const router = new VueRouter({
    routes
})

const openRoute: Array<any> = ["login","signup"]

router.beforeEach((to, from, next) => {
    if(localStorage.getItem('token')) {
        if(openRoute.includes(to.name)) {
            next(false)
        } else {
            next()
        }
    } else {
        if(openRoute.includes(to.name)) {
            next()
        } else {
            next(false)
        }
    }
})

export default router