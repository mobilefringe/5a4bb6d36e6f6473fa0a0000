<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <svg-map :store_source="getStoreSource"></svg-map>
        <!--<div class="row">-->
        <!--    <div class="col-md-12">-->
        <!--        <ul class="">-->
        <!--            <li><a v-on:click="changeMode('alphabetical')">Alphabetical</a></li>-->
        <!--            <li><a v-on:click="changeMode('category')">Category</a></li>-->
        <!--        </ul>    -->
        <!--    </div>-->
        <!--</div>-->
        
        <!--<hr/>-->
        <!--<div class="row">-->
        <!--    <div class="col-md-12" v-for="(stores, index) in storesByAlphaIndex" v-if="listMode === 'alphabetical'">-->
        <!--        <div class="list_header">-->
        <!--            <b>{{index}}</b>-->
        <!--            <hr/>-->
        <!--        </div>-->
        <!--        <div class="store-section" v-for="store in stores">-->
        <!--            <router-link :to="{ name: 'storeDetails', params: { id: store.slug }}">{{store.name}}</router-link>-->
        <!--            <hr/>-->
        <!--        </div>-->
        <!--    </div>-->
        <!--    <div class="col-md-12" v-for="(stores, index) in storesByCategoryName" v-if="listMode === 'category'">-->
        <!--        <div class="list_header">-->
        <!--            <b>{{index}}</b>-->
        <!--            <hr/>-->
        <!--        </div>-->
        <!--        <div class="store-section" v-for="store in stores">-->
        <!--            <router-link :to="{ name: 'storeDetails', params: { id: store.slug }}">{{store.name}}</router-link>-->
        <!--            <hr/>-->
        <!--        </div>-->
        <!--    </div>-->
        <!--</div>-->
        <!--<div class="row">-->
        <!--    <div class="col-md-12">-->
        <!--        <p class="page-breadcrumb">{{property.name}}&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i>&nbsp;<breadcrumbs>{{ breadcrumb }}</breadcrumbs></p>-->
        <!--    </div>-->
        <!--</div>-->
    </div>
</template>

