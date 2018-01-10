<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="margin-90"></div>
        <div class="row">
            <div class="col-md-12">
                <img class="margin-60" src="http://via.placeholder.com/960x460"/>
            </div>
        </div>
        <div class="row">
            <div class="col-md-8">
                <h2>The Magazine</h2>
            </div>
            <div class="col-md-4">
                <div class="sidebar">
                    <div class="sidebar-container">
                        <h5>Subscribe</h5>
                        <p>Sign up to recieve a physical copy of NorthPark The Magazine.</p>
                        <div class="blog-newsletter-container">
                            <form action="https://mobilefringe.createsend.com/t/d/s/jhithd/" method="post">
                                <input class="" id="fieldEmail" name="cm-jhithd-jhithd" type="email" required placeholder="Subscribe to Magazine"/>
                                <button class="news-submit" type="submit"><i class="fa fa-angle-right" aria-hidden="true"></i></button>
                            </form>
                        </div>
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
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, moment, tz, VueMoment, Meta) {
        Vue.use(Meta);
        
        return Vue.component("magazine-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    breadcrumb: null,
                }
            },
            computed: {
                property(){
                    return this.$store.getters.getProperty;
                },
                timezone() {
                    return this.$store.getters.getTimezone;
                }
            },
            methods: {
                
            }
        });
    });
</script>
