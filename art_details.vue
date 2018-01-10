<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="margin-90"></div>
        <div class="row" v-if="currentPoint">
            <div class="col-md-12 margin-60">
                <slick ref="slick" :options="slickOptions">
                    <div v-for="image in artImages" >
                        <img :src="image.image_url" alt="">
                    </div>
                </slick>
            </div>
            <div class="col-md-8">
                <div class="details-store-info">
                    <div class="margin-30">
                        <h2>{{currentPoint.items[0].name}}</h2>
                        <h5>{{currentPoint.items[0].description}}</h5>
                        <h4>Location</h4>    
                    </div>
                    <p class="details-description">{{currentPoint.items[0].description_2}}</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="sidebar">
                    <div class="sidebar-container" v-if="currentPoint">
                        <h5></h5>
                        <p>This content needs to be added</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <p class="page-breadcrumb">
                    <span>{{property.name}}&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;</span>
                    <breadcrumbs>{{ breadcrumb }}</breadcrumbs>&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;
                    <span v-if="currentPoint">{{currentPoint.name }}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<style>
   .slick-slide img {
       max-height: 460px;
   } 
</style>
<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta", "vue!vue-slick"], function(Vue, moment, tz, VueMoment, Meta, slick) {
        Vue.use(Meta);
        
        return Vue.component("art-details-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    breadcrumb: null,
                    currentPoint: null,
                    artImages: [],
                    slickOptions: {
                        arrows: true,
                        autoplay: true,
                        centerMode: true,
                        centerPadding: '20px',
                        cssEase: 'linear',
                        dots: false,
                        infinite: true,
                        slidesToShow: 1,
                        speed: 1000,
                        variableWidth: true
                        // prevArrow: '.prev',
                        // nextArrow: '.next'
                    }
                }
            },
            beforeRouteEnter(to, from, next) {
                next(vm => {
                    // access to component instance via `vm`
                    var poiName = "Art Tour";
                    vm.currentPoint = vm.findPointOfInterestBySlug(poiName, to.params.id);
                    if (vm.currentPoint === null || vm.currentPoint === undefined){
                        vm.$router.replace({ name: '404'});
                    }
                })
            },
            beforeRouteUpdate(to, from, next) {
                var poiName = "Art Tour";
                this.currentPoint = this.findPointOfInterestBySlug(poiName, to.params.id);
                if (this.currentPoint === null || this.currentPoint === undefined){
                    this.$router.replace({ name: '404'});
                }
            },
            watch: {
                currentPoint: function() {
                    console.log(this.currentPoint);
                    var vm = this;
                    var images = [];
                    
                    if(this.currentPoint.items != null){
                        var items = this.currentPoint.items[0]
                        if(items.images != null){
                            var image_gallery = items.images
                            this.artImages = image_gallery
                        }
                    }
                }
            },
            computed: {
                findPointOfInterestBySlug() {
                    return this.$store.getters.findPointOfInterestBySlug;
                },
                property(){
                    return this.$store.getters.getProperty;
                },
                timezone () {
                    return this.$store.getters.getTimezone;
                },
            },
            methods: {
                
            }
        });
    });
</script>