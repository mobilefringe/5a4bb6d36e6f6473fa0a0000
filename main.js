require.config({
    paths: {
        'Vue': 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue',
        'vue_router': 'https://cdnjs.cloudflare.com/ajax/libs/vue-router/2.7.0/vue-router.min',
        'axios': 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.16.1/axios.min',
        'jquery': 'https://code.jquery.com/jquery-3.2.1.min',
        'lodash': 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min',
        'moment': 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment-with-locales.min',
        'moment-timezone': 'https://momentjs.com/downloads/moment-timezone-with-data-2012-2022.min',
        'vue2-filters': 'https://cdn.jsdelivr.net/vue2-filters/0.1.8/vue2-filters.min',
        'vue': 'https://mmvue.codecloudapp.com/require-vuejs.min',
        'vuex': 'https://cdnjs.cloudflare.com/ajax/libs/vuex/2.3.1/vuex.min',
        'vue-i18n': 'https://cdnjs.cloudflare.com/ajax/libs/vue-i18n/6.1.1/vue-i18n.min',
        'text': 'https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min',
        'json': 'https://unpkg.com/requirejs-plugins-current@1.0.3/src/json',
        'js-cookie': 'https://cdnjs.cloudflare.com/ajax/libs/js-cookie/2.1.4/js.cookie.min',
        'vue-meta': 'https://unpkg.com/vue-meta@1.0.4/lib/vue-meta.min',
        'Fuse': 'https://cdnjs.cloudflare.com/ajax/libs/fuse.js/3.0.4/fuse.min',
        'store': 'https://mmvue.codecloudapp.com/store',
        'vue-moment': 'https://mmvue.codecloudapp.com/vue-moment',
        //append a dummy query string so requireJS doesn't auto-append .js to the end of the url
        'today_hours': 'https://mmvue.codecloudapp.com/today_hours.vue?noext', 
        'search-component': 'https://mmvue.codecloudapp.com/search-component.vue?noext',
        'vue-simple-spinner': 'https://cdn.jsdelivr.net/npm/vue-simple-spinner@1.2.8/dist/vue-simple-spinner.min',
        'vue-breadcrumbs': 'https://cdn.jsdelivr.net/npm/vue-breadcrumbs@1.1.2/dist/vue-breadcrumbs.min',
        'slick': 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min',
        'vue-slick': 'https://mmvue.codecloudapp.com/slick.vue?noext',
        'vue-paginate': 'https://cdnjs.cloudflare.com/ajax/libs/vue-paginate/3.5.1/vue-paginate',
        'vue-social-sharing': 'https://cdn.jsdelivr.net/npm/vue-social-sharing@2.3.1/dist/vue-social-sharing.min',
        'vue-select': 'https://cdn.jsdelivr.net/npm/vue-select@2.3.0/dist/vue-select.min',
        'lightbox': 'https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.10.0/js/lightbox.min',
        'vue-affix': 'https://cdn.jsdelivr.net/npm/vue-affix@0.2.4/dist/vue-affix',
        'VCalendar': 'https://unpkg.com/v-calendar@0.5.1/lib/v-calendar.min',
        'mousewheel' : 'https://mallmaverick.cdn.speedyrails.net/javascripts/mapsvg/jquery.mousewheel',
        'mapplic' : 'https://codecloud.cdn.speedyrails.net/sites/59bac7db6e6f644f22ba0000/text/javascript/1487363250000/mapplic',
        'hammer' : 'https://codecloud.cdn.speedyrails.net/sites/59bac7db6e6f644f22ba0000/text/javascript/1484859750000/hammer.min',
        'mapplic-map'
    }
});

