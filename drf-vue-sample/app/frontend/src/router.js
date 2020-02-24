import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routers: [
        {path: '/', component: HomePage, meta:{ requiresAuth: true }},
        { path: '/login', component: Login },
        { path: '*', redirect: '/' }
    ]
})

router.beforeEach((to, from, next) => {
    const isLoggedIn = store.getters['auth/isLoggedIn']
    const token = localStorage.getItem('access')
    console.log('to.path=', to.path)
    console.log('isLoggedIn=', isLoggedIn)

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (isLoggedIn) {
            console.log('User is already logged in. So, free to next.')
            next()
        } else {
            if (token != null){
                console.log('User is not logged in. Trying to reload again.')
                store.dispatch('auth/reload')
                    .then(() => {
                        console.log('Succeeded to reload. So, free to next. ')
                        next()
                    })
                    .catch(() => {
                        forceToLoginPage(to, from, next)
                    })
            } else {
                forceToLoginPage(to, from, next)
            }
        }
    } else {
        console.log('Go to public page.')
        next()
    }
})

function forceToLoginPage (to, from, next){
    console.log('Force user to login page.')
    next({
        path: '/login',
        query: { next: to.fullPath }
    })
}

export default router