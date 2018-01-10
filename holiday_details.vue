<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="margin-90"></div>
        <div class="row margin-90" v-if="currentBlog">
            <div class="col-md-12">
                <slick ref="slick" :options="slickOptions">
                    <div>
                        <img :src="currentBlog.image_url" class="" alt="">
                    </div>
                </slick>
            </div>
        </div>
        <div class="row margin-90" v-if="currentBlog">
            <div class="col-md-8">
                <h2 class="">{{currentBlog.title}}</h2> 
                <div v-html="currentBlog.html_body"></div>
            </div>
            <div class="col-md-4">
                <div class="sidebar">
                    <div class="sidebar-container">
                        <h5>Need to add sidebar info</h5>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <p class="page-breadcrumb">{{property.name}}&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;<breadcrumbs>{{ breadcrumb }}</breadcrumbs>&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;<span v-if="currentBlog">{{currentBlog.title}}</span></p>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta", "vue!vue-slick"], function(Vue, moment, tz, VueMoment, Meta, slick) {
        return Vue.component("holiday-details-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    breadcrumb: null,
                    currentBlog: null,
                    currentPost: null,
                    slickOptions: {
                        // arrows: true,
                        autoplay: false,
                        cssEase: 'linear',
                        dots: false,
                        // fade: true,
                        // infinite: true,
                        slidesToShow: 4,
                        speed: 500,
                    //     prevArrow: '.prev',
                    //     nextArrow: '.next'
                    }
                }
            },
            beforeRouteEnter(to, from, next) {
                next(vm => {
                    // access to component instance via `vm`
                    var blogName = "Holiday Attractions";
                    vm.currentBlog = vm.findBlogPostBySlug(blogName, to.params.id);
                    console.log(vm.currentBlog)
                    if (vm.currentBlog === null || vm.currentBlog === undefined){
                        vm.$router.replace({ name: '404'});
                    }
                })
            },
            beforeRouteUpdate(to, from, next) {
                var blogName = "Holiday Attractions";
                this.currentBlog = this.findBlogPostBySlug(blogName, to.params.id);
                console.log(this.currentBlog)
                if (this.currentBlog === null || this.currentBlog === undefined){
                    this.$router.replace({ name: '404'});
                }
            },
            computed: {
                findBlogPostBySlug () {
                    return this.$store.getters.findBlogPostBySlug;
                },
                property(){
                    return this.$store.getters.getProperty;
                },
                timezone () {
                    return this.$store.getters.getTimezone;
                }
            },
            // methods: {
            //     tagString(val_tag){
            //         var string = _.join(val_tag, ' , ')  
            //         return string
            //     },
            //     truncate(val_body){
            //         var truncate = _.truncate(val_body, { 'length': 99, 'separator': ' ' });
            //         return truncate;
            //     },
            //     shareURL(slug){
            //         var share_url = "http://www.northparkcenter.com/news/" + slug
            //         return share_url
            //     }
            // }
        });
    });
</script>