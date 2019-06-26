/**
 * Created by gcc-pc on 2019/6/26.
 */
$(function(){
    function render(){
        $.ajax({
            url:'/cart/queryCart',
            type:'get',
            dataType: "json",
            success: function(info){
                if(info.error === 400){
                    location.href = 'login.html?retUrl='+location.href;
                    return;
                }
                console.log(info);
                var htmlStr = template('cartTpl',{ arr : info });
                $('.mui-table-view').html(htmlStr);
                // 关闭下拉刷新
                mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();

            }
        });
    }

    mui.init({
        pullRefresh : {
            container:".mui-scroll-wrapper",
            down : {
                auto: true,//可选,默认false.首次加载自动上拉刷新一次
                callback :function(){
                    render();
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });
    // 2. 删除功能
    //    (1) 点击事件绑定要通过事件委托绑定, 且要绑定 tap 事件
    //    (2) 获取当前购物车 id
    //    (3) 发送 ajax 请求进行删除
    //    (4) 页面重新渲染
    $('.lt_main').on('tap','#btn_delete',function(){
        var id = $(this).data('id');
        // 发送 ajax 请求
        $.ajax({
            type: "get",
            url: "/cart/deleteCart",
            // 注意: 后台要求传递的数组, 虽然这里只删一个, 但是格式还是数组
            data: {
                id: [ id ]
            },
            dataType: "json",
            success: function( info ) {
                console.log( info );
                if ( info.success ) {
                    // 页面重新渲染, 触发一次下拉刷新即可
                    mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                }
            }
        })

    });
    // 3. 编辑功能
    //    点击编辑按钮, 显示确认框
    $('.lt_main').on('tap','#btn_edit',function(){
        //dataset是dom对象
        var obj = this.dataset;
        var htmlStr = template('editTpl',obj);
        var id = obj.id;

        mui.confirm(htmlStr.replace(/\n/g,''),'编辑商品',['确定','取消'],function( e ){
            //先渲染再获取在外面获取不了
            var size = $('.lt_pro_size span.current').text();
            var num = $('.lt_num .mui-numbox-input').val();
            if(e.index === 0){
                $.ajax({
                    type: "post",
                    url: "/cart/updateCart",
                    data: {
                        id: id,
                        num: num,
                        size: size
                    },
                    success: function(){
                        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
                    }

                });
            }

        });
    // 手动初始化数字框
        mui(".mui-numbox").numbox();
    });
    //4。编辑框尺码点击事件
    $('body').on('tap','.lt_pro_size span',function(){
        $(this).addClass('current').siblings().removeClass('current');
    });

});