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
                source: {
                    type: Object,
                    required: true
                },
                height: {
                    type: Number,
                    default: 1000
                },
                landmark: {
                    type: Array,
                    default: this.getEmptyArray
                },
                loadingText: {
                    type: String,
                    default: "Loading, please wait..."
                },
                zoom: {
                    type: Boolean,
                    default: true
                },
                zoomButtons: {
                    type: Object,
                    default: this.getZoomBtn
                },
                pan: {
                    type: Boolean,
                    default: true
                },
                cursor: {
                    type: String,
                    default: 'pointer'
                },
                responsive: {
                    type: Boolean,
                    default: true
                },
                zoomLimit: {
                    type: Array,
                    default: this.getZoomLimit
                }
            },
            data() {
                return {
                    isOpen: false,
                    highlightedPosition: 0,
                    //search: '',
                    fuse: null,
                    result: []
                }
            },
            computed: {
                /*
                fOptions() {
                  const re = new RegExp(this.search, 'i')
                  console.log(this.result);
                  return this.result.filter(o => o[this.suggestionAttribute].match(re))
                },
                */
                options() {
                    var options = {
                        caseSensitive: this.caseSensitive,
                        includeScore: this.includeScore,
                        includeMatches: this.includeMatches,
                        tokenize: this.tokenize,
                        matchAllTokens: this.matchAllTokens,
                        findAllMatches: this.findAllMatches,
                        shouldSort: this.shouldSort,
                        threshold: this.threshold,
                        location: this.location,
                        distance: this.distance,
                        maxPatternLength: this.maxPatternLength,
                        minMatchCharLength: this.minMatchCharLength,
                        keys: this.keys
                    }
                    if (this.id !== '') {
                        options.id = this.id
                    }
                    if (this.autocomplete == false || this.keys === undefined) {
                        options.keys = []
                        options.keys.push(this.suggestionAttribute)
                    }
                    return options
                }
            },
            watch: {
                value() {
                    if (this.value.trim() === '') {
                        if (this.defaultAll) {
                            this.result = this.list
                        } else {
                            this.result = []
                        }
                    } else {
                        this.result = this.fuse.search(this.value.trim())
                    }
                },
                result() {
                    this.$parent.$emit(this.eventName, this.result)
                }
            },
            methods: {
                onInput(value) {
                    this.highlightedPosition = 0
                    this.isOpen = !!value
                    this.$emit('input', value) // emit event back to parent
                },
                moveDown() {
                    if (!this.isOpen) {
                        return
                    }
                    this.highlightedPosition =
                        (this.highlightedPosition + 1) % this.result.length
                },
                moveUp() {
                    if (!this.isOpen) {
                        return
                    }
                    this.highlightedPosition = this.highlightedPosition - 1 < 0 ? this.result.length - 1 : this.highlightedPosition - 1
                },
                select() {
                    if (this.autocomplete) {
                        const selectedOption = this.result[this.highlightedPosition]
                        this.$emit('select', selectedOption)
                        this.isOpen = false
                        this.$emit('input', selectedOption[this.suggestionAttribute])
                    } else {
                        const selectedOption = this.result;
                        this.$emit('select', selectedOption)
                    }
                },
                initFuse() {
                    this.fuse = new Fuse(this.list, this.options);
                    if (this.defaultAll) {
                        this.result = this.list
                    }
                }
            },
            mounted() {
                this.initFuse()
            }
        });
    });
</script>