<script>
    define(["Vue","vue!mapplic-map"], function(Vue, MapplicComponent) {
        return Vue.component("stores-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    breadcrumb: null,
                    listMode: "alphabetical",
                }
            },
            methods: {
                changeMode (mode) {
                    this.listMode = mode;
                }
            },
            computed: {
                property(){
                    return this.$store.getters.getProperty;
                },
                timezone() {
                    return this.$store.getters.getTimezone;
                },
                storesByAlphaIndex() {
                    return this.$store.getters.storesByAlphaIndex;
                },
                storesByCategoryName() {
                    return this.$store.getters.storesByCategoryName;
                },
                allStores() {
                    return this.$store.getters.processedStores;
                },
                floor1Stores() {
                    return this.$store.getters.processedStores;
                },
                floor2Stores() {
                    return this.$store.getters.processedStores;
                },
                getStoreSource () {
                    // floor1_stores= $.grep(stores, function( n, i ) {
                    //     return ( n.z_coordinate == 1);
                    // });
                    // var floor2_stores= $.grep(stores, function( n, i ) {
                    //     return ( n.z_coordinate == 2);
                    // });
                    
                    // // console.log(floor1_stores,floor2_stores);
                    // var mall_json = {};
                    // var landmarks = {};
                    // mall_json.mapwidth = "1000";
                    // mall_json.mapheight = "1000";
                    // mall_json.categories=[]; 
                    // var store_cats = getStoreCategories();
                    // // console.log(store_cats);
                    // $.each(store_cats, function(key,val){
                    //     var temp_val = {};
                    //     temp_val.id = val.id;
                    //     temp_val.title= val.name;
                    //     temp_val.color= "#b7a6bd";
                    //     temp_val.show="true";
                    //     mall_json.categories.push(temp_val);
                    // });
                    // mall_json.levels=[]; 
                    // // need to add the following for each floor we want to configure.
                    // var floor_1 ={};
                    // floor_1.id = "first-floor";
                    // floor_1.title = "Floor 1";
                    // floor_1.map = "//www.mallmaverick.com/system/site_images/photos/000/034/516/original/Northpark_-_Map_-_Floor_1_-modifed_for_Mapplic.svg";
                    // //"//www.mallmaverick.com/system/site_images/photos/000/034/516/original/Northpark_-_Map_-_Floor_1_-modifed_for_Mapplic.svg";
                    // floor_1.minimap = "//codecloud.cdn.speedyrails.net/sites/59bac7db6e6f644f22ba0000/image/jpeg/1510940237000/Northpark_-_Map_-_Floor_1_-_Mapplic_Test_1.jpg";
                    // floor_1.show="true";
                    // floor_1.locations = [];
                    // $.each(floor1_stores, function(key,val){
                    //     //for testing limiting the store numbers to this
                    //     // if(key < 10) {
                    //         var temp_val = {};
                    //         temp_val.id = val.svgmap_region;
                    //         temp_val.title= val.name;
                    //         temp_val.about = $.trim(val.description).substring(0, 200).split(" ").slice(0, -1).join(" ") + "...";;
                    //         temp_val.category = val.categories[1];
                    //         // temp_val.thumbnail = "";
                    //         temp_val.link = "/stores/"+val.slug;
                    //         temp_val.pin = "hidden";
                    //         // temp_val.action = "none";
                    //         temp_val.fill = "#";
                    //         // if(val.store_front_url_abs.indexOf("missing") == -1){
                    //         //     temp_val.thumbnail=val.store_front_url_abs;
                    //         // }
                    //         //get svg's wifth/height by checking the map
                    //         var svg_width =  1530;
                    //         var svg_height = 1358;
                            
                    //         temp_val.x = val.x_coordinate/svg_width;
                    //         temp_val.y = val.y_coordinate/svg_height;
                    //         floor_1.locations.push(temp_val);
                    //     // }
                    //     // else {
                    //     //     return;
                    //     // }
                    // });
                    // mall_json.levels.push(floor_1);
                    // // need to add the following for each floor we want to configure.
                    // var floor_2 ={};
                    // floor_2.id = "second-floor";
                    // floor_2.title = "Floor 2";
                    // floor_2.map = "//www.mallmaverick.com/system/site_images/photos/000/034/472/original/Northpark_-_Map_-_Floor_2_-_Mapplic_Test_1.svg";
                    // floor_2.minimap = "//codecloud.cdn.speedyrails.net/sites/59bac7db6e6f644f22ba0000/image/jpeg/1510956613000/Northpark_-_Map_-_Floor_2_-_Mapplic_Test_1.jpg";
                    // floor_2.locations = [];
                    // $.each(floor2_stores, function(key,val){
                    //     //for testing limiting the store numbers to this
                    //     // if(key > 10 && key < 20) {
                    //         var temp_val = {};
                    //         temp_val.id = val.svgmap_region;
                    //         temp_val.title= val.name;
                    //         temp_val.about = $.trim(val.description).substring(0, 200).split(" ").slice(0, -1).join(" ") + "...";;
                    //         temp_val.category = val.categories[1];
                    //         temp_val.thumbnail = "";
                    //         temp_val.pin = "hidden";
                    //         temp_val.link = "/stores/"+val.slug;
                    //         if(val.store_front_url_abs.indexOf("missing") == -1){
                    //             temp_val.thumbnail=val.store_front_url_abs;
                    //         }
                    //         //get svg's wifth/height by checking the map
                    //         var svg_width = 1545;
                    //         var svg_height = 1368;
                            
                    //         temp_val.x = val.x_coordinate/svg_width;
                    //         temp_val.y = val.y_coordinate/svg_height;
                    //         floor_2.locations.push(temp_val);
                    //     // }
                    //     // else {
                    //     //     return;
                    //     // }
                    // });
                    
                    // mall_json.levels.push(floor_2);
                }
            }
        });
    });
</script>