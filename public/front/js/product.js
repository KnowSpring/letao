/**
 * Created by gcc-pc on 2019/6/26.
 */
$(function(){
    var productId = getSearch('productId');
    $.ajax({
        url: '/product/queryProductDetail',
        type: 'get',
        data: {
            id: productId
        },
        dataType: 'json',
        success: function(info){
            console.log(info);
            var htmlStr = template('productTpl', info);
            $('.lt_main .mui-scroll').html(htmlStr);

            //手动调用图片轮播的初始化方法 需放在ajax内
            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
            });

            //Numbox组件需要手动初始化
            mui('.mui-numbox').numbox()
        }

    });

});