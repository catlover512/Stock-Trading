
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if(results)
        return results[1] || 0;
    return 0;
}

function formatDollar(num) {
    var p = num.toFixed(2).split(".");
    return p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        return  num=="-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
}

var MyUser = function () {
    this.balance = 0;
    this.isJoinRoom = false;

    this.setBalance = function(balance){
        this.balance = parseInt(balance);
    }

    this.getBalance = function()
    {
        return this.balance / 100;
    };

    this.getViewBalance = function()
    {
        return formatDollar( this.getBalance() );
    }
}

Date.prototype.format = function(fmt) 
{ 
　　var o = { 
　　　　"M+" : this.getMonth()+1, //月份 
　　　　"d+" : this.getDate(), //日 
　　　　"h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时 
　　　　"H+" : this.getHours(), //小时 
　　　　"m+" : this.getMinutes(), //分 
　　　　"s+" : this.getSeconds(), //秒 
　　　　"q+" : Math.floor((this.getMonth()+3)/3), //季度 
　　　　"S" : this.getMilliseconds() //毫秒 
　　}; 
　　if(/(y+)/.test(fmt)) 
　　　　fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
　　for(var k in o) 
　　　　if(new RegExp("("+ k +")").test(fmt)) 
　　fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
　　return fmt; 
} 
if (!String.format) {
    String.format = function (format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}