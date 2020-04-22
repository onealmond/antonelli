/** components/sku/sku.js */
import shared from '../../shared/shared'

export default {
  name: 'SKU',
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
          if (h !== 'checked') {
            keys.push(h);
          }
        }
        return keys;
      },
    },
  },
  data() {
    return {
      searchKW: '',
      items: [ 
        {
          id: 123,
          name: "sku 1",
          thumbnail: "http://www.theluxuryspot.com/wp-content/uploads/2010/11/Sleeping-animals-22.jpg",
          price: "199.9",
          checked: false,
        },
        {
          id: 239,
          name: "sku 2",
          thumbnail: "https://media.salon.com/2015/08/shutterstock_51111274.jpg",
          price: "299.9",
          checked: false,
        },
        {
          id: 98721,
          name: "sku 3",
          thumbnail: "https://www.lovethispic.com/uploaded_images/79360-Cheetah-Cub.jpg",
          price: "399.9",
          checked: false,
        },
      ],
      itemMapping: {},
      allSelected: false,
    }
  },
  methods: {
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
    onDone() {
      if (this.allSelected) {
        shared.setSelectedItems(this.items);
      } else {
        let items = [];
        
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i].checked) {
            items.push(this.items[i]);
          }
        }

        shared.setSelectedItems(items);
      }
      this.$router.back();
    },
    onCancel() {
      this.$router.back();
    },
    onSearch() {

    },
  },
  created() {
    // console.log(this.$route.name,'created');
  },
  mounted() {
    // console.log(this.$route.name,'mounted');
    for (let i = 0; i < this.items.length; i++) {
      this.itemMapping[this.items[i].id] = i;
    }

    let selected = shared.getSelectedItems();
    if (this.items && selected) {
      for (let i = 0; i < selected.length; i++) {
        let loc = this.itemMapping[selected[i].id];
        if (loc != null) {
          this.items[loc].checked = true;
        }
      }
    }
  },
  updated() {
    // console.log(this.$route.name,'updated');
  },
  destroyed() {
    // console.log(this.$route.name,'destroyed');
  },
}
