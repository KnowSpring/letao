/**
 *
 * Created by gcc-pc on 2019/6/24.
 */


$(function(){



    //1.一进入页面把地址栏的值设置到搜索框和渲染页面

    var search = getSearch('key');
    $('.lt_search .search_input').val(search);
    var currentPage = 1;
    var pageSize = 2;
    var flag = false;
    //要放在设置搜索框的后面不然参数 params.proName获取不了值
    mui.init({
        pullRefresh : {
            container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                height:50,//可选,默认50.触发下拉刷新拖动距离,
                auto: true,//可选,默认false.首次加载自动下拉刷新一次
                contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback :function(){

                    currentPage =1;
                    render(function(info){
                        var htmlStr= template('productTpl',info);
                        $('.lt_product').html( htmlStr );
                        //通过原型找_protect_  下拉刷新结束
                        mui('#refreshContainer').pullRefresh().endPulldownToRefresh();

                        //当拉到最后时会禁用上拉加载，需手动开启  需下拉刷新结束后启动
                        if(flag){
                            mui('#refreshContainer').pullRefresh().enablePullupToRefresh();
                        }

                    });
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            },
            up : {
                callback : function(){
                    console.log( "执行了上拉加载" );
                    currentPage++;
                    render(function(info){
                        var htmlStr= template('productTpl',info);
                        $('.lt_product').append( htmlStr );
                        //上拉加载结束
                        if(info.data.length === 0){
                            mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                            flag = true;
                        }else{
                            mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
                        }
                    });
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });
   function render(callback){
       var params = {};
       params.proName = $('.lt_search .search_input').val();
       params.page = currentPage ;
       params.pageSize = pageSize ;
       var type = $('.lt_sort a.current').data('type');
       params[type] = $('.lt_sort a.current i').hasClass('fa-angle-down')? 2 : 1 ;

       $.ajax({
           type:'get',
           url:'/product/queryProduct',
           data:params,
           success: function(info){
               console.log(info);
               callback && callback(info);
           }
       });

   }
   //2.点击搜索按钮进行搜索
    $('.lt_search .search_btn').click(function(){
        var search = $('.lt_search .search_input').val();
        //对空进行校验
        if(search.trim() === ""){
            mui.toast('请输入搜索关键字',{ duration:2500 });
            return;
        }

        var arr = getHistory();
        //删掉重复历史记录
        var index = arr.indexOf( search );
        if( index > -1 ){
            arr.splice( index, 1 );
        }
        //数组前追加新历史记录
        arr.unshift( search );
        //判断历史记录是否超过8，超出删除
        if( arr.length >8 ){
            arr.pop();
        }
        var str = JSON.stringify( arr );
        localStorage.setItem( 'searchList', str);
        mui('#refreshContainer').pullRefresh().pulldownLoading();
        //清空
    });

   //3.排序
    $('.lt_sort a[data-type]').on( 'tap',function(){
        if(!$(this).hasClass('current')){
            $(this).addClass('current').siblings().removeClass('current');
        }
        $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
        // if($(this).hasClass('current')){
        //     $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
        // }else{
        //     $(this).addClass('current').siblings().removeClass('current');
        // }
        // 执行一次下拉刷新即可
        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();

    })
});