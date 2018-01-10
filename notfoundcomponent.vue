<template>
    <div class="page-container">
        <div class="margin-90"></div>
        <div class="row margin-30">
            <div class="col-md-8">
                <h2>{{text}}</h2>
                <div class="margin-60"></div>
            </div>
            <div class="col-md-4">
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
        </div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, moment, tz, VueMoment, Meta) {
        Vue.use(Meta);
        return Vue.component("not-found-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {"text": "The page you are looking for cannot be found."};
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
                    console.log(repo_images)
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
