<template>
  <div class="login">
    <div v-if="!getAuthenticated()">
      <h1>{{ msg }}</h1>
      <form class='login-box'>
       <input class='login-input' placeholder='username' value='' 
          minlength='6' maxlength='64' v-model='loginUser' v-on:keyup.enter='onLogin'/>
       <input class='login-input' type='password' placeholder='password'
          minlength='6' maxlength='128' value='' autocomplete='off'
          v-on:keyup.enter='onLogin' v-model='loginPass'/>
      </form>
      <div>
      <div class='hint-info'>
        <a @click='onForgotPassword'>forgot password?</a>
      </div>
      </div>
    </div>
  </div>
</template>
<script src="./login.js"></script>
<style scoped src="./login.css"></style>
