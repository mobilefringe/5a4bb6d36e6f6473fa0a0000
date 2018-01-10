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
                <h4 class="pull-right"><a href="">Download Art Tour Map</a></h4>
            </div>
        </div>
        <div class="row margin-60">
            <div class="col-md-12">
                <p v-if="!currentSelection">Sorry, there are currently no images to display.</p>    
            </div>
            <div class="col-md-3" v-if="currentSelection" v-for="item in currentSelection">
                <div class="gallery-item-container">
                    <router-link :to="{ name: 'artDetails', params: { id: item.slug }}">
                        <div class="gallery-image-container">
                            <div class="gallery-image" v-bind:style="{ backgroundImage: 'url(' + getMainImage(item) + ')' }"></div>
                            <!--<img :src="getMainImage(item)" />-->
                        </div>
                        <div class="gallery-content-container">
                            <h5 class="details-title">{{item.name}}</h5>  
                            <!--<h5 class="details-title">{{item.name}}</h5> This field needs to be added in the CMS -->
                        </div>
                    </router-link>
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
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta", "v-select"], function(Vue, moment, tz, VueMoment, Meta, vSelect) {
        Vue.use(Meta);

        return Vue.component("art-photo-gallery-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    breadcrumb: null,
                    selected: "Sort Gallery",
                    currentSelection: null,
                    categoryOptions: [
                        {'label':'Sort Gallery', 'value': 'title'},
                        {'label':'By Title', 'value': 'title'},
                        {'label':'Artist Name', 'value': 'artist'}
                    ],
                }
            },
            mounted () {
                this.currentSelection = this.pois;
                console.log(this.currentSelection)
            },
            computed: {
                property(){
                    return this.$store.getters.getProperty;
                },
                timezone () {
                    return this.$store.getters.getTimezone;
                },
                pois() {
                    var name = "Art Tour";
                    var pois = this.$store.getters.findPointOfInterest(name)
                    var sortByName = _.orderBy(pois.locations, function(o) { return o.name });
                    return sortByName
                },
                sortByArtist() {

                }
            },
            methods: {
                selectCategory(){
                    console.log(this.selected)
                    if(this.selected.value == "title"){
                        this.currentSelection = this.pois;
                    } else if (this.selected.value == "artist") {
                        this.currentSelection = this.sortByArtist;
                    } else {
                        this.currentSelection = this.pois;
                    }
                },
                getMainImage(item){
                    main_image = "";
                    if(item.items != null){
                        var items = item.items
                        if(items != null){
                            var images = items[0].images
                            if(images != null){
                                var main_image = images[0].image_url
                                return main_image
                            } else {
                                return "http://placehold.it/300x300"
                            }
                        }
                    } 
                }
            },
        });
    });
</script>
