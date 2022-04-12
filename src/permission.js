import router from './router'
import store from './store'
import { getToken } from '@/utils/auth'

const whiteList = ['/login', '/sockjs-node/info'] // 白名单

router.beforeEach(async(to, from, next) => {
  const hasToken = getToken()
  // 判断用户是否登录
  if (hasToken) {
    if (to.path === '/login') {
      // 如果登录重定向到主页
      next({ path: '/' })
    } else {
      // 判断用户是否通过 getInfo 获取了自己的权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 获取角色
          const { roles } = await store.dispatch('member/getInfo')
          // 根据角色生成路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          // 添加路由
          router.addRoutes(accessRoutes)
          next({
            ...to,
            replace: true
          })
        } catch (error) {
          await store.dispatch('member/resetToken')
          next('/login')
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})
