import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import Health from '@/views/Health'
import Chat from '@/views/Chat'
import About from '@/views/About'
import Login from '@/views/Login'
import Search from '@/views/Search'
import Whisper from '@/views/Chat/Whisper'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home
      },
      {
        path: 'health',
        name: 'Health',
        component: Health
      },
      {
        path: 'chat',
        name: 'Chat',
        component: Chat
      },
      {
        path: 'about',
        name: 'About',
        component: About
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/whisper/:id',
    name: 'Whisper',
    component: Whisper
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
