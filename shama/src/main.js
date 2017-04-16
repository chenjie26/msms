import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import store from './vuex/store'
import Vuex from 'vuex'
import NProgress from 'nprogress'//页面顶部进度条
import 'nprogress/nprogress.css'

import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Main from './components/Main.vue'
import Member from './components/nav1/Member.vue'
import Feedback from './components/nav1/Feedback.vue'
import Order from './components/nav1/Order.vue'
import Active from './components/nav1/Active.vue'
import BaseInfo from './components/nav1/BaseInfo.vue'
import House from './components/nav1/House.vue'
import Service from './components/nav1/Service.vue'
import News from './components/nav1/News.vue'


Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueResource)

//Vue.use(Veditor)

Vue.http.interceptors.push((request, next) =>{
    var tokenVal = localStorage.getItem("token");
    if(tokenVal) {
        request.headers.set('token', tokenVal);
    }
    next((response) =>{
        return response;
    })
});

const routes = [
  {
    path: '/login',
    component: Login,
    hidden: true//不显示在导航中
  },
  //{ path: '/main', component: Main },
  {
    path: '/',
    component: Home,
    name: '会员管理',
    iconCls: 'fa fa-user-circle',//图标样式class
    children: [
      //{ path: '/main', component: Main },
      { path: '/member', component: Member, name: '会员' },
      { path: '/order', component: Order, name: '订单' },
      // { path: '/active', component: Active, name: '活动' },
      // { path: '/feedback', component: Feedback, name: '留言' },
    ]
  },

  // {
  //   path: '/',
  //   component: Home,
  //   name: '基础信息',
  //   iconCls: 'el-icon-setting',
  //   children: [
  //     { path: '/BaseInfo', component: BaseInfo, name: '基础信息' }
  //   ]
  // },
  {
    path: '/',
    component: Home,
    name: '房屋管理',
    iconCls: 'fa fa-building-o',
    children: [
        { path: '/House', component: House, name: '房屋信息' }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '服务管理',
    iconCls: 'fa fa-shopping-bag',
    children: [
      { path: '/service', component: Service, name: '服务管理' }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '文章管理',
    iconCls: 'fa fa-newspaper-o',
    // leaf: true,//只有一个节点
    children: [
      { path: '/News', component: News, name: '文章管理' }
    ]
  }
  /**
  {
    path: '/',
    component: Home,
    name: 'Charts',
    iconCls: 'fa fa-bar-chart',
    children: [
      { path: '/echarts', component: echarts, name: 'echarts' }
    ]
}**/
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
})

router.afterEach(transition => {
  NProgress.done();
});


new Vue({
  el: '#app',
  template: '<App/>',
  router,
  store,
  components: { App }
  //render: h => h(Login)
}).$mount('#app')

router.replace('/member')
