import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import City from '@/pages/city/City'
import Detail from '@/pages/detail/Detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },{
      path: '/city',
      name: 'City',
      component: City
    },{
      path: '/detail/:id', //动态路由
      name: 'Detail',
      component: Detail
    }
  ],
  //每次路由切换时, 滚动条默认到最顶部
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { x:0, y:0 }
  }
})