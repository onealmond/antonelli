/** components/myaccount/myaccount.js */
import axios from 'axios'
import shared from '../../shared/shared'
import PictureInput from 'vue-picture-input'


export default {
  name: 'MyAccount',
  components: {
    PictureInput
  },
  props: {
  },
  computed: {
  },
  data() {
    return {
      dateFmt: '%A, %B %e, %Y',
      my: {},
      saving: false,
      status: { code:null, msg:'' },
      changes: {
        choosingAvatar: false,
        uploadingAvatar: false,
        chosenAvatar: {},
      },
    }
  },
  methods: {
    onCancel() {
      this.$router.back();
    },
    passPrecheck() {
      if (!this.changes.newPass || this.changes.newPass.length == 0) {
        return true;
      }

      if (this.changes.newPass.length < 6) {
        this.status = {code:1, msg:'please choose a better password'};
        return false;
      }

      if (this.changes.currPass !== this.my.password.value) {
        this.status = {code:1, msg:'wrong password'};
        return false;
      }

      if (this.changes.newPass === this.my.password.value) {
        this.status = {code:1, msg:'new password and currrent password are the same'};
        return false;
      }

      if (this.changes.newPass !== this.changes.confirmPass) {
        this.status = {code:1, msg:'new password mismatch'};
        return false;
      }
      return true;
    },
    onDone() {
      // TODO: save changes
      this.status = { code:null, msg:'' };

      if (!this.passPrecheck()) {
        return;
      }
      
      this.saving = true;

      return axios.post('https://somewhere.com/account/update', this.changes, {
          'content-type': 'application/json',
        }).then((rsp) => {
          console.log('saved:', rsp);
          this.status.code = 0;
        }).catch((err) => {
          console.error('error:', err);
          this.status.code = -1;
        }).finally(() => {
          this.saving = false;
        });
    },
    onAvatarChanged() {

    },
    onAvatarUpload() {
      this.changes.uploadingAvatar = true;
      if (!this.$refs.chosenImg) {
        return;
      }

      this.changes.chosenAvatar = this.$refs.chosenImg[0];
      if (!this.changes.chosenAvatar) {
        return;
      }
      this.doUpload('https://somewhere.com/account/avatar');
    },
    onAvatarRemoved() {
      this.changes.chosenAvatar = {};
    },
    doUpload(url) {
      const formData = new FormData();
      formData.append(this.changes.chosenAvatar.name, this.changes.chosenAvatar.file);

      return axios.post(url, formData, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        }).then((rsp) => {
          console.log('uploaded:', rsp);
          this.my.avatar.value = this.changes.chosenAvatar.image;
        }).catch((err) => {
          console.error('error:', err);
          // TODO remove me, show error
          this.my.avatar.value = this.changes.chosenAvatar.image;
        }).finally(() => {
          this.changes.uploadingAvatar = false;
          this.changes.choosingAvatar = false;
        });
    },
  },
  created() {
    //console.log(this.$route.name,'created');
    let my = shared.getCurrentUser();
    if (my) {
      this.my = my;
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
