<template>
  <div class="limtmoffer">
    <div class='btn-container-h'>
      <input type="submit" value='Reset' @click="onReset" v-bind:disabled='saving'/>
      <input type="submit" value='Done' @click="onDone" v-bind:disabled='saving'/>
      <input type="submit" value='Back' @click="onCancel" v-bind:disabled='saving'/>
    </div>
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
        <span class='entry-title'>
          Name
        </span>
        <input class='entry-value' v-model="changes.name" />
      </li>
      <li class='entry-container'>
        <span class='entry-title'>
          Date Range
        </span>
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
        <span class='entry-title'>SKUs</span>
        <input v-if='!changes.skus' class='entry-value' @click='onChoosingSkus' />
        <span v-else class='entry-value' @click='onChoosingSkus'>
          <span v-for='(sku,i) in changes.skus' :key='i'>{{sku.name}};</span>
        </span>
      </li>
      <li class='entry-container'>
        <span class='entry-title'>Offer Types</span>
        <div v-for='(ty,ity) in supportedTypes' :key='ity' class='choose-offer'>
          <input
            type='radio'
            v-model='changes.type.id'
            :value='ty.id'
            :id='ity'
            @change='onOffTypeChanged' />
          <span for='ty.name'>{{ty.name}}</span>
        </div>
        <div>
          <input class='entry-value' type="number" min="0.0" v-model='changes.type.value'
            @change='onOffTypeChanged' />
        </div>
      </li>
    </ul>
  </div>
</template>
<script src="./limtmoffer.js"></script>
<style scoped src="./limtmoffer.css"></style>
<style src='../../css/grid.css'></style>
<style src="../../css/opbar.css"></style>
<style src="../../css/btn.css"></style>
