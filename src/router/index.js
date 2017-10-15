import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home'
import Discover from '@/pages/Discover'
import Order from '@/pages/Order'
import Me from '@/pages/Me'

import SearchAddress from "@/components/home/searchAddress.vue"
import Search from "@/components/home/search.vue"
import SearchShopping from "@/components/home/searchShopping.vue"
import SellerDetail from "@/components/home/details/Detail.vue"
import Cover from "@/components/home/details/Cover.vue"
import SearchList from "@/components/home/searchShopList.vue"
Vue.use(Router)


export default new Router({
  routes: [
    {
      path:"/search",
      component:Search,
      children:[
          {
            path:"shop/:word",
            component:SearchList
          }

      ]
    },
    {
      path: '/home',
      component: Home,
      children:[
        {
          path:"searchAddress",
          component:SearchAddress
        },
        {
          path:"searchHotWord/:word",
          component:SearchList
        },
        {
          path:"sellerDetail",
          component:SellerDetail
        },
        {
          path:"cover",
          component:Cover
        }
      ]
    },
    {
      path: '/discover',
      component: Discover
    },
    {
      path: '/order',
      component:Order
    },
    {
      path: '/me',
      component: Me
    },
    {
      path:"*",
      redirect:"/home"
    }
  ]
})
