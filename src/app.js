// app.js
import shared from './shared/shared'
import Login from './components/login/login.vue'
import Marketing from './components/marketing/marketing.vue'
import Sales from './components/sales/sales.vue'
import Transaction from './components/transaction/transaction.vue'
import Shipment from './components/shipment/shipment.vue'
import Order from './components/order/order.vue'
import SKU from './components/sku/sku.vue'
import Notification from './components/notification/notification.vue'
import MA from './components/myaccount/myaccount.vue'
import Settings from './components/settings/settings.vue'

import Vue from 'vue';
import { SidebarMenu } from 'vue-sidebar-menu'
import FunctionalCalendar from 'vue-functional-calendar';

Vue.use(FunctionalCalendar, {
  //dayNames: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
});

export default {
  name: 'app',
  components: {
    SidebarMenu,
    FunctionalCalendar,
    Login,
    Marketing,
    Sales,
    Transaction,
    Shipment,
    Order,
    SKU,
    Notification,
    MA,
    Settings,
  },
  data() {
    return {
      menu: [
       {
         header: true,
         //title: 'Navigation',
         hiddenOnCollapse: true,
       },
       {
         href: '/marketing',
         title: 'Marketing',
         icon: { class: "fa fa-rocket", element: "i", },
         child: [
           {
             href: '/marketing/coupon',
             title: 'Coupon',
             icon: { class: "fa fa-star", element: "i", }
           },
           {
             href: '/marketing/limtmoffer',
             title: 'Limited-Time Offer',
             icon: { class: "fa fa-clock", element: "i", }
           },
           {
             href: '/marketing/bxgy',
             title: 'Buy X get Y',
             icon: { class: "fa fa-cart-plus", element: "i", }
           },
         ]
       },
       {
         href: '/sales',
         title: 'Sales',
         icon: { class: "fa fa-lightbulb", element: "i", }
       },
       {
         href: '/transaction',
         title: 'Transaction',
         icon: { class: "fa fa-book", element: "i", }
       },
       {
         href: '/shipment',
         title: 'Shipment',
         icon: {
           class: "fa fa-bicycle",
           element: "i",
         }
       },
       {
         href: '/order',
         title: 'Order',
         icon: { class: "fa fa-shopping-bag", element: "i", }
       },
       {
         href: '/settings',
         title: 'Settings',
         icon: { class: "fa fa-cogs", element: "i", }
       },
      ],
      toggleSign: '<<',
      viewMode: 'rtview-nav',
      hasUnreadNotifications: true,
    }
  },
  methods: {
    onNavEnter: function() {
      this.$refs.sidebarMenu.onToggleClick();
    },
    onNavLeave: function() {
      this.$refs.sidebarMenu.onToggleClick();
    },
    getAuthenticated: function() {
      return shared.getAuthenticated();
    },
    getCurrentUser: function() {
      return shared.getCurrentUser();
    },
    onToggleCollapse: function(collapsed) {
      this.toggleSign = collapsed ? '>>' : '<<';
      this.viewMode = collapsed ? 'rtview-wide' : 'rtview-nav';
    },
    onNotifClicked() {
      if (this.$route.name === 'Notification') {
        return;
      }
      this.$router.push({name:"Notification"});
    },
    onMAClicked() {
      if (this.$route.name === 'MyAccount') {
        return;
      }
      this.$router.push({name:"MyAccount"});
    },
    onLogoutClicked() {
      shared.updateCurrentUser({});
      shared.updateAuthenticated(false);
      this.$router.replace({path:"/login"});
    },
  },
  created() {
    console.log('process.env: ', process.env);
    this.$on('hasUnreadNotifications', unread => {
      this.hasUnreadNotifications = unread;
    });
  },
  mounted() {

  },
  computed: {
  },
}

