/**
 *
 * Created by gcc-pc on 2019/6/23.
 */
$(function(){
    // 1. 一进入页面, 发送请求, 获取左侧一级分类数据进行渲染
    $.ajax({
        type: "get",
        url: "/category/queryTopCategory",
        dataType: "json",
        success: function( info ) {
            console.log( info );
            var htmlStr = template( "leftTpl", info );
            $('.lt_category_left ul').html( htmlStr );
            // 一进入页面, 渲染第一个一级分类, 对应的二级分类数据
            renderSecondCate( info.rows[0].id )
        }
    });
    //2.点击右侧进行显示对应的二级分类
    $('.lt_category_left').on('click','a',function(){
        $(this).addClass('current').parent().siblings().find('a').removeClass('current');
       var id = $(this).data('id');
       renderSecondCate(id);
    });
    // 通过 一级分类的 id, 进行右侧二级分类的重新渲染
    function renderSecondCate (id){
        // 发送ajax请求
        $.ajax({
            type: "get",
            url: "/category/querySecondCategory",
            data: {
                id: id
            },
            dataType: "json",
            success: function( info ) {
                console.log( info );
                var htmlStr = template("rightTpl", info);
                $('.lt_category_right ul').html( htmlStr );
            }
        })
    }

});
