<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="margin-90"></div>
        <div class="row" v-if="currentPost">
            <div class="col-md-8 margin-60">
                <div id="currentPost">
                    <div class="row">
                        <div class="col-sm-3 col-md-2">
                            <p class="details-promo-date">{{currentPost.publish_date | moment("ddd", timezone)}}</p>
                            <p class="details-promo-day">{{currentPost.publish_date | moment("D", timezone)}}</p>
                            <p class="details-promo-date">{{currentPost.publish_date | moment("MMM", timezone)}}</p>
                        </div>
                        <div class="col-sm-9 col-md-10">
                            <div class="hidden-mobile">
                                <social-sharing :url="shareURL(currentPost.slug)" :title="currentPost.title" :description="currentPost.body" :quote="truncate(currentPost.body)" twitter-user="NorthParkCenter" :media="currentPost.image_url" inline-template>
                                    <div class="blog-social-share">
                                        <h5>Share</h5>
                                        <network network="facebook">
                                            <i class="fa fa-facebook-square"></i>
                                        </network>
                                        <network network="twitter">
                                            <i class="fa fa-twitter-square"></i>
                                        </network>
                                        <network network="pinterest">
                                            <i class="fa fa-pinterest-square"></i>
                                        </network>
                                    </div>
                                </social-sharing>
                            </div>
                            <h5 class="blog-details-category">{{ tagString(currentPost.tag) }}</h5>
                            <h2 class="">{{currentPost.title}}</h2> 
                            <h5 class="blog-author">By {{currentPost.author}} | {{currentPost.publish_date | moment("MM-D-YYYY", timezone)}}</h5>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-2"></div>
                        <div class="col-md-10">
                            <img class="blog-image" :src="currentPost.image_url"/>
                            <div class="margin-60" v-html="currentPost.html_body"></div>
                        </div>
                    </div>
                    <div class="visible-mobile">
                        <social-sharing :url="shareURL(currentPost.slug)" :title="currentPost.title" :description="currentPost.body" :quote="truncate(currentPost.body)" twitter-user="NorthParkCenter" :media="currentPost.image_url" inline-template>
                            <div class="blog-social-share">
                                <network network="facebook">
                                    <i class="fa fa-facebook-square"></i>
                                </network>
                                <network network="twitter">
                                    <i class="fa fa-twitter-square"></i>
                                </network>
                                <network network="pinterest">
                                    <i class="fa fa-pinterest-square"></i>
                                </network>
                                <h5>Share</h5>
                            </div>
                        </social-sharing>
                        <hr>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <affix class="sidebar-menu" relative-element-selector="#currentPost" style="width: 300px">
                    <div class="sidebar">
                        <div class="sidebar-container" v-if="currentPost && relatedPost">
                            <h5>Related Blogs</h5>
                            <router-link :to="{ name: 'newsDetails', params: { id: relatedPost.slug }}">
                                <img :src="relatedPost.image_url"/>
                                <p>{{relatedPost.title }}</p>
                            </router-link>
                            <div class="visible-mobile margin-90"></div>
                            <hr class="visible-mobile">
                        </div>
                        <div class="sidebar-container">
                            <h5>Get Connected</h5>
                            <p>Subscribe to our newsletter and receive insider information on events, exclusive sales, special offers and much more.</p>
                            <div class="blog-newsletter-container">
                                <form action="https://mobilefringe.createsend.com/t/d/s/jhithd/" method="post">
                                    <input class="" id="fieldEmail" name="cm-jhithd-jhithd" type="email" required placeholder="Enter Your Email"/>
                                    <button class="news-submit" type="submit"><i class="fa fa-angle-right" aria-hidden="true"></i></button>
                                </form>
                            </div>
                            <div class="visible-mobile margin-90"></div>
                            <hr class="visible-mobile">
                        </div>
                        <div class="sidebar-container" v-if="instaFeed">
                            <h5>Follow Us On Instagram</h5>
                            <div class="insta-feed-container">
                                <div class="insta-feed-image" v-for="item in instaFeed">
                                    <a :href="item.link" target="_blank">
                                        <img :src="item.images.thumbnail.url"/>
                                    </a>
                                </div>
                            </div>
                            <div class="visible-mobile margin-90"></div>
                        </div>
                    </div>
                </affix>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <p class="page-breadcrumb">{{property.name}}&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;News&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;<span v-if="currentPost">{{currentPost.title}}</span></p>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta", "vue-social-sharing"], function(Vue, moment, tz, VueMoment, Meta, SocialSharing) {
    
        return Vue.component("news-details-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    currentBlog: null,
                    mainBlog: null,
                    currentPost: null,
                    socialFeed: null,
                    instaFeed: null
                }
            },
            mounted () {
                this.currentStore
                this.currentDetails
            },
            beforeRouteEnter(to, from, next) {
                next(vm => {
                    // access to component instance via `vm`
                    var blogName = "main";
                    vm.currentPost = vm.findBlogPostBySlug(blogName, to.params.id);
                    if (vm.currentPost === null || vm.currentPost === undefined){
                        vm.$router.replace({ name: '404'});
                    }
                    
                    // SOCIAL JSON
                    vm.$store.dispatch('LOAD_PAGE_DATA', {url:"http://northside.mallmaverick.com/api/v2/northside/social.json"}).then(response => {
                        vm.socialFeed = response.data;
                    }, error => {
                        console.error("Could not retrieve data from server. Please check internet connection and try again.");
                        vm.$router.replace({ name: '404'});
                    });
                })
            },
            beforeRouteUpdate(to, from, next) {
                var blogName = "main";
                this.currentPost = this.findBlogPostBySlug(blogName, to.params.id);
                if (this.currentPost === null || this.currentPost === undefined){
                    this.$router.replace({ name: '404'});
                }
                
                // SOCIAL JSON
                // this.$store.dispatch('LOAD_PAGE_DATA', {url:this.property.mm_host + "api/v2/northside/social.json"}).then(response => {
                this.$store.dispatch('LOAD_PAGE_DATA', {url:"http://northside.mallmaverick.com/api/v2/northside/social.json"}).then(response => {
                    this.socialFeed = response.data;
                }, error => {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                    this.$router.replace({ name: '404'});
                });
            },
            watch: {
                socialFeed: function() {
                    var social_feed = this.socialFeed.social.instagram
                    var insta_feed = _.slice(social_feed, [0], [6])
                    this.instaFeed = insta_feed
                }
            },
            computed: {
                property() {
                    return this.$store.getters.getProperty;
                },
                timezone() {
                    return this.$store.getters.getTimezone;
                },
                findBlogPostBySlug() {
                    return this.$store.getters.findBlogPostBySlug;
                },
                blogs() {
                    return this.$store.getters.findBlogByName;
                },
                relatedPost(){
                    var main_blog = _.reverse(_.orderBy(this.blogs("main").posts, function(o) { return o.publish_date }));
                    if(this.currentPost.tag != null){
                        var current_post_tag = this.currentPost.tag[0]
                    }

                    var related_blog = [];
                    _.forEach(main_blog, function(value, key) {
                        if(value.tag != null){
                            var tag = value.tag[0];
                            if(tag === current_post_tag){
                                related_blog.push(value);
                            }                
                        }
                    });
                    
                    var related_post = related_blog[0]
                    if(related_post.id != this.currentPost.id){
                        return related_post;
                    } else {
                        return related_blog[1]
                    }
                }
            },
            methods: {
                tagString(val_tag){
                    var string = _.join(val_tag, ', ')  
                    return string
                },
                truncate(val_body){
                    var truncate = _.truncate(val_body, { 'length': 99, 'separator': ' ' });
                    return truncate;
                },
                shareURL(slug){
                    var share_url = "http://www.northparkcenter.com/news/" + slug
                    return share_url
                }
            }
        });
    });
</script>