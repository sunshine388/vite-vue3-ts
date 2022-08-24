import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { h, resolveComponent } from 'vue'

export const subRoutes = [
  {
    path: 'page1',
    name: 'page1',
    component: {
      render: () => h(resolveComponent('router-view'))
    },
    redirect: '/page1/page1-1',
    meta: {
      label: '页面1',
      icon: 'Discount'
    },
    children: [
      {
        path: 'page1-1',
        name: 'page1-1',
        component: () => import('@/views/Page1/Page1-1/index.vue'),
        meta: {
          label: '页面1-1',
          icon: 'Postcard'
        }
      },
      {
        path: 'page1-2',
        name: 'page1-2',
        component: () => import('@/views/Page1/Page1-2/index.vue'),
        meta: {
          label: '页面1-2',
          icon: 'Postcard'
        }
      },
      {
        path: 'detail',
        name: 'detail',
        component: () => import('@/views/Page1/Detail/index.vue'),
        meta: {
          label: '详情',
          icon: 'Postcard',
          isNotMenu: true
        }
      }
    ]
  },
  {
    path: 'page2',
    name: 'page2',
    component: () => import('@/views/Page2/index.vue'),
    meta: {
      label: '页面2',
      icon: 'House'
    }
  }
]

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      label: '登录'
    }
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/layout/index.vue'),
    redirect: '/page1',
    meta: {
      label: '首页'
    },
    children: subRoutes
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to: any, _from: any, next: any) => {
  //未登录执行逻辑
  if (!sessionStorage.getItem('user') && to.path !== '/login') {
    return next({ path: '/login' })
  } else {
    next()
  }
})

export default router
