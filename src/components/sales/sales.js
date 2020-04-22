/** components/sales.js */

export default {
  name: 'Sales',
  props: {
  },
  computed: {
  },
  data() {
    return {
    }
  },
  methods: {
    onCancel() {
      this.$router.back();
    },
  },
  created() {
    // console.log(this.$route.name,'created');
  },
  mounted() {
    // console.log(this.$route.name,'mounted');
  },
  updated() {
    // console.log(this.$route.name,'updated');
  },
  destroyed() {
    // console.log(this.$route.name,'destroyed');
  },
}
