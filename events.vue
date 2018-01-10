<template>
    <div> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="margin-90 hidden-mobile"></div>
        <div class="image-container">
            <slick ref="slick" :options="slickOptions">
                <div v-for="banner in eventsBanners" v-if="eventsBanners">
                    <router-link to="/events" class=""> <!-- :to="banner.url" -->
                        <img class="margin-60" :src="banner.image_url" alt="">
                    </router-link>
                </div>
            </slick>
        </div>
        <div class="page-container">
            <div class="row">
                <p v-if="!currentSelection">Sorry, there are no events that match your search.</p>
                <div class="col-sm-12 col-md-5 col-md-push-7">
                    <!-- CALENDAR -->
                    <v-calendar :is-expanded='isExpanded'></v-calendar>
                    <div class="category-select-container right">
                        <v-select v-model="selected" :options="categoryOptions" :searchable="false" class="category-select" :on-change="selectCategory()"></v-select>    
                    </div>
                </div>
                <div class="col-sm-12 col-md-7 col-md-pull-5" v-if="currentSelection">
                    <div class="row" v-for="event in currentSelection">
                        <div class="hidden-xs col-sm-2">
                            <p class="details-promo-date">{{event.start_date | moment("ddd", timezone)}}</p>
                            <p class="details-promo-day">{{event.start_date | moment("D", timezone)}}</p>
                            <p class="details-promo-date">{{event.start_date | moment("MMM", timezone)}}</p>
                        </div>
                        <div class="col-sm-10">
                            <h5 class="details-dates">{{ checkEventDates(event) }}</h5>
                            <h2>{{ event.name }}</h2>
                            <p class="sub_title" v-if="event.store">{{ event.store.name }}</p><p class="sub_title" v-else>{{ property.name}}</p>
                            <router-link :to="{ name: 'eventDetails', params: { id: event.slug }}">
                                <p class="details-link">Learn More <i class="fa fa-angle-double-right" aria-hidden="true"></i></p>
                            </router-link>
                        </div>
                        <div class="col-sm-12">
                            <hr>    
                        </div>
                    </div>
                </div>
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
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta", "v-select", "vue-calendar", "vue!vue-slick"], function(Vue, moment, tz, VueMoment, Meta, vSelect, VCalendar, slick) {
        Vue.use(Meta);

        return Vue.component("events-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    breadcrumb: null,
                    selected: "All Events",
                    currentSelection: null,
                    // props: {
                        isDoublePaned: { type: Boolean, default: true },
                        isExpanded: { type: Boolean, default: false },
                        navVisibility: { type: String, default: 'focus' },
                        titlePosition: { type: String, default: 'center' },
                        titleTransition: { type: String, default: 'slide-h' },
                        weeksTransition: { type: String, default: 'slide-h' },
                    // },
                    categoryOptions: [
                        {'label':'All Events', 'value': 'all_events'},
                        {'label':'NorthPark Events', 'value': 'events'},
                        {'label':'In-Store Events', 'value': 'promotions'},
                        {'label':'Holiday Events', 'value': 'holiday'}, 
                    ],
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
            mounted () {
                this.currentSelection = this.events;
            },
            computed: {
                property(){
                    return this.$store.getters.getProperty;
                },
                timezone () {
                    return this.$store.getters.getTimezone;
                },
                eventsBanners() {
                    var repo = _.filter(this.$store.state.results.repos, function(o) { return o.name == "Events" })
                    var repo_images = repo[0].images
                    return repo_images
                },
                events() {
                    var events = this.$store.getters.processedEvents;
                    var promotions = this.$store.getters.processedPromos;
                    var merge = _.concat(events, promotions);
                    var sorted = _.orderBy(merge, function(o) { return o.end_date })
                    return sorted
                },
                propertyEvents() {
                    var events = _.orderBy(this.$store.getters.processedEvents, function(o) { return o.end_date }); 
                    return events
                },
                storeEvents() {
                    var promotions = _.orderBy(this.$store.getters.processedPromos, function(o) { return o.end_date });
                    return promotions
                },
                holidayEvents(){
                   var holiday_events = [];
                    _.forEach(this.$store.getters.processedEvents, function(value, key) {
                        var tag_string = _.toLower(_.join(value.tag, ''));
                        var holiday_string = _.includes(tag_string, "holiday");
                        if(holiday_string === true){
                            holiday_events.push(value);
                        }
                    });
                    return holiday_events;
                }
            },
            methods: {
                selectCategory(){
                    if(this.selected.value == "events"){
                        this.currentSelection = this.propertyEvents;
                    } else if (this.selected.value == "promotions") {
                        this.currentSelection = this.storeEvents;
                    } else if (this.selected.value == "holiday"){
                        this.currentSelection = this.holidayEvents;
                    } else {
                        this.currentSelection = this.events
                    }
                },
                checkEventDates(event){
                    var timezone = this.timezone
                    var start_date = moment(event.start_date).tz(timezone).format("MM-DD-YYYY")
                    var end_date = moment(event.end_date).tz(timezone).format("MM-DD-YYYY")
                    if(start_date === end_date){
                        var one_day_event = moment(start_date).format("dddd, MMMM D, YYYY")
                        return one_day_event
                    } else {
                        var multi_day_event = moment(start_date).format("dddd, MMMM D, YYYY") + " to " + moment(end_date).format("dddd, MMMM D, YYYY")
                        return multi_day_event
                    }
                }
            },
        });
    });
</script>
