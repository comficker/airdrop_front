import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _470aa573 = () => interopDefault(import('../pages/submit.vue' /* webpackChunkName: "pages/submit" */))
const _1517e8ee = () => interopDefault(import('../pages/event/_page.vue' /* webpackChunkName: "pages/event/_page" */))
const _dd26f83a = () => interopDefault(import('../pages/_page.vue' /* webpackChunkName: "pages/_page" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/submit",
    component: _470aa573,
    name: "submit"
  }, {
    path: "/event/:page?",
    component: _1517e8ee,
    name: "event-page"
  }, {
    path: "/:page?",
    component: _dd26f83a,
    name: "page"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
