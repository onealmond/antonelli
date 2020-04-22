<template>
  <div class="marketing">
    <div class='op-bar'>
      <select class='op-box' v-model='chosenType'>
        <option v-for='(op,iop) in supportedTypes'
          v-bind:value='iop'
          v-bind:key='iop'>{{op.name}}</option>
      </select>
      <select class='op-box' v-model='chosenOp'>
        <option disabled id='-1'>Please select operation</option>
        <option v-for='(op,iop) in supportedOps'
          v-bind:value='iop'
          v-bind:key='iop'>{{op.name}}</option>
      </select>
    </div>
    <div class='edit-zone'>
    <div class='btn-container-h'>
      <input type="submit" value='Back' @click="onCancel"/>
    </div>
    <table v-if='items.length > 0' class='grid'>
      <thead>
        <tr>
          <th class='checkbox-cell grid-header'>
            <input v-bind:id="-1" type="checkbox" v-model="allSelected"
            @change='onSelectAll' />
          </th>
          <th class='grid-cell grid-header' v-for="(h,ih) in headers" v-bind:key="ih">
            <span class='entry-title'>{{h}}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,irow) in items" v-bind:key="irow" class='grid-row'>
          <td class='checkbox-cell'>
            <input type="checkbox" 
              v-model="item.checked"
              v-bind:id="irow"
              @change="onItemChecked" />
          </td>
          <td v-for='(col,icol) in headers' v-bind:key='icol' class='grid-cell'>
            <span class='item-read' :id='irow' @click='onEditItem'>{{item[col]}}</span>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>
<script src="./marketing.js"></script>
<style scoped src="./marketing.css"></style>
<style scoped src="../../css/opbar.css"></style>
<style scoped src="../../css/btn.css"></style>
