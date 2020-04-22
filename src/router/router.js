import Vue from 'vue'
import VueRouter from "vue-router";
import shared from '../shared/shared'
import Login from '../components/login/login.vue'
import Marketing from '../components/marketing/marketing.vue'
import Sales from '../components/sales/sales.vue'
import Transaction from '../components/transaction/transaction.vue'
import Shipment from '../components/shipment/shipment.vue'
import Order from '../components/order/order.vue'
import SKU from '../components/sku/sku.vue'
import Notif from '../components/notification/notification.vue'
import MA from '../components/myaccount/myaccount.vue'
import MarketingLimTmOffer from '../components/limtmoffer/limtmoffer.vue'
import MarketingCoupon from '../components/coupon/coupon.vue'
import MarketingBxgy from '../components/bxgy/bxgy.vue'
import Settings from '../components/settings/settings.vue'

Vue.use(VueRouter);

const router = new VueRouter ({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "index",
      redirect: "/marketing",
      //component: Marketing,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        title: "Antonelli",
      },
    },
    {
      path: "/marketing",
      name: "Marketing",
      component: Marketing,
    },
    {
      path: "/sales",
      name: "Sales",
      component: Sales,
    },
    {
      path: "/transaction",
      name: "Transaction",
      component: Transaction,
    },
    {
      path: "/shipment",
      name: "Shipment",
      component: Shipment,
    },
    {
      path: "/order",
      name: "Order",
      component: Order,
    },
    {
      path: "/marketing/limtmoffer",
      name: "Limited-Time Offer",
      component: MarketingLimTmOffer
    },
    {
      path: "/marketing/coupon",
      name: "Coupon",
      component: MarketingCoupon,
    },
    {
      path: "/marketing/bxgy",
      name: "Buy X Get Y",
      component: MarketingBxgy,
    },
    {
      path: "/sku",
      name: "SKU",
      component: SKU,
    },
    {
      path: "/notif",
      name: "Notification",
      component: Notif,
    },
    {
      path: "/myaccount",
      name: "MyAccount",
      component: MA,
    },
    {
      path: "/settings",
      name: "Settings",
      component: Settings,
    },
  ]
});

router.beforeEach((to, from, next) => {
  //console.log(to, from, next);
  if (to.name !== 'login' && !shared.getAuthenticated()) {
    next({ name: 'login' });
  } else if (to.name === 'login' && shared.getAuthenticated()) {
    next(false);
  } else {
    next();
  }
});

/**
router.afterEach((to, from) => {
  if (to.name != 'login') {
    console.log({'title':to.name,'prev':from});
  }
})
router.onError((err) => {

});
*/

export default router
