<template>
  <div id="app">
    <div v-if="getAuthenticated()">
      <div id="top" class="status-bar">
        <h1 class="greeting">Hi! {{ getCurrentUser().nickname ? 
          getCurrentUser().nickname.value : "guest" }}</h1>
        <h1 class="comp-title">{{ $route.name }}</h1>
        <div class="notif-container">
          <img v-if="hasUnreadNotifications"
            class="msg-notif" src="./assets/msg-new.png"
            @click='onNotifClicked' >
          <img v-else class="msg-notif" src="./assets/msg-norm.png"
            @click='onNotifClicked' >
          <img v-if='getCurrentUser().avatar' 
            class="msg-notif" :src="getCurrentUser().avatar.value"
            @click='onMAClicked' >
          <img v-else class="msg-notif" src="./assets/user.png"
            @click='onMAClicked' >
          <img class="msg-notif" src="./assets/logout.png" @click='onLogoutClicked'>
        </div>
      </div> 
      <router-view :class='viewMode'></router-view>
      <div class='nav' @mouseenter='onNavEnter' @mouseleave='onNavLeave'>
        <sidebar-menu ref="sidebarMenu" :menu="menu" 
          :collapsed="true"
          :hideToggle="true"
          @toggle-collapse="onToggleCollapse">
          <div slot="header"></div>
          <div slot="footer"></div>
          <span slot="toggle-icon">{{ toggleSign }}</span>
        </sidebar-menu>
      </div>
      <a href='#top'>
         <img class='to-top' src='./assets/top.png' /></a>
    </div> <!-- if authenticatetd -->
    <router-view v-else class='rtview-login'></router-view>
  </div>
</template>
<script src='./app.js'></script>
<style src='./app.css'></style>
<style src='./css/grid.css'></style>
<style src='./css/opbar.css'></style>
<style src='./css/btn.css'></style>
<style src='./css/hint.css'></style>
<style src='./css/fontawesome/css/all.css'></style>
