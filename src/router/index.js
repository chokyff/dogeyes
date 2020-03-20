import Vue from 'vue'
import VueRouter from 'vue-router'

import movieRouter from './Movie'
import mineRouter from './Mine'
import cinemaRouter from './Cinema'

Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    movieRouter,
    mineRouter,
    cinemaRouter,
    {
        path: '/*',
        redirect: '/movie'
    }
  ]
})

export default router
