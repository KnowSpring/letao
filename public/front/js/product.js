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

    $('.mui-scroll').on('tap','.lt_pro_size span',function(){
        $(this).addClass('current').siblings().removeClass('current');
    });
    $('#addCart').on('click',function(){
        var proNum = $('.mui-numbox-input').val();
        var proSize = $('.lt_pro_size span.current' ).text();
        if(!proSize){
            mui.toast('请选择尺码');
            return;
        }
            $.ajax({
            url:'/cart/addCart',
            type:'post',
            dataType:'json',
            data:{
                productId: productId,
                num: proNum,
                size: proSize
            },
            success: function( info ){
                console.log(info);
                //没登录进行跳转登录页
                if( info.error === 400){
                    location.href = 'login.html?retUrl='+location.href;
                }
                if(info.success){
                    mui.confirm('添加成功','温馨提示',['去购物车','继续浏览'],function( e ){
                        if(e.index === 0 ){
                            location.href= 'cart.html';
                        }
                    })
                }

            }


        })

    })

});