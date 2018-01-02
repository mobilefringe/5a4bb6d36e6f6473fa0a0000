<template>
  <div style="position:relative;height:900px;overflow:hidden;">
    <div id="mapplic" class="mapplic"></div>
    <!--<img src="//www.mallmaverick.com/system/site_images/photos/000/034/516/original/Northpark_-_Map_-_Floor_1_-modifed_for_Mapplic.svg" class="" alt="" style="visibility:hidden;position:absolute;top:0;left:0;z-index:-1;">-->
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