/** components/notification/notification.js */
import shared from '../../shared/shared'

export default {
  name: 'Notification',
  props: {
  },
  computed: {
    headers: {
      get() {
        if (!this.items) {
          return [];
        }
        let keys = [];
        for (let i = 0; i < Object.keys(this.items[0]).length; i++) {
          let h = Object.keys(this.items[0])[i];
          if (h !== 'checked' && h !== 'read') {
            keys.push(h);
          }
        }
        return keys;
      },
    },
  },
  watch: {
    chosenOp: function(newVal) {
      this.chosenOp = -1;
      if (newVal == null || newVal < 0) {
        return;
      }

      let op = this.supportedOps[newVal];
      if (op && op.exec) {
        op.exec(this);
      }
    },
  },
  data() {
    return {
      dateFmt: '%A, %B %e, %Y',
      items: [],
      allSelected: false,
      chosenOp: -1,
      supportedOps: [{
        name: 'Mark as Read',
        exec: this.markRead,
      },{
        name: 'Mark as Unread',
        exec: this.markUnread,
      }],
    }
  },
  methods: {
    onCancel() {
      this.$router.back();
    },
    markRead() {
      let allRead = true;
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].checked) {
          this.items[i].read = true;
          this.items[i].checked = false;
        }
        
        if (!this.items[i].read) {
          allRead = false;
        }
      }

      this.allSelected = false;
      this.$parent.$emit('hasUnreadNotifications', !allRead);
    },
    markUnread() {
      let allRead = true;

      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].checked) {
          this.items[i].read = false;
          this.items[i].checked = false;
        }

        if (!this.items[i].read) {
          allRead = false;
        }
      }
       
      this.allSelected = false;
      this.$parent.$emit('hasUnreadNotifications', !allRead);
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
  },
  created() {
    //console.log(this.$route.name,'created');
  },
  mounted() {
    //console.log(this.$route.name,'mounted');
    this.items = shared.getState('notifications');
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].createdAt = this.items[i].createdAt.toLocaleString();
      this.items[i].checked = false;
    }
  },
  updated() {
    // console.log(this.$route.name,'updated');
  },
  destroyed() {
    // console.log(this.$route.name,'destroyed');
  },
}
