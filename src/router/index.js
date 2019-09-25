import Vue from 'vue'
import Router from 'vue-router'
import trainHome from '@/pages/train/Home.vue'
import trainSearch from '@/pages/train/search/Search.vue'
import trainCity from '@/pages/train/city/City.vue'
import trainCalendar from '@/pages/train/calendar/Calendar.vue'
import trainList from '@/pages/train/list/List.vue'
import Order from '@/pages/train/order/Order'//我的订单子路由父亲
import Totravel from '@/pages/train/order/Totravel'//我的订单子路由待出行
import Obligation from '@/pages/train/order/Obligation'//我的订单子路由待付款
import OrderRefund from '@/pages/train/order/OrderRefund'//我的订单退款售后
import All from '@/pages/train/order/All'//我的订单子路由全部
import Price from '@/pages/train/order/Price'//我的订单出票成功

import OrderDetail from '@/pages/train/order/OrderDetail'//价格明细
import CreateOrder from '@/pages/train/createOrder/CreateOrder'//订单填写

import Refund from '@/pages/train/refund/Refund'//退票

import Manual from '@/pages/train/refund/Manual'//退票说明
import AddPassenger from '@/pages/train/addPassenger/AddPassenger'//新增乘车人
import EditPassenger from '@/pages/train/editPassenger/EditPassenger'//编辑乘车人
import Payment from '@/pages/train/Payment'//支付成功
import TrainText from '@/pages/train/TrainText'//支付成功


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Train'
    },
    {
      path: '/Train',
      component: trainHome,
      children: [
        {
          path: '',
          component: trainSearch
        },
        {
          path: 'City',
          component: trainCity
        },
        {
          path: 'Calendar',
          component: trainCalendar
        },
        {
          path: 'List',
          component: trainList
        }
        ,
        {
          path: 'Order',
          component: Order,
          children: [
            {
              path: '',
              component: All,
              
            },
            {
              path: 'totravel',
              component: Totravel
            },
            {
              path: 'Obligation',
              component: Obligation
            },
            {
              path: 'OrderRefund',
              component: OrderRefund
            }
          ]
        },
        {
          path: 'OrderDetail',
          name: 'OrderDetail',
          component: OrderDetail
        },

        {
          path: 'Refund',
          name: 'Refund',
          component: Refund
        },
        
        {
          path: 'Payment',
          name: 'Payment',
          component: Payment
        },
        {
          path: 'Price',
          name: 'Price',
          component: Price
        },
       
        {
          path: 'Manual',
          name: 'Manual',
          component: Manual
        },

        {
          path: 'CreateOrder',
          name: 'CreateOrder',
          component: CreateOrder
        },
        {
          path: 'AddPassenger',
          name: 'AddPassenger',
          component: AddPassenger
        },
        {
          path: 'EditPassenger',
          name: 'EditPassenger',
          component: EditPassenger
        },
        {
          path: 'TrainText',
          name: 'TrainText',
          component:TrainText
        },
      
      ]
    }


  ]
})
