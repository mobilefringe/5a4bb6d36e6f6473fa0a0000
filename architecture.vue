<template>
    <div class=""> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div v-if="sectionOne">
            <div class="gallery-banner" v-bind:style="{ backgroundImage: 'url(' + sectionOne.image_url + ')' }"></div>
            <div class="page-container">
                <div class="row">
                    <div class="col-md-12">
                        <h1 class="art-quote">{{ sectionOne.description }}</h1>
                        <p class="art-quote-subtext">-{{ sectionOne.name }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="image-container">
            <div class="row image-row">
                <div class="col-sm-6 col-md-4" v-if="sectionTwo">
                    <div class="hover-container">
                        <div class="hover-image" v-bind:style="{ backgroundImage: 'url(' + sectionTwo.image_url + ')' }"></div>
                    	<div v-if="sectionTwo.url" class="hover-text-container hover-scale">
                		    <div class="hover-text">
                		        <h2>{{ sectionTwo.name }}</h2>
                		        <h4>{{ sectionTwo.description }}</h4>
                		        <router-link :to="sectionTwo.url">
                		            <h5>Learn More&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                		        </router-link>
            		        </div>
                    	</div>
                    	<div v-if="!sectionTwo.url"class="hover-text-container hover-scale">
                    		<div class="hover-text">
                    		    <h2>{{ sectionTwo.name }}</h2>
                    		    <h4>{{ sectionTwo.description }}</h4>
                    		    <a :href="sectionTwo.image_url" :data-lightbox="sectionTwo.name">
                    		        <h5>View Larger&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                    		    </a>
                		    </div>
                    	</div>
                    </div>
                </div>
                <div class="col-sm-6 col-md-4" v-if="sectionThree">
                    <div class="hover-container">
                        <div class="hover-image" v-bind:style="{ backgroundImage: 'url(' + sectionThree.image_url + ')' }"></div>
                    	<div v-if="sectionThree.url" class="hover-text-container hover-scale">
                		    <div class="hover-text">
                		        <h2>{{ sectionThree.name }}</h2>
                		        <h4>{{ sectionThree.description }}</h4>
                		        <router-link :to="sectionThree.url">
                		            <h5>Learn More&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                		        </router-link>
            		        </div>
                    	</div>
                    	<div v-if="!sectionThree.url"class="hover-text-container hover-scale">
                    		<div class="hover-text">
                    		    <h2>{{ sectionThree.name }}</h2>
                    		    <h4>{{ sectionThree.description }}</h4>
                    		    <a :href="sectionThree.image_url" :data-lightbox="sectionThree.name">
                    		        <h5>View Larger&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                		        </a>
                		    </div>
                    	</div>
                    </div>
                </div>
                <div class="col-md-4 hidden-mobile" v-if="sectionFour">
                    <div class="hover-container">
                        <div class="hover-image" v-bind:style="{ backgroundImage: 'url(' + sectionFour.image_url + ')' }"></div>
                    	<div v-if="sectionFour.url" class="hover-text-container hover-scale">
                		    <div class="hover-text">
                		        <h2>{{ sectionFour.name }}</h2>
                		        <h4>{{ sectionFour.description }}</h4>
                		        <router-link :to="sectionFour.url">
                		            <h5>Learn More&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
            		            </router-link>
            		        </div>
                    	</div>
                    	<div v-if="!sectionFour.url"class="hover-text-container hover-scale">
                    		<div class="hover-text">
                    		    <h2>{{ sectionFour.name }}</h2>
                    		    <h4>{{ sectionFour.description }}</h4>
                		        <a :href="sectionFour.image_url" :data-lightbox="sectionFour.name">
                    		        <h5>View Larger&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                    		    </a>
                		    </div>
                    	</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="image-row">
            <div class="hover-container" v-if="sectionFive">
                <div class="hover-image max-height" v-bind:style="{ backgroundImage: 'url(' + sectionFive.image_url + ')' }"></div>
            	<div v-if="sectionFive.url" class="hover-text-container hover-scale">
        		    <div class="hover-text">
        		        <h2>{{ sectionFive.name }}</h2>
        		        <h4>{{ sectionFive.description }}</h4>
        		        <router-link :to="sectionFive.url">
        		            <h5>Learn More&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
    		            </router-link>
    		        </div>
            	</div>
            	<div v-if="!sectionFive.url"class="hover-text-container hover-scale">
            		<div class="hover-text">
            		    <h2>{{ sectionFive.name }}</h2>
            		    <h4>{{ sectionFive.description }}</h4>
            		    <a :href="sectionFive.image_url" :data-lightbox="sectionFive.name">
            		        <h5>View Larger&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
            		    </a>
        		    </div>
            	</div>
            </div>
        </div>
        <div class="page-container">
            <div class="row">
                <div class="col-md-12">
                    <div class="story-content" v-if="currentPage" v-html="currentPage.body"></div>
                </div>
            </div>
        </div>
        <div class="image-container">
            <div class="row image-row">
                <div class="hover-container" v-if="sectionSix">
                    <div class="hover-image mid-height" v-bind:style="{ backgroundImage: 'url(' + sectionSix.image_url + ')' }"></div>
                	<div v-if="sectionSix.url" class="hover-text-container hover-scale">
            		    <div class="hover-text">
            		        <h2>{{ sectionSix.name }}</h2>
            		        <h4>{{ sectionSix.description }}</h4>
            		        <router-link :to="sectionSix.url">
            		            <h5>Learn More&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
        		            </router-link>
        		        </div>
                	</div>
                	<div v-if="!sectionSix.url"class="hover-text-container hover-scale">
                		<div class="hover-text">
                		    <h2>{{ sectionSix.name }}</h2>
                		    <h4>{{ sectionSix.description }}</h4>
                		    <a :href="sectionSix.image_url" :data-lightbox="sectionSix.name">
                		        <h5>View Larger&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                		    </a>
            		    </div>
                	</div>
                </div>
            </div>
            <div class="row image-row">
                <div class="col-sm-6">
                    <div class="hover-container" v-if="sectionSeven">
                        <div class="hover-image" v-bind:style="{ backgroundImage: 'url(' + sectionSeven.image_url + ')' }"></div>
                    	<div v-if="sectionSeven.url" class="hover-text-container hover-scale">
                		    <div class="hover-text">
                		        <h2>{{ sectionSeven.name }}</h2>
                		        <h4>{{ sectionSeven.description }}</h4>
                		        <router-link :to="sectionSeven.url">
            		                <h5>Learn More&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
        		                </router-link>
            		        </div>
                    	</div>
                    	<div v-if="!sectionSeven.url"class="hover-text-container hover-scale">
                    		<div class="hover-text">
                    		    <h2>{{ sectionSeven.name }}</h2>
                    		    <h4>{{ sectionSeven.description }}</h4>
                    		    <a :href="sectionSeven.image_url" :data-lightbox="sectionSeven.name">
                    		        <h5>View Larger&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                    		    </a>
                		    </div>
                    	</div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="hover-container" v-if="sectionEight">
                        <div class="hover-image" v-bind:style="{ backgroundImage: 'url(' + sectionEight.image_url + ')' }"></div>
                        <div v-if="sectionEight.url" class="hover-text-container hover-scale">
                            <div class="hover-text">
                                <h2>{{ sectionEight.name }}</h2>
                                <h4>{{ sectionEight.description }}</h4>
                                <router-link :to="sectionEight.url">
                                    <h5>Learn More&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                                </router-link>
                            </div>
                        </div>
                        <div v-if="!sectionEight.url"class="hover-text-container hover-scale">
                            <div class="hover-text">
                                <h2>{{ sectionEight.name }}</h2>
                                <h4>{{ sectionEight.description }}</h4>
                                <a :href="sectionEight.image_url" :data-lightbox="sectionEight.name">
                                    <h5>View Larger&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-12 hidden-mobile">
                    <router-link to="/our-story/photo-gallery">
                        <h5 class="details-title">View Architecture Photo Gallery&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></h5>
                    </router-link>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <p class="page-breadcrumb">{{property.name}}&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;<breadcrumbs>{{ breadcrumb }}</breadcrumbs>&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;Architecture</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "jquery", "moment", "moment-timezone", "vue-moment", "vue-meta", "lightbox"], function(Vue, jQuery, moment, tz, VueMoment, Meta, Lightbox) {
        Vue.use(Meta);
        Vue.use(Lightbox);
        return Vue.component("architecture-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    breadcrumb: null,
                    currentPage: null,
                }
            },
            beforeRouteEnter (to, from, next) {
                next(vm => {
                    // access to component instance via `vm`
                    vm.$store.dispatch('LOAD_PAGE_DATA', {url:vm.property.mm_host + "/pages/northpark-architecture.json"}).then(response => {
                        vm.currentPage = response.data;
                    }, error => {
                        console.error("Could not retrieve data from server. Please check internet connection and try again.");
                        vm.$router.replace({ name: '404'});
                    });
                })
            },
            beforeRouteUpdate (to, from, next) {
                this.$store.dispatch('LOAD_PAGE_DATA', {url:this.property.mm_host + "/pages/northpark-architecture.json"}).then(response => {
                    this.currentPage = response.data;
                }, error => {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                    this.$router.replace({ name: '404'});
                });
            },
            computed: {
                property() {
                    return this.$store.getters.getProperty;
                },
                images() {
                    var repo = _.filter(this.$store.state.results.repos, function(o) { return o.name == "Architecture" })
                    var repo_images = _.orderBy(repo[0].images, function(o) { return o.id });
                    return repo_images
                },
                sectionOne(){
                    var sectionID = 35580
                    var sectionOne = [];
                    _.forEach(this.images, function(value, key) {
                        var itemID = value.id
                        if(itemID === sectionID){
                            sectionOne.push(value);
                        }
                    });
                    return sectionOne[0];
                },
                sectionTwo(){
                    var sectionID = 35581
                    var sectionTwo = [];
                    _.forEach(this.images, function(value, key) {
                        var itemID = value.id
                        if(itemID === sectionID){
                            sectionTwo.push(value);
                        }
                    });
                    return sectionTwo[0];
                },
                sectionThree(){
                    var sectionID = 35582
                    var sectionThree = [];
                    _.forEach(this.images, function(value, key) {
                        var itemID = value.id
                        if(itemID === sectionID){
                            sectionThree.push(value);
                        }
                    });
                    return sectionThree[0];
                },
                sectionFour(){
                    var sectionID = 35583
                    var sectionFour = [];
                    _.forEach(this.images, function(value, key) {
                        var itemID = value.id
                        if(itemID === sectionID){
                            sectionFour.push(value);
                        }
                    });
                    return sectionFour[0];
                },
                sectionFive(){
                    var sectionID = 35584
                    var sectionFive = [];
                    _.forEach(this.images, function(value, key) {
                        var itemID = value.id
                        if(itemID === sectionID){
                            sectionFive.push(value);
                        }
                    });
                    return sectionFive[0];
                },
                sectionSix(){
                    var sectionID = 35585
                    var sectionSix = [];
                    _.forEach(this.images, function(value, key) {
                        var itemID = value.id
                        if(itemID === sectionID){
                            sectionSix.push(value);
                        }
                    });
                    return sectionSix[0];
                },
                sectionSeven(){
                    var sectionID = 35586
                    var sectionSeven = [];
                    _.forEach(this.images, function(value, key) {
                        var itemID = value.id
                        if(itemID === sectionID){
                            sectionSeven.push(value);
                        }
                    });
                    return sectionSeven[0];
                },
                sectionEight(){
                    var sectionID = 35587
                    var sectionEight = [];
                    _.forEach(this.images, function(value, key) {
                        var itemID = value.id
                        if(itemID === sectionID){
                            sectionEight.push(value);
                        }
                    });
                    return sectionEight[0];
                }
            }
        });
    });
</script>