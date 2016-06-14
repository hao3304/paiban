/**
 * Created by jack on 16/6/4.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");

module.exports = Vue.extend({
    template:__inline("detail.html"),
    data: function () {
        return {
            id:"",
            form:{},
            loading:true
        }
    },
    methods:{
        render: function () {
            this.renderDetail();
        },
        renderDetail: function () {
            this.loading = true;
            var self = this;
            Service.detail(JSON.stringify({
                Token:this.$root.token,
                _did:this.id
            }), function (rep) {
                self.form = rep;
                self.loading = false;
            })
        },
        onOk: function (v) {
            var self = this;
            layer.open({
                content:"确定通过该调班申请?",
                btn:["确定","取消"],
                yes: function () {
                    layer.closeAll();
                    self.$router.go("/verify");
                }
            });
        },
        onCancel: function (v) {
            var self = this;
            layer.open({
                content:"确定拒绝该调班申请?",
                btn:["确定","取消"],
                yes: function () {
                    layer.closeAll();
                    self.$router.go("/verify");
                }
            });
        }
    },
    route:{
        data: function () {
            this.id = this.$route.params.id;
            this.render();
        }
    }
});