<template>
  <div class="coupon">
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
        <span class='entry-title'>Name</span>
        <input class='entry-value' v-model="chosenCouponType.name" />
      </li>
      <li class='entry-container'>
        <span class='entry-title'>Coupon Types</span>
        <div v-for='(ty,ity) in supportedTypes' :key='ity' class='choose-offer'>
          <input
            type='radio'
            v-model='chosenCouponType.tyId'
            :value='ty.id'
            :id='ity'
            @change='onCouponTypeChanged' />
          <span for='ty.name'>{{ty.name}}</span>
        </div>
      </li>
      <li class='entry-container'>
        <span class='entry-title'>Date Range</span>
        <span class='entry-value' 
            @click='chosenCouponType.data.choosingDate=!chosenCouponType.data.choosingDate'>
          {{ chosenCouponType.data.dateRange.start?chosenCouponType.data.dateRange.start:'dd/mm/yyyy' }} -
          {{ chosenCouponType.data.dateRange.end?chosenCouponType.data.dateRange.end:'dd/mm/yyyy' }}
        </span>
        <FunctionalCalendar v-if='chosenCouponType.data.choosingDate'
          v-model="calendar"
          :is-date-range="true"
          v-on:choseDay="onDayClicked"
        ></FunctionalCalendar>
      </li>
      <div v-if='chosenCouponType.id==2983'>
      <li class='entry-container'>
        <span class='entry-title'>SKU X</span>
        <input id='X' v-if='!chosenCouponType.data || !chosenCouponType.data.X' class='entry-value'
          @click='onItemChoosing' />
        <span id='X' v-else class='entry-value' @click='onItemChoosing'>
          <span v-for='(sku,i) in chosenCouponType.data.X' :key='i'>{{sku.name}};</span>
        </span>
      </li>
      <li class='entry-container'>
        <span class='entry-title'>N</span>
        <input class='entry-value' type="number" min="0.0" v-model='chosenCouponType.data.n' />
      </li>
      <li class='entry-container'>
        <span class='entry-title'>SKU Y</span>
        <input id='Y' v-if='!chosenCouponType.data || !chosenCouponType.data.Y' class='entry-value'
          @click='onItemChoosing' />
        <span id='Y' v-else class='entry-value' @click='onItemChoosing'>
          <span v-for='(sku,i) in chosenCouponType.data.Y' :key='i'>{{sku.name}};</span>
        </span>
      </li>
      <li class='entry-container'>
        <span class='entry-title'>M</span>
        <input class='entry-value' type="number" min="0.0" v-model='chosenCouponType.data.m' />
      </li>
      </div>
      <div v-if='chosenCouponType.id==1928'>
      <li class='entry-container'>
        <span class='entry-title'>SKU X</span>
        <input id='X' v-if='!chosenCouponType.data || !chosenCouponType.data.X' class='entry-value'
          @click='onItemChoosing' />
        <span id='X' v-else class='entry-value' @click='onItemChoosing'>
          <span v-for='(sku,i) in chosenCouponType.data.X' :key='i'>{{sku.name}};</span>
        </span>
      </li>
      <li class='entry-container'>
        <span class='entry-title'>Percent</span>
        <input class='entry-value' type="number" min="0.0" v-model='chosenCouponType.data.percent' />
      </li>
      </div>
      <div v-if='chosenCouponType.id==2187'>
      <li class='entry-container'>
        <span class='entry-title'>SKU X</span>
        <input id='X' v-if='!chosenCouponType.data || !chosenCouponType.data.X' class='entry-value'
          @click='onItemChoosing' />
        <span id='X' v-else class='entry-value' @click='onItemChoosing'>
          <span v-for='(sku,i) in chosenCouponType.data.X' :key='i'>{{sku.name}};</span>
        </span>
      </li>
      <li class='entry-container'>
        <span class='entry-title'>Price</span>
        <input class='entry-value' type="number" min="0.0" v-model='chosenCouponType.data.price' />
      </li>
      </div>
      <div v-if='chosenCouponType.id==987'>
      <li class='entry-container'>
        <span class='entry-title'>SKU X</span>
        <input id='X' v-if='!chosenCouponType.data || !chosenCouponType.data.X' class='entry-value'
          @click='onItemChoosing' />
        <span id='X' v-else class='entry-value' @click='onItemChoosing'>
          <span v-for='(sku,i) in chosenCouponType.data.X' :key='i'>{{sku.name}};</span>
        </span>
      </li>
      <li class='entry-container'>
        <span class='entry-title'>Discount</span>
        <input class='entry-value' type="number" min="0.0" v-model='chosenCouponType.data.discount' />
      </li>
      </div>
    </ul>
  </div>
</template>
<script src="./coupon.js"></script>
<style scoped src="./coupon.css"></style>
<style src='../../css/grid.css'></style>
<style src="../../css/opbar.css"></style>
<style src="../../css/btn.css"></style>
