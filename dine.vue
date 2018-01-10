<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="margin-42"></div>
        <div class="row">
            <div class="col-md-6">
                <div class="category-select-container">
                    <v-select v-model="selected" :options="categoryOptions" :searchable="false" class="category-select" :on-change="selectCategory()"></v-select>    
                </div>
            </div>
            <div class="col-md-6"></div>
        </div>
        <div class="dine-container" v-for="restaurant in currentSelection">
            <div class="row">
                <div class="col-md-12">
                    <div class="dine-image-container">
                        <img :src="restaurant.image_url" :alt="restaurant.name" />
                    </div> 
                    <div class="dine-content-container">
                        <h2 class="dine-name">{{restaurant.name}}</h2>
                        <router-link :to="{ name: 'storeDetails', params: { id: restaurant.slug }}" class="dine-link">Visit Store Page <i class="fa fa-angle-double-right" aria-hidden="true"></i></router-link>
                        <h5 class="dine-contact-header">Contact</h5>
                        <p>{{restaurant.phone}}</p>
                        <h5>Hours</h5>
                        <ul class="details-hours-list">
                            <li v-for="hour in storeHours(restaurant.store_hours)">
                               {{day_of_the_week(hour.day_of_week)}} - {{hour.open_time | moment("h A", timezone)}} - {{hour.close_time | moment("h A", timezone)}}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <p class="page-breadcrumb">{{property.name}}&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;<breadcrumbs>{{ breadcrumb }}</breadcrumbs>&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;Dine</p>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta", "v-select"], function(Vue, moment, tz, VueMoment, Meta, VueBreadcrumbs, vSelect) {
        return Vue.component("dine-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    breadcrumb: null,
                    selected: "Select A Category",
                    currentSelection: null,
                    categoryOptions: [
                        {'label':'Select A Category', 'value': 'all_dine'},
                        {'label':'Restaurants', 'value': 'restaurants'},
                        {'label':'NorthPark Cafes', 'value': 'cafes'},
                        {'label':'Coffee & Specialty Foods', 'value': 'specialty'}, 
                    ],
                    dine_stores: [],
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
                all_dine(){
                    var stores_by_category = this.$store.getters.storesByCategoryName;
                    var cafes = stores_by_category["NorthPark Cafés"]
                    var restaurants = stores_by_category["Restaurants / Beverages"]
                    var specialty = stores_by_category["Specialty Foods"]
                    var all_restaurants = _.concat(cafes, restaurants, specialty)
                    var filtered_restaurants = _.orderBy(_.uniqBy(all_restaurants, function(o){ return o.name; }), function(o){ return o.name; })
                    return filtered_restaurants
                },
                restaurants(){
                    var stores_by_category = this.$store.getters.storesByCategoryName;
                    var restaurants = stores_by_category["Restaurants / Beverages"];
                    var filtered_restaurants = _.uniqBy(restaurants, function(o){ return o.name; })
                    return filtered_restaurants
                },
                cafes(){
                    var stores_by_category = this.$store.getters.storesByCategoryName;
                    var cafes = stores_by_category["NorthPark Cafés"]
                    var filtered_restaurants = _.uniqBy(cafes, function(o){ return o.name; })
                    return filtered_restaurants
                },
                specialty(){
                    var stores_by_category = this.$store.getters.storesByCategoryName;
                    var specialty = stores_by_category["Specialty Foods"]
                    var filtered_restaurants = _.uniqBy(specialty, function(o){ return o.name; })
                    return filtered_restaurants
                },
                findHourById() {
                    return this.$store.getters.findHourById;
                },
            },
            methods: {
                selectCategory(){
                    if(this.selected.value == "restaurants"){
                        this.currentSelection = this.restaurants;
                    } else if (this.selected.value == "cafes") {
                        this.currentSelection = this.cafes;
                    } else if (this.selected.value == "specialty"){
                        this.currentSelection = this.specialty;
                    } else {
                        this.currentSelection = this.all_dine
                    }
                },
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
