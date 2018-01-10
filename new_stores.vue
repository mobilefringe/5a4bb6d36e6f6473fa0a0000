<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="margin-42"></div>
        <div v-if="newStoresList" class="">
            <div class="row margin-30">
                <div class="col-md-12">
                    <h2>New Stores</h2>
                    <hr>
                </div>
            </div>
            <div class="row dine-container" v-for="store in newStoresList">
                <div class="col-md-12">
                    <div class="dine-image-container">
                        <img :src="store.image_url" :alt="store.name" />
                    </div>
                    <div class="dine-content-container">
                        <h2 class="dine-name">{{store.name}}</h2>
                        <router-link :to="{ name: 'storeDetails', params: { id: store.slug }}" class="dine-link">Visit Store Page <i class="fa fa-angle-double-right" aria-hidden="true"></i></router-link>
                        <div v-if="store.phone">
                            <h5 class="dine-contact-header">Contact</h5>
                            <p>{{store.phone}}</p>
                        </div>
                        <div v-if="store.store_hours">
                            <h5>Hours</h5>
                            <ul class="details-hours-list">
                                <li v-for="hour in storeHours(store.store_hours)">
                                   {{day_of_the_week(hour.day_of_week)}} - {{hour.open_time | moment("h A", timezone)}} - {{hour.close_time | moment("h A", timezone)}}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="comingSoonList" class="margin-60">
            <div class="row margin-30">
                <div class="col-md-12">
                    <h2>Coming Soon</h2>
                    <hr>
                </div>
            </div>
            <div class="row dine-container" v-for="store in comingSoonList">
                <div class="col-md-12">
                    <div class="dine-image-container">
                        <img :src="store.image_url" :alt="store.name" />
                    </div>
                    <div class="dine-content-container">
                        <h2 class="dine-name">{{store.name}}</h2>
                        <router-link :to="{ name: 'storeDetails', params: { id: store.slug }}" class="dine-link">Visit Store Page <i class="fa fa-angle-double-right" aria-hidden="true"></i></router-link>
                        <div v-if="store.phone">
                            <h5 class="dine-contact-header">Contact</h5>
                            <p>{{store.phone}}</p>
                        </div>
                        <div v-if="store.store_hours">
                            <h5>Hours</h5>
                            <ul class="details-hours-list">
                                <li v-for="hour in storeHours(store.store_hours)">
                                   {{day_of_the_week(hour.day_of_week)}} - {{hour.open_time | moment("h A", timezone)}} - {{hour.close_time | moment("h A", timezone)}}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <p class="page-breadcrumb">{{property.name}}&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;<breadcrumbs>{{ breadcrumb }}</breadcrumbs>&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;New Stores</p>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, moment, tz, VueMoment, Meta) {
        return Vue.component("new-stores-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    breadcrumb: null,
                    hours: []
                }
            },
            computed: {
                property(){
                    return this.$store.getters.getProperty;
                },
                timezone () {
                    return this.$store.getters.getTimezone;
                },
                newStoresList() {
                    return this.$store.getters.findNewStores;
                },
                comingSoonList() {
                    return this.$store.getters.findComingSoonStores;
                },
                findHourById() {
                    return this.$store.getters.findHourById;
                }
            },
            methods: {
                storeHours(restaurant_hours){
                    var vm = this;
                    var storeHours = [];
                    _.forEach(restaurant_hours, function(value, key) {
                        storeHours.push(vm.findHourById(value));
                    });
                    return storeHours
                },
                day_of_the_week(val_day){
                    weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                    return weekday[val_day];
                }
            },
        });
    });
</script>
