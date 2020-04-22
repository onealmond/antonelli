<template>
  <div class="myaccount">
    <div class='btn-container-h'>
      <input type="submit" value='Done' @click="onDone" v-bind:disabled='saving'/>
      <input type="submit" value='Back' @click="onCancel" v-bind:disabled='saving'/>
    </div>
    <ul class='edit-zone'>
      <li class='entry-container'>
        <span v-if='!saving && status.code==0' class='hint-info'>
          <i class='fa fa-fire'></i>
          changes submitted!</span>
        <span v-if='!saving && status.code==-1' class='hint-error'>
          <i class='fa fa-fire'></i>
          submit failed!</span>
        <span v-if='!saving && status.code==1' class='hint-error'>
          <i class='fa fa-fire'></i>
         {{status.msg}}</span>
      </li>
      <li v-for='(et,iet) in Object.keys(my)' :key='iet' class='entry-container info-details'>
        <div v-if='et=="password"'>
          <form>
            <span class='entry-title'>{{et}}</span>
            <input disabled class='entry-value' type='password' autocomplete='off'
              minlength='6' maxlength='128' value='my[et].value' />
          </form>
          <form>
            <span class='entry-title'>current password</span>
            <input class='entry-value' type='password' autocomplete='off'
              placeholder='current password' v-model='changes.currPass'
              minlength='6' maxlength='128' value='' />
          </form>
          <form>
            <span class='entry-title'>new password</span>
            <input class='entry-value' type='password' autocomplete='off'
              placeholder='new password' v-model='changes.newPass'
              minlength='6' maxlength='128' value='' />
          </form>
          <form>
            <span class='entry-title'>confirm password</span>
            <input class='entry-value' type='password' autocomplete='off'
              placeholder='confirm password' v-model='changes.confirmPass'
              minlength='6' maxlength='128' value='' />
          </form>
        </div>
        <div v-else-if='et=="avatar"' class='avatar-container'>
          <img class='entry-thumbnail' :src="my[et].value"
            @click='changes.choosingAvatar=!changes.choosingAvatar'>
          <div v-if='changes.choosingAvatar' class='avatar-upload'>
            <picture-input
              ref='chosenImg'
              @change='onAvatarChanged'
              @remove='onAvatarRemoved'
              accept="image/jpeg,image/png"
              :width="300"
              :height="300"
              :removable="true"
            ></picture-input>
            <input type='button' value='Upload' @click='onAvatarUpload'
              v-bind:disabled="changes.uploadingAvatar" />
          </div>
        </div>
        <div v-else>
          <span class='entry-title'>{{et}}</span>
          <input :disabled='my[et].readonly' class='entry-value' :value='my[et].value'/>
        </div>
      </li>
    </ul>
  </div>
</template>
<script src="./myaccount.js"></script>
<style scoped src="./myaccount.css"></style>
<style src="../../css/entry.css"></style>
<style src="../../css/btn.css"></style>
