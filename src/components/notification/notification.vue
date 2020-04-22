<template>
  <div class="notification">
    <div class='op-bar'>
      <select class='op-box' v-model='chosenOp'>
        <option disabled v-bind:value=-1></option>
        <option v-for='(op,iop) in supportedOps' 
          v-bind:value='iop'
          v-bind:key='iop'>{{op.name}}</option>
      </select>
    </div>
    <div class='btn-container-h'>
      <input type="submit" value='Back' @click="onCancel"/>
    </div>
    <div class='edit-zone'>
    <table v-if='items.length > 0' class='grid'>
      <thead>
        <tr>
          <th class='checkbox-cell grid-header'>
            <input v-bind:id="-1" type="checkbox" v-model="allSelected"
            @change="onSelectAll" />
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
            <span v-if='item["read"]' class='item-read'>{{item[col]}}</span>
            <span v-else class='item-unread'>{{item[col]}}</span>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>
<script src="./notification.js"></script>
<style scoped src="./notification.css"></style>
