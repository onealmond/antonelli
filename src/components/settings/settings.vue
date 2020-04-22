<template>
  <div class="settings">
    <div class='btn-container-h'>
      <input type="submit" value='Done' @click="onDone" v-bind:disabled='changes.saving'/>
      <input type="submit" value='Back' @click="onCancel" v-bind:disabled='changes.saving'/>
    </div>
    <ul class='edit-zone'>
      <li v-for='(et,iet) in Object.keys(settings)' :key='iet' class='entry-container info-details'>
        <div>
          <span class='entry-title'>{{et}}</span>
          <input :disabled='settings[et].readonly' class='entry-value' :value='settings[et].value'/>
        </div>
      </li>
      <li class='entry-container'>
        <span class='fa fa-comments entry-title'>Feedback</span>
        <div>
        <textarea class='entry-paragraph-wide' maxlength='2048'
          v-model='feedback.msg'></textarea>
        <div>
        <span v-if='feedback.msg.length>=2048' class='hint-error'>Maximum length exceeded!</span>
        <span v-if='feedback.status==0' class='hint-info'>Feedback submitted!</span>
        </div>
        <input type='submit' :disabled='feedback.saving' value='Submit' 
          @click='onFeedbackSubmit'/>
        <input type='submit' :disabled='feedback.saving' value='Reset' 
          @click='feedback.msg=""'/>
        </div>
      </li>
    </ul>
  </div>
</template>
<script src="./settings.js"></script>
<style scoped src="./settings.css"></style>
<style scoped src="../../css/entry.css"></style>
<style scoped src="../../css/btn.css"></style>
