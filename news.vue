<template>
    <div> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div v-if="pageBanner">
            <div class="gallery-banner" v-bind:style="{ backgroundImage: 'url(' + pageBanner.image_url + ')' }"></div>
        </div>
        <div class="page-container">
            <div class="margin-30"></div>
            <div class="row margin-30">
                <div class="col-md-6"></div>
                <div class="col-md-6">
                    <div class="category-select-container right">
                        <v-select v-model="selected" :options="categoryOptions" :searchable="false" class="category-select" :on-change="selectCategory()"></v-select>    
                    </div>
                </div>
            </div>
            <paginate name="currentSelection" v-if="currentSelection" :list="currentSelection" class="paginate-list margin-60">
                <div class="row details-promo-container" v-for="blog in paginated('currentSelection')" v-if="currentSelection">
                    <div class="col-sm-12 col-md-6 col-md-push-6">
                        <div class="blog-image-container">
                            <img :src="blog.image_url" class="store_logo" alt="">    
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-md-pull-6">
                        <div class="row">
                            <div class="col-sm-3 col-md-2">
                                <p class="details-promo-date">{{blog.publish_date | moment("ddd", timezone)}}</p>
                                <p class="details-promo-day">{{blog.publish_date | moment("D", timezone)}}</p>
                                <p class="details-promo-date">{{blog.publish_date | moment("MMM", timezone)}}</p>
                            </div>
                            <div class="col-sm-9 col-md-10">
                                <p class="blog-category">{{ tagString(blog.tag) }}</p>
                                <h2 class="">{{blog.title}}</h2> 
                                <p class="blog-author">By {{blog.author}} | {{blog.publish_date | moment("MM-D-YYYY", timezone)}}</p>
                                <p class="details-promo-desc">{{ truncate(blog.body) }}</p> 
                                <router-link :to="{ name: 'newsDetails', params: { id: blog.slug }}">
                                    <a class="details-link">Read More <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
                                </router-link>    
                            </div>
                        </div>
                    </div>
                </div>
            </paginate>
            <div class="row margin-60">
                <div class="col-md-12">
                    <paginate-links for="currentSelection" :limit="9" :show-step-links="true"></paginate-links>
                    <paginate-links for="currentSelection" :simple="{ next: 'Next »', prev: '« Back' }"></paginate-links>
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
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta", "vue-paginate", "v-select"], function(Vue, moment, tz, VueMoment, Meta, VuePaginate, vSelect) {
        Vue.use(Meta);
        Vue.use(VuePaginate);
        
        return Vue.component("news-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    breadcrumb: null,
                    currentBlog: null,
                    paginate: ['currentSelection'],
                    selected: "Select A Category",
                    currentSelection: null,
                    categoryOptions: [
                        {'label':'Beauty', 'value': 'blogBeauty'},
                        {'label':'Charitable Partners', 'value': 'blogCharity'},
                        {'label':'Children', 'value': 'blogChildren'}, 
                        {'label':'Fashion', 'value': 'blogFashion'},
                        {'label':'Holiday', 'value': 'blogHoliday'},
                        {'label':'Lifestyle', 'value': 'blogLifestyle'},
                        {'label':'Luxury', 'value': 'blogLuxury'},
                        {'label':'Men', 'value': 'blogMen'},
                        {'label':'NorthPark50', 'value':'blogNorthPark50'}
                    ],
                }
            },
            mounted () {
                this.currentBlog = _.reverse(_.orderBy(this.blogs("main").posts, function(o) { return o.publish_date }));
                this.currentSelection = this.currentBlog;
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
                    var repo = _.filter(this.$store.state.results.repos, function(o) { return o.name == "News" })
                    var repo_images = repo[0].images[0]
                    return repo_images
                },
                blogs() {
                    return this.$store.getters.findBlogByName;
                },
                blogBeauty() {
                    var beauty_blog = [];
                    _.forEach(this.currentBlog, function(value, key) {
                        var tag_string = _.toLower(_.join(value.tag, ''));
                        var beauty_string = _.includes(tag_string, "beauty");
                        if(beauty_string === true){
                            beauty_blog.push(value);
                        }
                    });
                    return beauty_blog;
                },
                blogCharity() {
                    var charity_blog = [];
                    _.forEach(this.currentBlog, function(value, key) {
                        var tag_string = _.toLower(_.join(value.tag, ''));
                        var charity_string = _.includes(tag_string, "charitable_partners");
                        if(charity_string === true){
                            charity_blog.push(value);
                        }
                    });
                    return charity_blog;
                },
                blogChildren() {
                    var children_blog = [];
                    _.forEach(this.currentBlog, function(value, key) {
                        var tag_string = _.toLower(_.join(value.tag, ''));
                        var children_string = _.includes(tag_string, "children");
                        if(children_string === true){
                            children_blog.push(value);
                        }
                    });
                    return children_blog;    
                },
                blogFashion() {
                    var fashion_blog = [];
                    _.forEach(this.currentBlog, function(value, key) {
                        var tag_string = _.toLower(_.join(value.tag, ''));
                        var fashion_string = _.includes(tag_string, "fashion");
                        if(fashion_string === true){
                            fashion_blog.push(value);
                        }
                    });
                    return fashion_blog; 
                },
                blogHoliday() {
                    var holiday_blog = [];
                    _.forEach(this.currentBlog, function(value, key) {
                        var tag_string = _.toLower(_.join(value.tag, ''));
                        var holiday_string = _.includes(tag_string, "holiday");
                        if(holiday_string === true){
                            holiday_blog.push(value);
                        }
                    });
                    return holiday_blog; 
                },
                blogLifestyle() {
                    var lifestyle_blog = [];
                    _.forEach(this.currentBlog, function(value, key) {
                        var tag_string = _.toLower(_.join(value.tag, ''));
                        var lifestyle_string = _.includes(tag_string, "lifestyle");
                        if(lifestyle_string === true){
                            lifestyle_blog.push(value);
                        }
                    });
                    return lifestyle_blog; 
                },
                blogLuxury() {
                    var luxury_blog = [];
                    _.forEach(this.currentBlog, function(value, key) {
                        var tag_string = _.toLower(_.join(value.tag, ''));
                        var luxury_string = _.includes(tag_string, "luxury");
                        if(luxury_string === true){
                            luxury_blog.push(value);
                        }
                    });
                    return luxury_blog;     
                },
                blogMen() {
                    var men_blog = [];
                    _.forEach(this.currentBlog, function(value, key) {
                        var tag_string = _.toLower(_.join(value.tag, ''));
                        var men_string = _.includes(tag_string, "men");
                        if(men_string === true){
                            men_blog.push(value);
                        }
                    });
                    return men_blog;
                },
                blogNorthPark50() {
                    var northpark_blog = [];
                    _.forEach(this.currentBlog, function(value, key) {
                        var tag_string = _.toLower(_.join(value.tag, ''));
                        var northpark_string = _.includes(tag_string, "northpark");
                        if(northpark_string === true){
                            northpark_blog.push(value);
                        }
                    });
                    return northpark_blog;
                },
            },
            methods: {
                selectCategory(){
                    console.log(this.selected.value)
                    if(this.selected.value == "blogBeauty"){
                        this.currentSelection = this.blogBeauty;
                    } else if (this.selected.value == "blogCharity") {
                        this.currentSelection = this.blogCharity;
                    } else if (this.selected.value == "blogChildren"){
                        this.currentSelection = this.blogChildren;
                    } else if (this.selected.value == "blogFashion"){
                        this.currentSelection = this.blogFashion;
                    } else if (this.selected.value == "blogHoliday"){
                        this.currentSelection = this.blogHoliday;
                    } else if (this.selected.value == "blogLifestyle"){
                        this.currentSelection = this.blogLifestyle;
                    } else if (this.selected.value == "blogLuxury"){
                        this.currentSelection = this.blogLuxury;
                    } else if (this.selected.value == "blogMen"){
                        this.currentSelection = this.blogMen;
                    } else if (this.selected.value == "blogNorthPark50"){
                        this.currentSelection = this.blogNorthPark50;
                    } else {
                        this.currentSelection = this.currentBlog;
                    }
                },
                tagString(val_tag){
                    var string = _.join(val_tag, ' , ')  
                    return string
                },
                truncate(val_description){
                    var truncate = _.truncate(val_description, { 'length': 199, 'separator': ' ' });
                    return truncate;
                }
            }
        });
    });
</script>
