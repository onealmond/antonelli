/** marketing/types/coupon.js */
import axios from 'axios'
import shared from '../../shared/shared'
import common from '../../common/common'

export default {
  name: 'Coupon',
  props: {
    //supportedTypes: Array,
  },
  computed: {
    supportedTypes: {
      get() {
        return [{
          id: 2983,
          name: 'Buy n*X get m*Y free',
          data: {
            dateRange: {
              start: null,
              end: null,
            },
            createdAt: Date(),
            X: null,
            Y: null,
            n: null,
            m: null,
            choosingSku: null,
            choosingDate: false,
          },
        },{
          id: 1928,
          name: "Percentage",
          data: {
            dateRange: {
              start: null,
              end: null,
            },
            createdAt: Date(),
            X: null,
            percent: null,
            choosingSku: null,
            choosingDate: false,
          },
        },{
          id: 2187,
          name: "Fixed Price",
          data: {
            dateRange: {
              start: null,
              end: null,
            },
            createdAt: Date(),
            X: null,
            price: null,
            choosingSku: null,
            choosingDate: false,
          },
        },{
          id: 987,
          name: "Fixed discount",
          data: {
            dateRange: {
              start: null,
              end: null,
            },
            createdAt: Date(),
            X: null,
            discount: null,
            choosingSku: null,
            choosingDate: false,
          },
      }];
      },
    },
  },
  data() {
    return {
      desc: 'coupon',
      calendar: {},
      name: "New coupon " + Date().toString(),
      saving: false,
      status: null,
      chosenCouponType: {
        id: null,
        name: null,
        data: {},
      },
    }
  },
  methods: {
    onDayClicked() {
      this.chosenCouponType.data.dateRange = {
        start: this.calendar.dateRange.start.date,
        end: this.calendar.dateRange.end.date,
      };

      if (this.chosenCouponType.data.dateRange.start && 
          this.chosenCouponType.data.dateRange.end) {
        this.chosenCouponType.data.choosingDate = false;
      }
    },
    onCouponTypeChanged(ev) {
      let loc = parseInt(ev.target.id, 10);
      let ty = this.supportedTypes[loc];
      this.chosenCouponType.id = ty.id;
      this.chosenCouponType.name = ty.name;
      this.chosenCouponType.data = ty.data;
    },
    onItemChoosing(ev) {
      this.chosenCouponType.data.choosingSku = ev.target.id;
      this.keepData();
      this.$router.push({name:"SKU"});
    },
    keepData() {
      shared.setSelectedItems(this.chosenSkus);
      shared.setCompData(this.$route.name, null);
      shared.setCompData(this.$route.name, {
        chosenCouponType: this.chosenCouponType,
      });
    },
    onReset() {
      this.calendar = {};
      this.chosenSkus = [];
      this.initCouponType();

      shared.setCompData(this.$route.name, null);
      shared.setSelectedItems(this.chosenSkus);
    },
    onDone() {
      // TODO submit coupon
      this.saving = true;
      this.status = null;
      axios.post('https://somewhere.com/marketing/coupon', this.chosenCouponType, {
          'content-type': 'application/json',
        }).then((rsp) => {
          console.log('coupon saved:', rsp);
          this.status = 0;
        }).catch((err) => {
          console.error('coupon error:', err);
          this.status = -1;
        }).finally(() => {
          this.saving = false;
        });
    },
    onCancel() {
      this.onReset();
      this.$router.back();
    },
    initCouponType() {
      if (this.supportedTypes.length > 0) {
        let ty = this.supportedTypes[0];
        this.chosenCouponType = {
          id: ty.id,
          name: "New coupon " + Date().toString(),
          data: ty.data,
          tyId: ty.id,
        };
      }
    },
    loadEditItem() {
      let editItem = shared.getState('editingItem');

      if (editItem) {
        let ty = null;
        for (let i = 0; i < this.supportedTypes.length; i++) {
          if (this.supportedTypes[i].id == editItem.data.type) {
            ty = this.supportedTypes[i];
            break;
          }
        }

        if (ty == null) {
          return;
        }

        this.chosenCouponType.id = ty.id;
        /**
        this.chosenCouponType.name = ty.name;
        this.chosenCouponType.data = ty.data;
        */
        this.chosenCouponType.tyId = this.chosenCouponType.id;

        this.chosenCouponType.name = editItem.name;
        this.chosenCouponType.data = common.clone(editItem.data);

        shared.setState('editingItem', {});
      }
    },
  },
  created() {
    //console.log(this.$route.name,'created');
    this.initCouponType();
  },
  mounted() {
    //console.log(this.$route.name,'mounted');
    let comp = shared.getCompData(this.$route.name);
    
    if (comp) {
      this.chosenCouponType = comp.chosenCouponType ? comp.chosenCouponType : this.chosenCouponType;
    }
    
    this.chosenSkus = shared.getSelectedItems();
    if (this.chosenCouponType.data.choosingSku && this.chosenSkus) {
      this.chosenCouponType.data[this.chosenCouponType.data.choosingSku] = this.chosenSkus;
      this.chosenCouponType.tyId = this.chosenCouponType.id;
    }

    let op = this.$router.history.current.params.op;
    if (op === 'edit') {
      this.loadEditItem();
    }
  },
  updated() {
    //console.log(this.$route.name,'updated');
  },
  destroyed() {
    //console.log(this.$route.name,'destroyed');
  },
}
