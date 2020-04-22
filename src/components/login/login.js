/** components/login.js */
import axios from 'axios'
import shared from '../../shared/shared'

export default {
  name: 'Login',
  props: {
    //msg: String,
  },
  computed: {
  },
  data() {
    return {
      msg: "Welcome to Antonelli",
      loginUser: '',
      loginPass: '',
      postLogin: 'Marketing',
    };
  },
  methods: {
    onLogin: function(ev) {
      if (shared.getAuthenticated()) {
        console.log("you are authenticated");
        this.$router.replace({name: this.postLogin, params: {},});
        return;
      }

      if (!this.loginPrecheck()) {
        ev.preventDefault();
        return;
      }

      // TODO: do login
      //axios.post('https://api.antonelli.tech/v1/login', {
      axios.post('http://localhost:13771/login', {
          user: this.loginUser.trim(),
          pass: this.loginPass.trim(),
        }
      ).then((rsp) => {
        console.log('login:', rsp);
        shared.updateAuthenticated(true);
        shared.updateCurrentUser({username:this.loginUser});
        this.$router.replace({name: this.postLogin, params: {},});
      }).catch((err) => {
        console.error('login failed:', err);
        /** REMOVE ME */
        shared.updateAuthenticated(true);
        shared.updateCurrentUser({username:this.loginUser});
        this.$router.replace({name: this.postLogin, params: {},});
      });
    },
    onForgotPassword: function(ev) {
      console.log('onForgotPassword:', ev);
    },
    getAuthenticated: function() {
      return shared.getAuthenticated();
    },
    loginPrecheck() {
      if (!this.loginUser || this.loginUser.length == 0
        || !this.loginPass || this.loginPass.length == 0) {
        //this.errors.push("username and password required");
        console.error("username and password required");
        return false;
      }
      return true;
    },
  }
}


