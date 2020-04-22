/** components/marketing.js */
import shared from '../../shared/shared';
import common from '../../common/common';


export default {
  name: 'Marketing',
  props: {
  },
  computed: {
    headers: {
      get() {
        if (this.items == null || this.items.length == 0) {
          return [];
        }

        return ['id','name','data'];
      }
    }
  },
  watch: {
    chosenType: function(newVal) {
      if (newVal == null || newVal == -1) {
        return;
      }

      let op = this.supportedTypes[newVal];
      if (op && op.exec) {
        op.exec(this);
      }
    },
    chosenOp: function(newVal) {
      if (newVal == null || newVal == -1) {
        return;
      }

      let op = this.supportedOps[newVal];
      if (op && op.exec) {
        op.exec(this);
      }
      this.chosenOp = -1;
    },
  },
  data() {
    return {
      chosenType: 1,
      chosenOp: -1,
      allSelected: false,
      supportedTypes: [{
        id: 'ltoffer',
        name: "Limited-Time Offer",
        exec: this.loadLTOffer,
      },{
        id: 'coupon', 
        name: "Coupon",
        exec: this.loadCoupon,
      },{
        id: 'bxgy',
        name: "Buy X Get Y",
        exec: this.loadBxgy,
      }],
      items: [],
      supportedOps: [
        {
          name: "delete",
          exec: this.opDelete,
        },
      ],
    }
  },
  methods: {
    onCancel() {
      this.$router.back();
    },
    opDelete() {
      let comp = shared.getCompData(this.$route.name);
      if (comp == null) {
        return;
      }

      let ty = this.supportedTypes[this.chosenType];
      //let items = comp.items[ty.id];
      let keep = [];
      
      for (let i = 0; i < this.items.length; i++) {
        if (!this.items[i].checked) {
          keep.push(this.items[i]);
        }
      }

      comp.items[ty.id] = keep;
      shared.setCompData(this.$route,name, comp);

      //this.supportedTypes[this.chosenType].exec(this);
      ty.exec(this);
    },
    loadLTOffer() {
      let comp = shared.getCompData(this.$route.name);
      if (comp == null || comp.items == null) {
        return;
      }

      let ty = this.supportedTypes[this.chosenType];
      this.items = comp.items[ty.id];
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].checked = false;
      }
    },
    loadCoupon() {
      let comp = shared.getCompData(this.$route.name);
      if (comp == null || comp.items == null) {
        return;
      }

      let ty = this.supportedTypes[this.chosenType];

      this.items = comp.items[ty.id];
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].checked = false;
      }
    },
    loadBxgy() {
      let comp = shared.getCompData(this.$route.name);
      if (comp == null || comp.items == null) {
        return;
      }

      let ty = this.supportedTypes[this.chosenType];
      this.items = comp.items[ty.id];
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].checked = false;
      }
    },
    onItemChecked(ev) {
      let loc = ev.target.id;
      if (!this.items[loc].checked) {
        this.allSelected = false;
      }
    },
    onSelectAll() {
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].checked = this.allSelected;
      }
    },
    onEditItem(ev) {
      shared.setState('editingItem', common.clone(this.items[ev.target.id]));
      this.$router.push({
        name: this.supportedTypes[this.chosenType].name,
        params: {op:'edit'},
      });
    },
  },
  created() {
    // console.log(this.$route.name,'created');
  },
  mounted() {
    // console.log(this.$route.name,'mounted');
    this.supportedTypes[this.chosenType].exec(this);
  },
  updated() {
    // console.log(this.$route.name,'updated');
  },
  destroyed() {
    // console.log(this.$route.name,'destroyed');
  },
}
