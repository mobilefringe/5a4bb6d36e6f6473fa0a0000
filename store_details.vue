<template>
    <div class="" v-if="currentStore"> <!-- Without an outer container div this component template will not render -->
        <div class="margin-90 hidden-mobile"></div>
        <div class="image-container">
            <slick v-if="currentDetails" ref="slick" :options="slickOptions">
                <div v-for="asset in storeAssets" >
                    <img :src="asset.url" alt="">
                </div>
            </slick>
            <img v-if="!currentStore.assets" :src="currentStore.store_front_url_abs" alt="" />
        </div>
        <div class="page-container">
            <div class="row" >
                <div class="margin-60"></div>
                <div class="col-md-8">
                    <div class="details-store-info">
                        <h2 class="details-store-name">{{currentStore.name}}</h2>
                        <p class="details-description">{{currentStore.description}}</p>
                        <div class="details-reservation" v-if="currentStore && currentStore.website">
                            <div v-if="!isDine">
                                <a class="details-link" :href="'http://' + currentStore.website" target="_blank">View Store Website&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                            </div>
                            <div v-if="isDine">
                                <h5>Reservations</h5>
                                <a class="details-link" :href="'http://' + currentStore.website" target="_blank">Make Reservations&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                            </div>
                        </div>
                        <router-link to="/stores" active-class="active" exact>
                            <h5 class="details-link">View Northpark Center Map <i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                        </router-link>
                        <hr class="visible-mobile mobile-divider">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="sidebar">
                        <div class="sidebar-container" v-if="currentStore && currentStore.phone">
                            <h5 class="dine-contact-header">Contact</h5>
                            <p>{{currentStore.phone}}</p>
                        </div>
                        <div class="sidebar-container" v-if="currentStore && currentStore.store_hours">
                            <h5>Hours</h5>
                            <ul class="details-hours-list">
                                <li v-for="hour in hours">
                                   {{day_of_the_week(hour.day_of_week)}} - {{hour.open_time | moment("h A", timezone)}} - {{hour.close_time | moment("h A", timezone)}}
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div class="sidebar-container" v-if="currentStore && currentStore.keywords">
                            <h5>Ammenities</h5>
                            <p>{{currentStore.keywords}}</p>
                        </div>
                        <div class="sidebar-container" v-if="currentStore && currentStore.manager_name">
                            <h5>Manager</h5>
                            <p class="details-manager-name">{{currentStore.manager_name}}</p>
                        </div>    
                    </div>
                </div>
            </div>
            <div v-if="currentStore && currentStore.total_published_promos > 0">
                <div class="row">
                    <div class="col-md-12 details-promo-header">
                        <h5>Upcoming Events</h5>
                    </div>
                </div>
                <div v-for="(promo, index) in promotions" v-if="promotions" class="row details-promo-container" > <!-- v-bind:class="{details-promo-container-last : index === (promotions.length-1)}" -->
                    <div > <!-- v-class="{ details-promo-container-last: isLast($index) }"-->
                        <div class="col-sm-12 col-md-6 col-md-push-6">
                            <img :src="promo.promo_image_url_abs" class="details-promo-img" alt="">
                        </div>
                        <div class="col-sm-12 col-md-6 col-md-pull-6">
                            <div class="row">
                                <div class="col-sm-3 col-md-2">
                                    <p class="details-promo-date">{{promo.start_date | moment("ddd", timezone)}}</p>
                                    <p class="details-promo-day">{{promo.start_date | moment("D", timezone)}}</p>
                                    <p class="details-promo-date">{{promo.start_date | moment("MMM", timezone)}}</p>
                                </div>
                                <div class="col-sm-9 col-md-10">
                                    <h2 class="details-promo-name">{{promo.name}}</h2> 
                                    <h5 class="details-promo-store">{{promo.store.name}}</h5>
                                    <p class="details-promo-desc">{{ truncate(promo.description) }}</p> 
                                    <router-link :to="{ name: 'promotionDetails', params: { id: promo.slug }}">
                                        <h5 class="details-link">Read More <i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                                    </router-link>    
                                </div>
                            </div>    
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <p class="page-breadcrumb">
                        <span>{{property.name}}&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;</span>
                        <breadcrumbs>{{ breadcrumb }}</breadcrumbs>&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;
                        <span v-if="isNewStore"><router-link to="/new-doors">New Doors</router-link>&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;</span>
                        <span v-if="!isNewStore || isDine"><router-link to="/dine">Dine</router-link>&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;</span>
                        <span v-if="currentStore">{{currentStore.name }}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
     define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta", "vue!vue-slick"], function(Vue, moment, tz, VueMoment, Meta, slick){
        Vue.use(Meta);
        return Vue.component("store-details-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    currentStore: null,
                    currentDetails: null,
                    breadcrumb: null,
                    isDine: false,
                    isNewStore: false,
                    storeAssets: [],
                    promotions : [],
                    hours: [],
                    slickOptions: {
                        arrows: true,
                        autoplay: true,
                        cssEase: 'linear',
                        dots: false,
                        // fade: true,
                        infinite: true,
                        slidesToShow: 1,
                        speed: 1000,
                        // prevArrow: '.prev',
                        // nextArrow: '.next'
                    }
                }
            },
            mounted () {
                this.currentStore
                this.currentDetails
            },
            beforeRouteEnter(to, from, next) {
                next(vm => {
                    // access to component instance via `vm`
                    //Get Store Details
                    vm.currentStore = vm.findStoreBySlug(to.params.id);
                    if (vm.currentStore === null || vm.currentStore === undefined){
                        vm.$router.replace({ name: '404'});
                    }
                    
                    // Get Stores JSON
                    var store_id = vm.currentStore.id
                    vm.$store.dispatch('LOAD_PAGE_DATA', {url:vm.property.mm_host + "/api/v4/northpark/stores/" + store_id + "/store_files.json"}).then(response => {
                        vm.currentDetails = response.data;
                    }, error => {
                        console.error("Could not retrieve data from server. Please check internet connection and try again.");
                        vm.$router.replace({ name: '404'});
                    });
                })
            },
            beforeRouteUpdate(to, from, next) {
                //Store Details
                this.currentStore = this.findStoreBySlug(to.params.id);
                if (this.currentStore === null || this.currentStore === undefined){
                    this.$router.replace({ name: '404'});
                }
                
                //Stores JSON
                this.$store.dispatch('LOAD_PAGE_DATA', {url:this.property.mm_host + "/api/v4/northpark/stores/" + store_id + "/store_files.json"}).then(response => {
                    this.currentDetails = response.data;
                }, error => {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                    this.$router.replace({ name: '404'});
                });
            },
            watch: {
                currentStore: function() {
                    // console.log(this.currentStore)
                    var vm = this;
                    var storeHours = [];
                    _.forEach(this.currentStore.store_hours, function(value, key) {
                        storeHours.push(vm.findHourById(value));
                    });
                    this.hours = storeHours;
                    
                    if(this.currentStore.category_name != null) {
                        var category_name = this.currentStore.category_name
                        if(category_name == "NorthPark Cafés" || category_name == "Restaurants / Beverages" || category_name == "Specialty Foods"){
                            this.isDine = true;
                        } else {
                            this.isDine = false;
                        }    
                    }
                    
                    if(this.currentStore.is_coming_soon_store == true) {
                        this.isNewStore = true;
                    } else {
                        this.isNewStore = false;
                    }    
                    
                    var promos = [];
                    _.forEach(this.currentStore.promotions, function(value, key) {
                        promos.push(vm.findPromoById(value));
                    });
                    this.promotions = promos;
                },
                currentDetails: function() {
                    var vm = this;
                    var store_assets = [];
                    if(this.currentStore.assets != null){
                        _.forEach(this.currentDetails.store_files, function(value, key) {
                            value.url = "https://www.mallmaverick.com" + value.url 
                            store_assets.push(value);
                        });
                        this.storeAssets = store_assets; 
                    }
                }
            },
            computed: {
                findStoreBySlug() {
                    return this.$store.getters.findStoreBySlug;
                },
                findHourById() {
                    return this.$store.getters.findHourById;
                },
                findPromoById() {
                    return this.$store.getters.findPromoById;
                },
                property(){
                    return this.$store.getters.getProperty;
                },
                timezone() {
                    return this.$store.getters.getTimezone;
                }
            },
            methods: {
                truncate(val_description){
                    var truncate = _.truncate(val_description, { 'length': 249, 'separator': ' ' });
                    return truncate;
                },
                isLast(){
                        
                },
                day_of_the_week(val_day){
                    weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                    return weekday[val_day];
                }
            }
        });
    });
</script>