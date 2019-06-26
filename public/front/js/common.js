/**
 * Created by gcc-pc on 2019/6/22.
 */
$(function(){

    //区域滚动
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false //是否显示滚动条
    });
    //获得slider插件对象
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
    });

});

// 专门通过传递的参数, 可以解析出地址栏的参数值
function getSearch(key){
    var obj = {};
    var searchStr = location.search;
    //解码为中文
    searchStr = decodeURI(searchStr);
    //去掉问号
    searchStr = searchStr.slice(1);
    //根据等号分割
    var arr = searchStr.split("&");
    arr.forEach(function( v,i){
        var oneArr =v.split('=');
        obj[oneArr[0]] = oneArr[1];
    });
    return  obj[key];

}
//将浏览器获得的jsonStr转化成数组
function getHistory(){
    var listString = localStorage.getItem('searchList') || '[]';//得到历史
    var listArr = JSON.parse(listString);
    return listArr;
}
