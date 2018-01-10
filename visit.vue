<template>
    <div> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="page-banner" v-if="pageBanner">
            <div class="gallery-banner" v-bind:style="{ backgroundImage: 'url(' + pageBanner.image_url + ')' }"></div>
        </div>
        <div class="page-container">
            <div class="row">
                <div class="col-md-4 col-md-push-8">
                    <div class="sidebar">
                        <div class="sidebar-container">
                            <h5>Hours</h5>
                            <ul class="sidebar-hours-list">
                                <li v-for="hour in hours">
                                   {{day_of_the_week(hour.day_of_week)}} - {{hour.open_time | moment("h A", timezone)}} - {{hour.close_time | moment("h A", timezone)}}
                                </li>
                            </ul> 
                            <router-link to="/hours" active-class="active" exact>
                                <a class="details-link">View Detailed Hours <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                            </router-link>
                        </div>
                        <div class="sidebar-container">
                            <h5 class="">Find Us</h5>
                            <p>
                                {{property.name}}<br/>
                                {{property.address1}}<br/>
                                {{property.city}}, {{property.province_state}} {{property.postal_code}}<br/>
                                {{property.contact_phone}}
                            </p>
                            <p>Northpark Center Concierge</p>
                            <router-link to="" active-class="active" exact>
                                <a class="details-link">Get Directions <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="col-md-8 col-md-pull-4">
                    <div class="" v-if="valet">
                        <h2 class="visit-title">Valet & Parking</h2>
                        <div class="visit-desc" v-if="valet" v-html="truncate(valet.body)"></div>
                        <router-link to="/pages/northpark-parking-valet-page" active-class="active" exact>
                            <p class="visit-link details-link">Learn More <i class="fa fa-angle-double-right" aria-hidden="true"></i></p>
                        </router-link>
                        <hr class="hidden-mobile">
                        <div class="visible-mobile margin-120"></div>
                    </div>
                    <div class="" v-if="concierge">
                        <h2 class="visit-title">Concierge</h2>
                        <div class="visit-desc" v-if="concierge" v-html="truncate(concierge.body)"></div>
                        <router-link to="/pages/northpark-concierge-services" active-class="active" exact>
                            <p class="visit-link details-link">Learn More <i class="fa fa-angle-double-right" aria-hidden="true"></i></p>
                        </router-link>
                        <hr class="hidden-mobile">
                        <div class="visible-mobile margin-120"></div>
                    </div>
                    <div class="" v-if="giftCards">
                        <h2 class="visit-title">Northpark Gold & Gift Cards</h2>
                        <div class="visit-desc" v-if="giftCards" v-html="truncate(giftCards.body)"></div>
                        <router-link to="/pages/northpark-northpark-gold-gift-cards" active-class="active" exact>
                            <p class="visit-link details-link">Learn More <i class="fa fa-angle-double-right" aria-hidden="true"></i></p>
                        </router-link>
                        <hr class="hidden-mobile">
                        <div class="visible-mobile margin-120"></div>
                    </div>
                    <div class="" v-if="tourism">
                        <h2 class="visit-title">Tourism</h2>
                        <div class="visit-desc" v-if="tourism" v-html="truncate(tourism.body)"></div>
                        <router-link to="/visit/tourism" active-class="active" exact>
                            <p class="visit-link details-link">Learn More <i class="fa fa-angle-double-right" aria-hidden="true"></i></p>
                        </router-link>
                        <hr class="hidden-mobile">
                        <div class="visible-mobile margin-120"></div>
                    </div>
                    <div class="" v-if="contact">
                        <h2 class="visit-title">Contact</h2>
                        <div class="visit-desc" v-if="contact" v-html="truncate(contact.body)"></div>
                        <router-link to="/pages/northpark-contact-us" active-class="active" exact>
                            <p class="visit-link details-link">Learn More <i class="fa fa-angle-double-right" aria-hidden="true"></i></p>
                        </router-link>
                    </div>
                </div>
                <div class="margin-90"></div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <p class="page-breadcrumb">{{property.name}}&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;<breadcrumbs>{{ breadcrumb }}</breadcrumbs></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, moment, tz, VueMoment, Meta) {
        Vue.use(Meta);
        return Vue.component("visit-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    valet: null,
                    concierge: null, 
                    giftCards: null,
                    tourism: null,
                    contact: null
                }
            },
            beforeRouteEnter (to, from, next) {
                next(vm => {
                    // access to component instance via `vm`
                    //Valet
                    vm.$store.dispatch('LOAD_PAGE_DATA', {url:vm.property.mm_host + "/pages/northpark-parking-valet-page.json"}).then(response => {
                        vm.valet = response.data;
                    }, error => {
                        console.error("Could not retrieve data from server. Please check internet connection and try again.");
                        vm.$router.replace({ name: '404'});
                    });
                    //Concierge
                    vm.$store.dispatch('LOAD_PAGE_DATA', {url:vm.property.mm_host + "/pages/northpark-concierge-services.json"}).then(response => {
                        vm.concierge = response.data;
                    }, error => {
                        console.error("Could not retrieve data from server. Please check internet connection and try again.");
                        vm.$router.replace({ name: '404'});
                    });
                    //Gift Cards
                    vm.$store.dispatch('LOAD_PAGE_DATA', {url:vm.property.mm_host + "/pages/northpark-northpark-gold-gift-cards.json"}).then(response => {
                        vm.giftCards = response.data;
                    }, error => {
                        console.error("Could not retrieve data from server. Please check internet connection and try again.");
                        vm.$router.replace({ name: '404'});
                    });     
                    //Tourism
                    vm.$store.dispatch('LOAD_PAGE_DATA', {url:vm.property.mm_host + "/pages/northpark-tourism.json"}).then(response => {
                        vm.tourism = response.data;
                    }, error => {
                        console.error("Could not retrieve data from server. Please check internet connection and try again.");
                        vm.$router.replace({ name: '404'});
                    }); 
                    //Contact
                    vm.$store.dispatch('LOAD_PAGE_DATA', {url:vm.property.mm_host + "/pages/northpark-contact-us.json"}).then(response => {
                        vm.contact = response.data;
                    }, error => {
                        console.error("Could not retrieve data from server. Please check internet connection and try again.");
                        vm.$router.replace({ name: '404'});
                    }); 
                })
            },
            beforeRouteUpdate (to, from, next) {
                //Valet
                this.$store.dispatch('LOAD_PAGE_DATA', {url:this.property.mm_host + "/pages/northpark-parking-valet-page.json"}).then(response => {
                    this.valet = response.data;
                }, error => {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                    this.$router.replace({ name: '404'});
                });
                //Concierge
                this.$store.dispatch('LOAD_PAGE_DATA', {url:this.property.mm_host + "/pages/northpark-concierge-services.json"}).then(response => {
                    this.concierge = response.data;
                }, error => {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                    this.$router.replace({ name: '404'});
                });
                //Gift Cards
                this.$store.dispatch('LOAD_PAGE_DATA', {url:this.property.mm_host + "/pages/northpark-northpark-gold-gift-cards.json"}).then(response => {
                    this.giftCards = response.data;
                }, error => {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                    this.$router.replace({ name: '404'});
                });
                //Tourism
                this.$store.dispatch('LOAD_PAGE_DATA', {url:this.property.mm_host + "/pages/northpark-tourism.json"}).then(response => {
                    this.giftCards = response.data;
                }, error => {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                    this.$router.replace({ name: '404'});
                });
                //Contact
                this.$store.dispatch('LOAD_PAGE_DATA', {url:this.property.mm_host + "/pages/northpark-contact-us.json"}).then(response => {
                    this.giftCards = response.data;
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
                pageBanner() {
                    var repo = _.filter(this.$store.state.results.repos, function(o) { return o.name == "Visit" })
                    var repo_images = repo[0].images[0]
                    return repo_images
                }
            },
            methods: {
                truncate(val_body){
                    var truncate = _.truncate(val_body, { 'length': 350, 'separator': ' ' });
                    return truncate;
                },
                day_of_the_week(val_day){
                    weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                    return weekday[val_day];
                },
            }
        });
    });
</script>
