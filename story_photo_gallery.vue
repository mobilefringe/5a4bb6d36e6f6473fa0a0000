<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="margin-60"></div>
        <div class="row margin-30">
            <div class="col-md-6">
                <div class="category-select-container">
                    <v-select v-model="selected" :options="categoryOptions" :searchable="false" class="category-select" :on-change="selectCategory()"></v-select>    
                </div>
            </div>
            <div class="col-md-6">
                <p>Launch</p>
            </div>
        </div>
        <div class="row margin-60">
            <div class="col-md-12">
                <p v-if="!currentSelection">Sorry, there are currently no images to display.</p>    
            </div>
            <div class="col-sm-4 col-md-3" v-if="currentSelection" v-for="item in currentSelection">
                <div class="gallery-item-container">
                    <div class="gallery-image-container">
                        <img :src="item.image_url" />
                    </div>
                    <div class="gallery-content-container">
                        <h5 class="details-title">{{item.name}}</h5>        
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <p class="page-breadcrumb">{{property.name}}&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;<breadcrumbs>{{ breadcrumb }}</breadcrumbs>&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i> Photo Gallery</p>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta", "v-select", "vue-pure-lightbox"], function(Vue, moment, tz, VueMoment, Meta, vSelect, Lightbox) {
        Vue.use(Meta);
        // Vue.use(Lightbox);
        
        return Vue.component("story-photo-gallery-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    selected: "History",
                    currentSelection: null,
                    categoryOptions: [
                        {'label':'History', 'value': 'history'},
                        {'label':'50th Anniversary', 'value': 'anniversary'},
                        {'label':'Event', 'value': 'event'}, 
                        {'label':'Landscaping', 'value': 'landscaping'}, 
                        {'label':'Architecture', 'value': 'architecture'}, 
                    ],
                }
            },
            mounted () {
                this.currentSelection = this.historyGallery;
            },
            computed: {
                property(){
                    return this.$store.getters.getProperty;
                },
                timezone () {
                    return this.$store.getters.getTimezone;
                },
                events() {
                    var events = this.$store.getters.processedEvents;
                    var promotions = this.$store.getters.processedPromos;
                    var merge = _.concat(events, promotions);
                    var sorted = _.orderBy(merge, function(o) { return o.start_date })
                    return sorted
                },
                historyGallery() {
                    var repo = _.filter(this.$store.state.results.repos, function(o) { return o.name == "history slideshow" })
                    var repo_images = repo[0].images
                    return repo_images
                },
                anniversaryGallery() {
                    
                },
                eventGallery() {
                    
                },
                landscapingGallery() {
                    var repo = _.filter(this.$store.state.results.repos, function(o) { return o.name == "landscaping slideshow" })
                    var repo_images = repo[0].images
                    return repo_images
                },
                architectureGallery() {
                    var repo = _.filter(this.$store.state.results.repos, function(o) { return o.name == "architecture slideshow" })
                    var repo_images = repo[0].images
                    return repo_images
                },
            },
            methods: {
                selectCategory(){
                    console.log(this.selected)
                    if(this.selected.value == "history"){
                        this.currentSelection = this.historyGallery;
                    } else if (this.selected.value == "anniversary") {
                        this.currentSelection = this.anniversaryGallery;
                    } else if (this.selected.value == "event"){
                        this.currentSelection = this.eventGallery;
                    } else if (this.selected.value == "landscaping"){
                        this.currentSelection = this.landscapingGallery;
                    } else if (this.selected.value == "architecture"){
                        this.currentSelection = this.architectureGallery;
                    }
                },
            },
        });
    });
</script>
