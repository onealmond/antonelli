<template>
  <div class="bxgy">
    <div class='btn-container-h'>
      <input type="submit" value='Reset' @click="onReset" v-bind:disabled='saving'/>
      <input type="submit" value='Done' @click="onDone" v-bind:disabled='saving'/>
      <input type="submit" value='Back' @click="onCancel" v-bind:disabled='saving'/>
    </div>
    <span class='desc'>{{ desc }}</span>
    <ul class='edit-zone'>
      <li class='entry-container'>
        <span v-if='!saving && this.status==0' class='hint-info'>
          <i class='fa fa-fire'></i>
          changes submitted!</span>
        <span v-if='!saving && this.status==-1' class='hint-error'>
          <i class='fa fa-fire'></i>
          submit failed!</span>
      </li>
      <li class='entry-container'>
        <span class='entry-title'>Name</span>
        <input class='entry-value' v-model="changes.name" />
      </li>
      <li class='entry-container'>
        <span class='entry-title'>Date Range</span>
        <span class='entry-value' @click='changes.choosingDate=!changes.choosingDate'>
          {{ changes.dateRange.start?changes.dateRange.start:'dd/mm/yyyy' }} -
          {{ changes.dateRange.end?changes.dateRange.end:'dd/mm/yyyy' }}
        </span>
        <FunctionalCalendar v-if='changes.choosingDate'
          v-model="calendar"
          :is-date-range="true"
          v-on:choseDay="onDayClicked"
        ></FunctionalCalendar>
      </li>
      <li class='entry-container'>
        <span class='entry-title'>SKU X</span>
        <input id='X' v-if='!changes || !changes.X' class='entry-value'
          @click='onItemChoosing' />
        <span id='X' v-else class='entry-value' @click='onItemChoosing'>
          <span v-for='(sku,i) in changes.X' :key='i'>{{sku.name}};</span>
        </span>
      </li>
      <li class='entry-container'>
        <span class='entry-title'>N</span>
        <input class='entry-value' type="number" v-model='changes.n' />
      </li>
      <li class='entry-container'>
        <span class='entry-title'>SKU Y</span>
        <input id='Y' v-if='!changes || !changes.Y' class='entry-value'
          @click='onItemChoosing' />
        <span id='Y' v-else class='entry-value' @click='onItemChoosing' >
          <span v-for='(sku,i) in changes.Y' :key='i'>{{sku.name}};</span>
        </span>
      </li>
      <li class='entry-container'>
        <span class='entry-title'>M</span>
        <input class='entry-value' type="number" v-model='changes.m' />
      </li>
    </ul>
  </div>
</template>
<script src="./bxgy.js"></script>
<style scoped src="./bxgy.css"></style>
<style scoped src='../../css/grid.css'></style>
<style scoped rc="../../css/opbar.css"></style>
<style scoped src="../../css/btn.css"></style>
