import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/layout'
import Home from '@/views/common/Home'
import Health from '@/views/common/Health'
import Chat from '@/views/common/Chat'
import About from '@/views/common/About'
import Login from '@/views/common/Login'
import Register from '@/views/common/Register'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
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
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home'
  }
]

const router = new VueRouter({
  routes
})

export default router
