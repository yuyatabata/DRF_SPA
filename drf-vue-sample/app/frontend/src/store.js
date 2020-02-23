import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/service/api'

Vue.use(Vuex)

const authModule = {
    strict: process.env.NODE_ENV !== 'production' ,
    namespaced: true,
    state: {
        username: '',
        isLoggedIn: false
    },
    getters: {
        username: state => state.username,
        isLoggedIn: state => state.isLoggedIn
    },
    mutations:{
        set (state, payload) {
            state.username = payload.user,username
            state.isLoggedIn = true
        },
        clear (state) {
            state.username = ''
            state.isLoggedIn = false
        }
    },
    actions: {
        login (content, payload) {
            return api.post('/auth/jvt/create/',{
                'username' : payload.username,
                'password' : payload.password
            })
                .then(response => {
                    localStorage.setItem('access', response.data.access)
                    return context.dispatch('reload')
                        .then(user => user)
                })
        },
        logout (content) {
            localStorage.removeItem('access')
            context.commit('clear')
        },
        reload (context) {
            return api.get('/auth/users/me/')
                .then(response => {
                    const user = response.data
                    context.commit('set',{ user: user })
                    return user
                })
        }
    }
}
// グローバルメッセージ
const messageModule = {
    strict: process.env.NODE_ENV !== 'production',
    namespaced: true,
    state:{
        error: '',
        warnings: [],
        info: ''
    },
    getters: {
        error: state => state.error,
        warnings: state => state.warnings,
        info: state => state.info
    },
    mutations: {
        set (state, payload) {
            if (payload.error){
                state.error = payload.error
            }
            if (payload.warnings){
                state.warnings = payload.warnings
            }
            if (payload.info){
                state.info = payload.info
            }
        },
        clear (state) {
            state.error = ''
            state.warnings = []
            state.info = ''
        }
    },
    actions: {
        setErrorMessage (context, payload) {
            context.commit('clear')
            context.commit('set', { 'error': payload.message })
        },
        setWarningMessages (context, payload){
            context.commit('clear')
            context.commit('set', { 'warnings': payload.message })
        },
        setInfoMessages (context, payload){
            context.commit('clear')
            context.commit('set', { 'info': payload.message })
        },
        clearMessages (context){
            context.commit('clear')
        }
    }
}

const store = new Vuex.Store({
    modules: {
        auth: authModule,
        message: messageModule
    }
})

export default store