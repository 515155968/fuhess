import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'/*登录*/
import page from '@/components/manage/page'/*左侧导航*/
import construction from '@/components/manage/construction'/*商品信息  图片  描述  规格*/
import ManagePage from '@/components/manage/ManagePage'/*商品展示*/
import upd_Goods from '@/components/manage/upd_Goods'/*商品展示*/
import text from '@/components/manage/text'
import brand from '../components/goods/brand'/*商品品牌*/
import newBrand from '../components/goods/newBrand'/*新增商品品牌*/
import specifications from '../components/goods/specifications'/*商品规格*/
import classification from '../components/goods/classification'/*商品分类*/
import order_All from '../components/order/order_All'/*订单商品详情*/
import users from '../components/user/users'/*用户信息*/
import upd_User from '../components/user/upd_User'/*修改用户信息*/
import audit_Order from '../components/order/audit_Order'/*待审核订单*/
import cancel_Order from '../components/order/cancel_Order'/*取消订单*/
import confirm_Order from '../components/order/confirm_Order'/*确认订单*/
import confirm_Goods from '../components/order/confirm_Goods'/*确认收货*/
import doods_Details from '../components/order/doods_Details'/*查看详情*/
import statistical from '../components/user/user_statistical'/*用户统计*/
import integral from '../components/user/user_integral'/*用户积分*/
import vip_package from '../components/user/vip_package'/*用户套餐*/
import err_404 from '../components/error/err_404'/*404页面*/
import err_500 from '../components/error/err_500'/*500页面*/
import Err_Refused from '../components/error/Err_Refused'/*拒绝访问页面*/
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',//这是登录页面
      component: login
    },
    {
      path: '/login',
      component: page,/*导航*/
      children: [
        {
          path: '/',
          component: ManagePage/*导航 第一次显示的 右半部分*/
        },
        {
          path: '/construction',
          component: construction/*导航 点击新建  跳转 商品信息*/
        },
        {
          path: '/managePage',
          component: ManagePage/*商品展示  点击商品*/
        } ,
        {
          path: '/cancel',
          component: ManagePage/*点击商品信息 取消操作 跳转到商品展示*/
        },
        {
          path: '/brand',
          component: brand/*点击侧导航 跳转到 品牌页面*/
        },
        {
          path: '/specifications',
          component: specifications/*点击侧导航 跳转到 商品规格*/
        },
        {
          path: '/classification',
          component: classification/*点击侧导航 跳转到 商品分类*/
        },
        {
          path: '/details',
          component: order_All/*点击侧导航 跳转到 订单商品详情*/
        },
        {
          path: '/users',
          component: users/*点击侧导航 跳转到 用户信息*/
        },
        {
          path: '/newBrand',
          component: newBrand/*点击侧导航 跳转到 新增品牌*/
        } ,
        {
          path: '/cancelNewBrand',
          component: brand/*点击侧导航 跳转到 新增品牌*/
        } ,
        {
          path: '/upd_Goods',
          component: upd_Goods/*点击侧导航 跳转到 新增品牌*/
        },
        {
          path: '/editor',
          component: upd_User/*点击用户修改  修改当前用户信息*/
        },
        {
          path: '/audit_Order',
          component: audit_Order/*待审核订单*/
        },
        {
          path: '/cancel_Order',
          component: cancel_Order/*取消订单*/
        },
        {
          path: '/confirm_Order',
          component: confirm_Order/*确认订单*/
        },
        {
          path: '/confirm_Goods',
          component: confirm_Goods/*确认订单*/
        },
        {
          path: '/check_Details',
          component: doods_Details/*确认订单*/
        },
        {
          path: '/statistical',
          component: statistical/*用户统计*/
        },
        {
          path: '/user_integral',
          component: integral/*用户统计*/
        },
        {
          path: '/user_package',
          component: vip_package/*用户统计*/
        },
        {
          path:'/err_404',
          name:'err_404',
          component:err_404
        },
        {
          path:'/err_500',
          name:'err_500',
          component:err_500
        },
        {
          path:'/Err_Refused',
          name:'Err_Refused',
          component:Err_Refused
        }
      ]
    }
  ]
})
