import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import Health from '@/views/Health'
import Chat from '@/views/Chat'
import About from '@/views/About'
import Search from '@/views/Search'
import Whisper from '@/views/Chat/Whisper'
import Account from '@/views/Account'
import Hospital from '@/views/Hospital'
import SearchResult from '@/views/Search/SearchResult'
import Dept from '@/views/Dept'
import Schedule from '@/views/Schedule'

Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/Login/index'),
    hidden: true
  }
]

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
        meta: {
          roles: ['patient', 'doctor']
        }
      },
      {
        path: 'health',
        name: 'Health',
        component: Health,
        meta: {
          roles: ['patient', 'doctor']
        }
      },
      {
        path: 'chat',
        name: 'Chat',
        component: Chat,
        meta: {
          roles: ['patient', 'doctor']
        }
      },
      {
        path: 'about',
        name: 'About',
        component: About,
        meta: {
          roles: ['patient', 'doctor']
        }
      }
    ]
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta: {
      roles: ['patient', 'doctor']
    }
  },
  {
    path: '/search/',
    name: 'SearchResult',
    component: SearchResult,
    meta: {
      roles: ['patient', 'doctor']
    }
  },
  {
    path: '/whisper/:id',
    name: 'Whisper',
    component: Whisper,
    meta: {
      roles: ['patient', 'doctor']
    }
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    meta: {
      roles: ['patient', 'doctor']
    }
  },
  {
    path: '/hospital/:id',
    name: 'Hospital',
    component: Hospital,
    meta: {
      roles: ['patient', 'doctor']
    }
  },
  {
    path: '/dept/:id',
    name: 'Dept',
    component: Dept,
    meta: {
      roles: ['patient', 'doctor']
    }
  },
  {
    path: '/schedule/:hospitalCode/:deptCode',
    name: 'Schedule',
    component: Schedule,
    meta: {
      roles: ['patient', 'doctor']
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home',
    meta: {
      roles: ['patient', 'doctor']
    }
  }
]

const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
  mode: 'history'
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
