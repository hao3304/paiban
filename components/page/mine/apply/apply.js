/**
 * Created by jack on 16/6/4.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");

module.exports = Vue.extend({
    template:__inline("apply.html"),
    data: function () {
        return {
            loading:true,
            form:{
                "from_id":"",
                "from_nm":"",
                "from_date":"",
                "from_duty":"z",
                "remark":"",
                "appoint":0,
                "to_id":"",
                "to_nm":"",
                "to_date":"",
                "to_duty":"z"
            },
            fromDate:"",
            toDate:"",
            appoint:false
        }
    },
    methods:{
        render: function () {
            this.renderList();
        },
        renderList: function () {
            var self = this;
            self.loading = true;
            Service.getInfo(JSON.stringify({Token:this.$root.token}), function (rep) {
                self.form.from_nm = rep.nm;
                self.form.from_id = rep.uid;
                self.loading = false;
            })
        },
        onPickDate: function (t) {
            var self = this;
            this.picker.show(function (date) {
                self[t] = date.value;
            })
        },
        onCheck: function (v) {
            this.form.appoint = v;
        },
        getToNm: function () {
            var self = this;
            Service.dutylist(JSON.stringify({
                Token:this.$root.token,
                date:this.form.to_date
            }), function (rep) {
                if(rep.length>0){
                    self.form.to_nm = rep[0][self.form.to_duty].unm;
                    self.form.to_id = rep[0][self.form.to_duty].uid;
                }else{
                    self.form.to_nm = "";
                    self.form.to_id = "";
                }

            })
        },
        onSubmit: function () {
            if(!this.form.from_date){
                return layer.open({
                    content:"请选择调班时间!",
                    btn:["确定"]
                })
            }
            if(this.form.appoint == 1){

                if(!this.form.to_id){
                    return layer.open({
                        content:"请指定调班人员!",
                        btn:["确定"]
                    })
                }

                if(this.form.from_id == this.form.to_id){
                    return layer.open({
                        content:"不可调班!",
                        btn:["确定"]
                    })
                }
            }
            var self = this;
            layer.open({type:2});
            Service.save(JSON.stringify({
                    Token:this.$root.token,
                    action:1,
                    data:this.form
                }), function (rep) {
                    layer.closeAll();
                    layer.open({
                        content:rep,
                        btn:["确定"],
                        shadeClose:false,
                        yes: function () {
                            self.$router.go("/mine/list");
                            layer.closeAll();
                        }
                    })
                }
            )

        },
        getStamp: function (date) {
            return  Date.parse(new Date(date.replace(/-/g,"/")))/1000;
        }
    },
    watch:{
        toDate: function (v) {
            if(v){
                var d = this.getStamp(v);
                this.form.to_date = d;
                this.getToNm();
            }
        },
        fromDate: function (v) {
            if(v){
                var d = this.getStamp(v);
                this.form.from_date = d;
            }
        },
        "form.to_duty": function () {
            this.getToNm();
        },
        "appoint": function (v) {
            this.form.to_id = "";
            this.form.to_nm = "";
            this.form.to_date ="";
            this.toDate  = "";
            if(v){
                this.form.to_duty = "z";
                this.form.appoint = 1;
            }else{
                this.form.to_duty = "";
                this.form.appoint = 0;

            }
        }
    },
    ready: function () {
        this.render();
        var d = new Date();
        this.picker = new mui.DtPicker({type:"date",beginYear: d.getFullYear()});
    }
});