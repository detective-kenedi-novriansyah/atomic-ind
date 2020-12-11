import Vue from 'vue'
import Vuex from 'vuex'
import userReducer from './reducer/userReducer'
import purseReducer from './reducer/purseReducer'
import categoryReducer from './reducer/categoryReducer'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        userReducer,
        purseReducer,
        categoryReducer
    }
})