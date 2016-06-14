/**
 * Created by jack on 16/6/14.
 */


/**
 * Created by jack on 16/6/14.
 */

var prefix = "http://localhost:8080";

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return (r[2]); return null;
}

function co(callback){
    return function (rep) {
        if(rep.Code == 0){
            return callback.call(this,rep.Response);
        }else{
            alert(rep.Message);
        }
    }
}


/**
 * 获取我的排班列表
 * @param p 查询参数
 * @param c 回调
 */
function dutylist(p,c){
    $.post(prefix +"/hd/sche/dutylist.json",p,co(c),"json")
}

/**
 * 我的调班列表
 * @param p
 * @param c
 */
function myList(p,c){
    $.post(prefix+"/hd/sche/list.json",p,co(c),"json");
}

module.exports = {
    GetQueryString:GetQueryString,
    dutylist:dutylist,
    myList:myList
};