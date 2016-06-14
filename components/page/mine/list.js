/**
 * Created by jack on 16/6/4.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");


module.exports = Vue.extend({
    template:__inline("list.html"),
    data: function () {
        return {
            list:[],
            loading:true
        }
    },
    methods:{
        render: function () {
            this.renderList();
        },
        renderList: function () {
            var self = this;
            self.loading = true;
            Service.myList(JSON.stringify({
                Token:this.$root.token,
                action:"list"
            }),function (rep) {
                self.list = rep;
                self.loading = false;
            })
        }
    },
    route:{
        data: function () {
            this.render();
        }
    }
});