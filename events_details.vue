<template>
    <div> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="margin-90 hidden-mobile"></div>
        <div v-if="currentEvent">
            <div class="image-container">
                <img :src="currentEvent.image_url" class="margin-60" alt="" />
            </div>    
            <div class="page-container">
                <div class="row">
                    <div class="col-md-8">
                        <div class="details-store-info">
                            <h2 class="details-store-name">{{currentEvent.name}}</h2>
                            <h5 class="details-dates">{{ checkEventDates() }}</h5>
                            <p class="details-description">{{currentEvent.description}}</p>
                        </div>    
                    </div>
                    <div class="col-md-4">
                        <div class="sidebar">
                            <div class="sidebar-container" v-if="currentEvent && currentEvent.store">
                                <h5>Store Hours</h5>
                                <ul class="details-hours-list">
                                    <li v-for="store_hour in store_hours">
                                       {{day_of_the_week(store_hour.day_of_week)}} - {{store_hour.open_time | moment("h A", timezone)}} - {{store_hour.close_time | moment("h A", timezone)}}
                                        </span>
                                    </li>
                                </ul>
                                <router-link to="getStoreSlug()" active-class="active" exact>
                                    <a class="details-link">View Store Details <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                                </router-link>
                            </div>
                            <div class="sidebar-container" v-if="currentEvent && !currentEvent.store">
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
                        </div>    
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <p class="page-breadcrumb">{{property.name}}&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;<breadcrumbs>{{ breadcrumb }}</breadcrumbs>&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i><span v-if="currentEvent"> {{currentEvent.name}}</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment"], function(Vue, moment, tz, VueMoment) {
        return Vue.component("event-details-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    breadcrumb: null,
                    currentEvent: null,
                    store_hours: [],
                }
            },
            beforeRouteEnter (to, from, next) {
                next(vm => {
                    // access to component instance via `vm`
                    vm.currentEvent = vm.findEventBySlug(to.params.id);
                    if (vm.currentEvent === null || vm.currentEvent === undefined){
                        vm.$router.replace({ name: '404'});
                    }
                })
            },
            beforeRouteUpdate (to, from, next) {
                this.currentEvent = this.findEventBySlug(to.params.id);
                if (this.currentEvent === null || this.currentEvent === undefined){
                    this.$router.replace({ name: '404'});
                }
            },
            watch: {
                currentEvent: function() {
                    if(this.currentEvent.eventable_type == "Store"){
                        var vm = this;
                        var storeHours = [];
                        _.forEach(this.currentEvent.store.store_hours, function(value, key) {
                            storeHours.push(vm.findHourById(value));
                        });
                        this.store_hours = storeHours;
                    }
                }
            },
            computed: {
                property(){
                    return this.$store.getters.getProperty;
                },
                timezone() {
                    return this.$store.getters.getTimezone;
                },
                hours() {
                    var hours = _.filter(this.$store.state.results.hours, function(o) { return o.store_ids==null && o.is_holiday==0 })
                    return hours;
                },
                findHourById() {
                    return this.$store.getters.findHourById;
                },
                findEventBySlug () {
                    return this.$store.getters.findEventBySlug;
                },
            },
            methods: {
                checkEventType(val_eventable_type){
                    if(this.currentEvent.eventable_type == "Store"){
                        return true
                    }
                },
                getStoreSlug(){
                    if(this.currentEvent.eventable_type == "Store"){
                        var store_slug = "/stores/" + this.currentEvent.store.slug
                        return store_slug
                    }    
                },
                day_of_the_week(val_day){
                    weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                    return weekday[val_day];
                },
                checkEventDates(currentEvent){
                    var timezone = this.timezone
                    var start_date = moment(this.currentEvent.start_date).tz(timezone).format("MM-DD-YYYY")
                    var end_date = moment(this.currentEvent.end_date).tz(timezone).format("MM-DD-YYYY")
                    if(start_date === end_date){
                        var one_day_event = moment(start_date).format("dddd, MMMM D, YYYY")
                        return one_day_event
                    } else {
                        var multi_day_event = moment(start_date).format("dddd, MMMM D, YYYY") + " to " + moment(end_date).format("dddd, MMMM D, YYYY")
                        return multi_day_event
                    }
                }
            }
        });
    });
</script>
