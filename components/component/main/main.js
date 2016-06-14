/**
 * Created by jack on 16/2/17.
 */

var Vue = require("component_modules/vue.js");
var Router = require("component_modules/vue-router.js");


Vue.use(Router);



Vue.filter("getWeek", function (w) {
    var d = new Date(w*1000);
    switch (d.getDay()){
        case 0:{
            return "星期日";
        }break;
        case 1:{
            return "星期一";
        }break;
        case 2:{
            return "星期二";
        }break;
        case 3:{
            return "星期三";
        }break;
        case 4:{
            return "星期四";
        }break;
        case 5:{
            return "星期五";
        }break;
        case 6:{
            return "星期六";
        }break;
    }
});

Vue.filter("getWork", function (v) {

    switch (v){
        case "w":{
            return "晚班";
        }break;
        case "z":{
            return "早班";
        }break;
        case "y":{
            return "夜班";
        }
    }

});

Vue.filter("getState", function (v) {

    switch (parseInt(v)){
        case 0:{
            return "未审核";
        }break;
        case 1:{
            return "已审核";
        }break;
        case 2:{
            return "未通过";
        }break;
    }
});


router = new Router();
var App = Vue.extend({
    data: function () {
        return {
            //token:"575fa1c89b4037c30f55b526",
            token:"575e45026da1e212e48c8ec3"
        }
    },
    ready: function () {

    }
});


router.map({
    "/verify":{
        component:require("page/all/verify/verify.js") /*调班审核列表*/
    },
    "/detail/:id":{
        component:require("page/all/detail/detail.js") /*审核页面*/
    },
    "/about":{
        component:require("page/all/about/about.js") /*调班给我*/
    },
    "/mine":{
        component:require("page/mine/mine.js")  /*我的排班*/
    },
    "/mine/list":{
        component:require("page/mine/list.js")  /*我的调班列表*/
    },
    "/mine/apply":{
        component:require("page/mine/apply/apply.js") /*申请调班*/
    }
});

router.start(App,'#app');
