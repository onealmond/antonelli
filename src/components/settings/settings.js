/** components/settings/settings.js */
import axios from 'axios'
import shared from '../../shared/shared'

export default {
  name: 'Settings',
  components: {
  },
  props: {
  },
  computed: {
  },
  data() {
    return {
      dateFmt: '%A, %B %e, %Y',
      settings: {},
      feedback: {
        msg:'',
        saving: false,
      },
      changes: {
        saving: false,
      },
    }
  },
  methods: {
    onCancel() {
      this.$router.back();
    },
    onDone() {
      // TODO: save changes
      this.changes.saving = true;
      
      return axios.post('https://somewhere.com/settings/update', this.changes, {
          'content-type': 'application/json',
        }).then((rsp) => {
          console.log('saved:', rsp);
        }).catch((err) => {
          console.error('error:', err);
        }).finally(() => {
          this.changes.saving = false;
        });
    },
    onFeedbackSubmit() {
      console.log(this.feedback);
      this.feedback.saving = true;
      
      return axios.post('https://somewhere.com/settings/update', this.feedback, {
          'content-type': 'application/json',
        }).then((rsp) => {
          console.log('feedback saved:', rsp);
        }).catch((err) => {
          console.error('feedback error:', err);
        }).finally(() => {
          this.feedback = {
            msg: '',
            saving: false,
            status: 0,
          };
        });
    },
  },
  created() {
    //console.log(this.$route.name,'created');
    let settings = shared.getState('settings');
    if (settings) {
      this.settings = settings;
    }
  },
  mounted() {
    //console.log(this.$route.name,'mounted');
  },
  updated() {
    // console.log(this.$route.name,'updated');
  },
  destroyed() {
    // console.log(this.$route.name,'destroyed');
  },
}
