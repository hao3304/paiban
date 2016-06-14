/**
 * Created by jack on 16/6/4.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");

module.exports = Vue.extend({
    template:__inline("mine.html"),
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
            Service.dutylist(JSON.stringify({
                Token:this.$root.token
            }), function (rep) {
                self.list = rep;
                self.loading = false;
            })
        }
    },
    ready: function () {
        this.render();
    }
});