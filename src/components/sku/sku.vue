<template>
  <div class="sku">
    <div class='search-bar'>
      <input class='search-box' placeholder='search' value='' minlength='1'
        v-model='searchKW' v-on:keyup.enter='onSearch'/>
      <input type="submit" value='Search' @click="onSearch" />
    </div>
    <div class='btn-container-h'>
      <input type="submit" value='Done' @click="onDone" />
      <input type="submit" value='Back' @click="onCancel" />
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
            <span>{{h}}</span>
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
              <span v-if='col !== "thumbnail"'>{{item[col]}}</span>
              <img v-else class='entry-thumbnail' :src='item[col]' />
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>
<script src="./sku.js"></script>
<style scoped src="./sku.css"></style>
<style src='../../css/grid.css'></style>
<style src="../../css/opbar.css"></style>
<style src="../../css/btn.css"></style>
