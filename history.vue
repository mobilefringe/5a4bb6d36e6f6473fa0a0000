<template>
    <div> <!-- Without an outer container div this component template will not render -->
        <div class="margin-90 hidden-mobile"></div>
        <div class="image-container">
            <slick ref="slick" :options="slickOptions">
                <div v-for="banner in historyBanners" v-if="historyBanners">
                    <img :src="banner.image_url" class="" alt="">
                    <div class="page-container">
                        <h5 class="details-slider-title">{{ banner.name }}</h5>    
                    </div>
                </div>
            </slick>
        </div>
        <div class="page-container">
            <div class="row">
                <div class="col-md-8">
                    <h2>The History of NorthPark</h2>
                    <div class="visit-desc" v-if="history" v-html="history.body"></div>
                    <div class="hidden-mobile">
                        <router-link to="/photo-gallery">
                            <p class="details-link">
                                View History Photo Gallery <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                            </p>
                        </router-link>    
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="sidebar">
                        <p class="quote">Every company has a special responsibility to enrich the lives of its customers and the community. It should serve as a catalyst to link art and business for the benefit of all.</p>
                        <p class="quote-byline">-Raymond D. Nasher</p>
                    </div>    
                </div>
                
            </div>
        </div>
        <div class="margin-60 hidden-mobile"></div>
        <div class="image-container">
            <slick ref="slick" :options="slickOptions">
                <div v-for="banner in historyBanners" v-if="historyBanners">
                    <img :src="banner.image_url" class="" alt="">
                    <div class="page-container">
                        <h5 class="details-slider-title">{{ banner.name }}</h5>    
                    </div>
                </div>
            </slick>
        </div>
        <div class="page-container">
            <div class="row">
                <div class="col-md-8 col-md-push-4">
                    <h2>The 50th Anniversary</h2>
                    <div class="visit-desc" v-if="anniversary" v-html="anniversary.body"></div>
                    <div class="hidden-mobile">
                        <router-link to="/photo-gallery">
                            <p class="details-link">
                                View 50th Anniversary Photo Gallery <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                            </p>
                        </router-link>    
                    </div>
                </div>
                <div class="col-md-4 col-md-pull-8">
                    <div class="sidebar-left">
                        <p class="quote">THE 50TH ANNIVERSARY OF NORTHPARK CENTER LOREM IPSUM DOLOR SIT AMET, CONSECTETUER ADIPISCING ELIT, SED DIAM NONUMMY NIBH EUISMOD TINCIDUNT UT LAOREET DOLORE MAGNA AL.</p>
                        <p class="quote-byline">-Nancy A. Nasher</p>
                    </div>    
                </div>
            </div>
        </div>
        <div class="page-container">
            <div class="margin-30"></div>
            <div class="row">
                <div class="col-md-12">
                    <p class="page-breadcrumb">{{property.name}}&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;<breadcrumbs>{{ breadcrumb }}</breadcrumbs>&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i> History</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta", "vue!vue-slick"], function(Vue, moment, tz, VueMoment, Meta, slick) {
        Vue.use(Meta);
        return Vue.component("history-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    breadcrumb: null,
                    currentPage: null,
                    history: null,
                    anniversary: null,
                    slickOptions: {
                        arrows: true,
                        autoplay: true,
                        cssEase: 'linear',
                        dots: false,
                        fade: true,
                        infinite: true,
                        slidesToShow: 1,
                        speed: 500,
                        prevArrow: '.prev',
                        nextArrow: '.next'
                    }
                }
            },
            beforeRouteEnter (to, from, next) {
                next(vm => {
                    // access to component instance via `vm`
                    //History
                    vm.$store.dispatch('LOAD_PAGE_DATA', {url:vm.property.mm_host + "/pages/northpark-history.json"}).then(response => {
                        vm.history = response.data;
                    }, error => {
                        console.error("Could not retrieve data from server. Please check internet connection and try again.");
                        vm.$router.replace({ name: '404'});
                    });
                    //Anniversary
                    vm.$store.dispatch('LOAD_PAGE_DATA', {url:vm.property.mm_host + "/pages/northpark-50th-anniversary.json"}).then(response => {
                        vm.anniversary = response.data;
                    }, error => {
                        console.error("Could not retrieve data from server. Please check internet connection and try again.");
                        vm.$router.replace({ name: '404'});
                    });
                })
            },
            beforeRouteUpdate (to, from, next) {
                //History
                this.$store.dispatch('LOAD_PAGE_DATA', {url:this.property.mm_host + "/pages/northpark-history.json"}).then(response => {
                    this.history = response.data;
                }, error => {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                    this.$router.replace({ name: '404'});
                });
                //Anniversary
                this.$store.dispatch('LOAD_PAGE_DATA', {url:this.property.mm_host + "/pages/northpark-50th-anniversary.json"}).then(response => {
                    this.anniversary = response.data;
                }, error => {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                    this.$router.replace({ name: '404'});
                });
            },
            computed: {
                property(){
                    return this.$store.getters.getProperty;
                },
                timezone() {
                    return this.$store.getters.getTimezone;
                },
                hours(){
                    var hours = _.filter(this.$store.state.results.hours, function(o) { return o.store_ids==null && o.is_holiday==0 })
                    return hours;
                },
                historyBanners() {
                    var repo = _.filter(this.$store.state.results.repos, function(o) { return o.name == "history banners" })
                    var repo_images = repo[0].images
                    return repo_images
                },
            },
            methods: {
                day_of_the_week(val_day){
                    weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                    return weekday[val_day];
                },
            }
        });
    });
</script>