require(['Vue', 'vue2-filters', 'vue_router', 'routes', 'store', 'vue-i18n', 'locales', 'moment', 'vue-meta', 'vue!search-component', 'vue-simple-spinner', 'vue-breadcrumbs', 'vue-paginate', 'vue-social-sharing', 'vue-select', 'lightbox', 'vue-affix', 'vue-calendar'], function (Vue, Vue2Filters, VueRouter, appRoutes, store, VueI18n, messages, moment, Meta, SearchComponent, Spinner, VueBreadcrumbs, VuePaginate, SocialSharing, VueSelect, Viewer, Lightbox, VueAffix, VCalendar) {
    
    Vue.use(Meta);
    Vue.use(VueRouter);
    Vue.use(Vue2Filters);
    Vue.use(VueI18n);
    Vue.use(VueBreadcrumbs);
    Vue.use(SocialSharing);
    Vue.use(Lightbox);

    /* initialize router */
    const router = new VueRouter({
        mode: 'history',
        routes: appRoutes
    });

    /* initialize i18n */
    const i18n = new VueI18n({
        locale: 'en-ca',
        fallbackLocale: 'en-ca',
        messages,
    });
    
    Vue.component('vue-simple-spinner', Spinner);
    Vue.component('v-select', VueSelect.VueSelect);
    // Vue.component('affix', VueAffix)
    Vue.component('v-calendar', VCalendar);

    /* bootstrap app */
    const vm = new Vue({
        el: '#app',
        data: function () {
            return {
                dataLoaded: false,
                isHomePage: true,
                isOpen: false,
                show_menu: false,
                show_search: false,
                suggestionAttribute: 'name',
                search: '',
                breadcrumb: this.$breadcrumbs,
                showStoresMenu: false,
                showArtMenu: false,
                showVisitMenu: false,
                showStoryMenu: false,
                showHolidayMenu: false,
            }
        },
        mounted () {
            this.$store.state;
        },
        created() {
            // make an async call to the data store to initialize the locale 
            //(i.e. it will check if there is a locale value saved in cookie, otherwise it will default to EN)
            this.$store.dispatch('INITIALIZE_LOCALE');
          
            this.$store.dispatch('LOAD_META_DATA');
    
            // make an async call to load mall data
            this.$store.dispatch('LOAD_MALL_DATA', {url:"https://www.mallmaverick.com/api/v4/northpark/all.json"}).then(response => {
                this.dataLoaded = true;
            }, error => {
                console.error("Could not retrieve data from server. Please check internet connection and try again.");
            });
        },
        watch: {
            // watcher to update vue-i18n when the locale has been changed by the user
            locale: function(val, oldVal) {
                this.$i18n.locale = val;
                moment.locale(val);
            },
            $route : function () {
                if(this.$route.path == "/") {
                    this.isHomePage = false;
                } else {
                    this.isHomePage = true;
                }
                if(this.$route.path == "/stores" || this.$route.path == "/dine" || this.$route.path == "/new-doors") {
                    this.showStoresMenu = true;
                } else {
                    this.showStoresMenu = false;
                }
                if(this.$route.path == "/art" || this.$route.path == "/art/special-exhibition" || this.$route.path == "/art/photo-gallery") {
                    this.showArtMenu = true;
                } else {
                    this.showArtMenu = false;
                }
                if(this.$route.path == "/visit" || this.$route.path == "/visit/tourism" || this.$route.path == "/pages/northpark-parking-valet-page" || this.$route.path == "/pages/northpark-concierge-services" || this.$route.path == "/pages/northpark-northpark-gold-gift-cards" || this.$route.path == "/pages/northpark-contact-us") {
                    this.showVisitMenu = true;
                } else {
                    this.showVisitMenu = false;
                }
                if(this.$route.path == "/our-story" || this.$route.path == "/our-story/history" || this.$route.path == "/our-story/landscaping" || this.$route.path == "/our-story/architecture" || this.$route.path == "/our-story/photo-gallery") {
                    this.breadcrumb = "Our Story";
                    this.showStoryMenu = true;
                } else {
                    this.showStoryMenu = false;
                }
                if(this.$route.path == "/holiday") {
                    this.showHolidayMenu = true;
                } else {
                    this.showHolidayMenu = false;
                }
            }
        },
        computed: {
            // computed property for locale which returns locale value from data store and also updates the data store with new locale information
            locale: {
                get() {
                    return this.$store.state.locale;
                },
                set(value) {
                    this.$store.commit('SET_LOCALE', { lang: value });
                }
            },
            property(){
                return this.$store.getters.getProperty;
            },
            copyright_year() {
                return moment().year();
            },
            processedStores() {
                return this.$store.getters.processedStores;
            }
        },
        methods: {
            // utility method to allow user to change locale value
            changeLocale: function(val) {
                this.locale = val; // this will update the data store, which in turn will trigger the watcher to update the locale in the system
            },
            //this function helps home Page show and hide menu using the prop showMenu
            toggleMenu() {
                this.show_menu = !this.show_menu;
            },
            toggleSearch() {
                this.show_search = !this.show_search;
            },
            onOptionSelect(option) {
                console.log('Selected option:', option);
                this.$router.push("/stores/" + option.slug);
            }
        },
        router: router,
        store,
        i18n
    });
});
