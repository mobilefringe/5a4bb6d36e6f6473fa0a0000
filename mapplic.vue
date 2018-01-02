<template>
  <div class="search-component" v-if="autocomplete">
    <p class="control has-icon has-icon-right">
      <input type="search" class="input is-large" :placeholder="placeholder" :suggestionAttribute="suggestionAttribute" @input="onInput($event.target.value)" @keyup.esc="isOpen = false" @blur="isOpen = false" @keydown.down="moveDown" @keydown.up="moveUp" @keydown.enter="select" :value="value">
      <i class="fa fa-angle-down"></i>
    </p>
    <ul v-show="isOpen" class="options-list">
      <li v-for="(option, index) in result" :class="{'highlighted': index === highlightedPosition}" @mouseenter="highlightedPosition = index" @mousedown="select">
        <slot name="item" :data="option"></slot>
      </li>
    </ul>
  </div>
  <div class="search-component" v-else>
    <p class="control has-icon has-icon-right">
      <input type="search" class="input is-large" :placeholder="placeholder" @keydown.enter="select" @input="onInput($event.target.value)" :value="value">
      <i class="fa fa-angle-down"></i>
    </p>
  </div>
</template>



<style>
    .mapplic-pin{
        /*background-color: transparent!important;    */
    }
    /* INTERACTIVE ELEMENTS */
    /* clickable elements */
    .mapplic-clickable:not(g),
    g.mapplic-clickable > * {
    	opacity: 1;
    	/*fill: #b7a6bd*/;
    }
    
    /* hovered elements */
    .mapplic-clickable:not(g):hover,
    g.mapplic-clickable:hover > * {
    	opacity: 1;
    	fill: #be7bf4;
    }
    
    /* active elements */
    .mapplic-active,
    a.mapplic-active > path,
    g.mapplic-active > * {
    	fill: #a366d4;
    	opacity: 1.0 !important;
    }
    .mapplic-coordinates {
        visibility: hidden;
    }
</style>