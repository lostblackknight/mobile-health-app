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
import Doctor from '@/views/Doctor'
import Patient from '@/views/Patient'
import PatientAdd from '@/views/Patient/PatientAdd'
import PatientEdit from '@/views/Patient/PatientEdit'

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
          roles: ['patient']
        }
      },
      {
        path: 'health',
        name: 'Health',
        component: Health,
        meta: {
          roles: ['patient']
        }
      },
      {
        path: 'chat',
        name: 'Chat',
        component: Chat,
        meta: {
          roles: ['patient']
        }
      },
      {
        path: 'about',
        name: 'About',
        component: About,
        meta: {
          roles: ['patient']
        }
      }
    ]
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta: {
      roles: ['patient']
    }
  },
  {
    path: '/whisper/:id',
    name: 'Whisper',
    component: Whisper,
    meta: {
      roles: ['patient']
    }
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    meta: {
      roles: ['patient']
    }
  },
  {
    path: '/hospital/:id',
    name: 'Hospital',
    component: Hospital,
    meta: {
      roles: ['patient']
    }
  },
  {
    path: '/dept/:id',
    name: 'Dept',
    component: Dept,
    meta: {
      roles: ['patient']
    }
  },
  {
    path: '/schedule/:hospitalCode/:deptCode',
    name: 'Schedule',
    component: Schedule,
    meta: {
      roles: ['patient']
    }
  },
  {
    path: '/doctor/:hospitalCode/:deptCode/:doctorCode',
    name: 'Doctor',
    component: Doctor,
    meta: {
      roles: ['patient']
    }
  },
  {
    path: '/patient',
    name: 'Patient',
    component: Patient,
    meta: {
      roles: ['patient']
    }
  },
  {
    path: '/patient/add',
    name: 'PatientAdd',
    component: PatientAdd,
    meta: {
      roles: ['patient']
    }
  },
  {
    path: '/patient/edit/:id',
    name: 'PatientEdit',
    component: PatientEdit,
    meta: {
      roles: ['patient']
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
