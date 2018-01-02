<template>
  <div style="position:relative;height:900px;overflow:hidden;">
    <div id="mapplic" class="mapplic"></div>
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

<script>
    define(["Vue", "mousewheel", "hammer", "mapplic"], function(Vue, mousewheel, hammer, mapplic) {
        return Vue.component('map-component', {
            template: template,
            props: {
                store_source: {
                    type: Object,
                    required: true
                },
                height: {
                    type: Number,
                    default: 1000
                },
                landmark: {
                    type: String,
                    default: null
                },
                mapfill: {
                    type: Boolean,
                    default: false
                },
                markers: {
                    type: Boolean,
                    default: true
                },
                minimap: {
                    type: Boolean,
                    default: true
                },
                sidebar: {
                    type: Boolean,
                    default: true
                },
                search: {
                    type: Boolean,
                    default: true
                },
                lightbox: {
                    type: Boolean,
                    default: false
                },
                deeplinking: {
                    type: Boolean,
                    default: true
                },
                clearbutton: {
                    type: Boolean,
                    default: true
                },
                zoombuttons: {
                    type: Boolean,
                    default: true
                },
                zoomoutclose: {
                    type: Boolean,
                    default: false
                },
                hovertip: {
                    type: Boolean,
                    default: false
                },
                tooltip: {
                    type: Object,
                    default: this.getTooltip
                },
                smartip: {
                    type: Boolean,
                    default: true
                },
                mousewheel: {
                    type: Boolean,
                    default: true
                },
                fullscreen: {
                    type: Boolean,
                    default: false
                },
                fillcolor: {
                    type: String,
                    default: "#4d5e6d"
                },
                action: {
                    type: String,
                    default: 'tooltip'
                },
                maxscale: {
                    type: Number,
                    default: 4
                },
                zoom: {
                    type: Boolean,
                    default: true
                },
            },
            data() {
                return {
                    isOpen: false,
                    highlightedPosition: 0,
                    //search: '',
                    fuse: null,
                    result: [],
                    developer: true
                }
            },
            computed: {
                options() {
                    var options = {
                        source: this.store_source,
                    	height: this.height,
                    	landmark: this.landmark,
                    	mapfill: this.mapfill,
                    	markers: this.markers,
                    	minimap: this.minimap,
                    	sidebar: this.sidebar,
                    	search: this.search,
                    	lightbox: this.lightbox,
                    	deeplinking: this.deeplinking,
                    	clearbutton: this.clearbutton,
                    	zoombuttons: this.zoombuttons,
                    	zoomoutclose: this.zoomoutclose,
                    	hovertip: this.hovertip,
                    	tooltip: this.tooltip,
                    	smartip: this.smartip,
                    	mousewheel: this.mousewheel,
                    	fullscreen: this.fullscreen,
                    	developer: this.developer,
                    	fillcolor: this.fillcolor,
                    	action: this.action,
                    	maxscale: this.maxscale,
                    	zoom: this.zoom
                    }
                    return options
                }
            },
            watch: {
                // value() {
                //     if (this.value.trim() === '') {
                //         if (this.defaultAll) {
                //             this.result = this.list
                //         } else {
                //             this.result = []
                //         }
                //     } else {
                //         this.result = this.fuse.search(this.value.trim())
                //     }
                // },
                // result() {
                //     this.$parent.$emit(this.eventName, this.result)
                // }
            },
            methods: {
                getTooltip () {
                    //   { thumb: true, desc: true, link: true }  
                    return  { thumb: true, desc: true, link: true };
                },
                initFuse () {
                  this.fuse = new Fuse(this.list, this.options);
                  if (this.defaultAll) {
                    this.result = this.list
                  }
                }
            },
            mounted() {
                this.initMapplic()
            }
        });
    });
</script>