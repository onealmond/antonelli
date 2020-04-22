/** marketing/types/limtmoffer.js */
import axios from 'axios'
import shared from '../../shared/shared'
import common from '../../common/common'

export default {
  name: 'LimTmOffer',
  data() {
    return {
      desc: 'Limited-time offer',
      saving: false,
      status: null,
      calendar: {},
      supportedTypes: [{
          id: 5667,
          name: "Fixed Price",
        },
        {
          id: 5668,
          name: "Percentage",
        },
        {
          id: 5634,
          name: "Fixed Discount"
      }],
      changes: {
        type: {
          id: null,
          value: null,
        },
        dateRange: {
          start: null,
          end: null,
        },
        skus: [],
        name: "New Offer " + Date().toString(),
        choosingDate: false,
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
        this.choosingDate = false;
      }

    },
    onReset() {
      this.calendar = {};
      this.changes = {
        name: "New Offer " + Date().toString(),
        choosingDate: false,
        dateRange: {
          start: null,
          end: null,
        },
        skus: [],
        type: {id:0,value:null},
      };
      shared.setCompData(this.$route.name, {});//null);
      shared.setSelectedItems(this.changes.skus);
    },
    onDone() {
      // TODO submit offer
      this.saving = true;
      this.status = null;
      axios.post('https://somewhere.com/marketing/limtmoffer', this.changes, {
          'content-type': 'application/json',
        }).then((rsp) => {
          console.log('limtmoffer saved:', rsp);
          this.status = 0;
        }).catch((err) => {
          console.error('limtmoffer error:', err);
          this.status = -1;
        }).finally(() => {
          this.saving = false;
        });
    },
    onCancel() {
      this.onReset();
      this.$router.back();
    },
    onOffTypeChanged() {
      // console.log(ev); 
    },
    loadEditItem() {
      let editItem = shared.getState('editingItem');

      if (editItem) {
        this.changes = common.clone(editItem.data);
        this.changes.name = editItem.name;
        shared.setState('editingItem', {});
      }
    },
    onChoosingSkus() {
      shared.setSelectedItems(this.changes.skus);
      shared.setCompData(this.$route.name, {changes: this.changes});
      this.$router.push({name:"SKU"});
    },
  },
  created() {
    // console.log(this.$route.name,'created');
  },
  mounted() {
    // console.log(this.$route.name,'mounted');
    let op = this.$router.history.current.params.op;
    if (op === 'edit') {
      this.loadEditItem();
      return;
    }

    let comp = shared.getCompData(this.$route.name);
    if (comp != null) {
      this.changes = comp.changes ? comp.changes : this.changes;
    }
    
    this.changes.skus = shared.getSelectedItems();
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
