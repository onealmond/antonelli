/** marketing/types/bxgy.js */
import axios from 'axios'
import shared from '../../shared/shared'
import common from '../../common/common'

export default {
  name: 'Bxgy',
  data() {
    return {
      desc: 'Buy n*X get m*Y free',
      calendar: {},
      saving: false,
      status: null,
      changes: {
        choosingDate: false,
        dateRange: { start: null, end: null },
        skus: [],
        name: "New Rule " + Date().toString(),
        choosingSku: null,
        X: null,
        n: null,
        Y: null,
        m: null,
        createdAt: Date(),
      },
    }
  },
  methods: {
    onDayClicked() {
      this.changes.dateRange = {
        start: this.calendar.dateRange.start.date,
        end: this.calendar.dateRange.end.date,
      };

      if (this.changes.dateRange.start && this.changes.dateRange.end) {
        this.changes.choosingDate = false;
      }
    },
    onReset() {
      this.calendar = {};
      this.changes = {
        X:null,Y:null,n:null,m:null,
        skus: [],
        dateRange: {start: null, end: null,},
        choosingDate: false,
        choosingSku: null,
        name: "New Rule " + Date().toString(),
      };
      shared.setCompData(this.$route.name, null);
      shared.setSelectedItems(this.changes.skus);
    },
    onDone() {
      // TODO submit offer
      this.saving = true;
      this.status = null;
      axios.post('https://somewhere.com/marketing/bxgy', this.changes, {
          'content-type': 'application/json',
        }).then((rsp) => {
          console.log('bxgy saved:', rsp);
          this.status = 0;
        }).catch((err) => {
          console.error('bxgy error:', err);
          this.status = -1;
        }).finally(() => {
          this.saving = false;
        });
    },
    onCancel() {
      this.onReset();
      this.$router.back();
    },
    onOffRuleChanged() {
      // console.log(ev);
    },
    onItemChoosing(ev) {
      this.changes.choosingSku = ev.target.id;
      this.keepData();
      this.$router.push({name:"SKU"});
    },
    keepData() {
      shared.setSelectedItems(this.changes.skus);
      shared.setCompData(this.$route.name, {changes: this.changes});
    },
    loadEditItem() {
      let editItem = shared.getState('editingItem');

      if (editItem) {
        this.changes = common.clone(editItem.data);
        this.changes.name = editItem.name;
        shared.setState('editingItem', {});
      }
    },
  },
  created() {
    // console.log(this.$route.name,'created');
  },
  mounted() {
    // console.log(this.$route.name,'mounted');
    let op = this.$router.history.current.params.op;
    if (op == 'edit') {
      this.loadEditItem();
      return;
    }

    let comp = shared.getCompData(this.$route.name);
    if (comp) {
      this.changes = comp.changes ? comp.changes : this.changes;
    }

    this.changes.skus = shared.getSelectedItems();

    if (this.changes.choosingSku && this.changes.skus) {
      if (this.changes.choosingSku) {
        this.changes[this.changes.choosingSku] = this.changes.skus;
      }
      this.changes.choosingSku = null;
    }
  },
  updated() {
    // console.log(this.$route.name,'updated');
  },
  beforeDestroy() {
  },
  destroyed() {
    // console.log(this.$route.name,'destroyed');
  },
  errorCaptured() {
    // console.log(this.$route.name,'errorCaptured');
  },
}
