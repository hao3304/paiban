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
                    self.onSubmit(2);
                }
            });
        },
        onCancel: function (v) {
            var self = this;
            layer.open({
                content:"确定拒绝该调班申请?",
                btn:["确定","取消"],
                yes: function () {
                    self.onSubmit(3);
                }
            });
        },
        onSubmit: function (action) {
            var self = this;
            Service.save(JSON.stringify({
                Token:this.$root.token,
                action:action,
                data:this.form
            }), function (rep) {

                layer.open({
                    content:rep,
                    shadeClose:false,
                    btn:["确定"],
                    yes: function () {
                        layer.closeAll();
                        self.$router.go("/verify");
                    }
                })

            });
        },
        onPickDate: function () {
            var self = this;
            this.picker.show(function (date) {
                self.form.to_date = self.getStamp(date.value);
            })
        },
        getStamp: function (date) {
            return  Date.parse(new Date(date.replace(/-/g,"/")))/1000;
        }
    },
    watch:{
        
    },
    route:{
        data: function () {
            this.id = this.$route.params.id;
            this.render();
        }
    },
    ready: function () {
        var d = new Date();
        this.picker = new mui.DtPicker({type:"date",beginYear: d.getFullYear()});
    }
});