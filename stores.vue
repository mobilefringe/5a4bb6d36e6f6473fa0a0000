<template>
    <div class="page-container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="row">
            <div class="col-md-12">
                <ul class="">
                    <li><a v-on:click="changeMode('alphabetical')">Alphabetical</a></li>
                    <li><a v-on:click="changeMode('category')">Category</a></li>
                </ul>    
            </div>
        </div>
        
        <hr/>
        <div class="row">
            <div class="col-md-12" v-for="(stores, index) in storesByAlphaIndex" v-if="listMode === 'alphabetical'">
                <div class="list_header">
                    <b>{{index}}</b>
                    <hr/>
                </div>
                <div class="store-section" v-for="store in stores">
                    <router-link :to="{ name: 'storeDetails', params: { id: store.slug }}">{{store.name}}</router-link>
                    <hr/>
                </div>
            </div>
            <div class="col-md-12" v-for="(stores, index) in storesByCategoryName" v-if="listMode === 'category'">
                <div class="list_header">
                    <b>{{index}}</b>
                    <hr/>
                </div>
                <div class="store-section" v-for="store in stores">
                    <router-link :to="{ name: 'storeDetails', params: { id: store.slug }}">{{store.name}}</router-link>
                    <hr/>
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
    define(["Vue"], function(Vue) {
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
                }
            }
        });
    });
</script>