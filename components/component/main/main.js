/**
 * Created by jack on 16/2/17.
 */

var Vue = require("component_modules/vue.js");
var Router = require("component_modules/vue-router.js");


Vue.use(Router);



router = new Router();
var App = Vue.extend({});


router.redirect({
    "/":"/all"
});

router.map({
    "/all":{
        component:require("page/all/all.js") /*全部排班*/
    },
    "/verify":{
        component:require("page/all/verify/verify.js") /*调班审核列表*/
    },
    "/detail":{
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

