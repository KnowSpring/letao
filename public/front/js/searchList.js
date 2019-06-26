/**
 *
 * Created by gcc-pc on 2019/6/24.
 */


$(function(){
    //1.一进入页面把地址栏的值设置到搜索框和渲染页面

    var search = getSearch('key');
    $('.lt_search .search_input').val(search);
    //要放在设置搜索框的后面不然参数 params.proName获取不了值
    render();
   function render(){

       var params = {};
       params.proName = $('.lt_search .search_input').val();
       params.page = 1;
       params.pageSize = 100;
       // var $current = $('.lt_sort a.current');
       //有高亮
       // if( $current.length >0 ){
       //     var sortName = $current.data('type');
       //     var sortValue = $current.find('i').hasClass('fa-angle-down')? 2 : 1 ;
       //     params[sortName] = sortValue;
       // }
       var type = $('.lt_sort a.current').data('type');
       params[type] = $('.lt_sort a.current i').hasClass('fa-angle-down')? 2 : 1 ;

       //加载效果 每次渲染前进行加载


       $('.lt_product').html('<div class="loading"></div>');

       //模拟延迟
       setTimeout(function(){
           $.ajax({
               type:'get',
               url:'/product/queryProduct',
               data:params,
               success: function(info){
                   console.log(info);
                   var htmlStr= template('productTpl',info);
                   $('.lt_product').html( htmlStr );

               }
           });
       },1000);

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
        render();
        //清空
    });

   //3.排序
    $('.lt_sort a[data-type]').on( 'click',function(){
        if(!$(this).hasClass('current')){
            $(this).addClass('current').siblings().removeClass('current');
        }
        $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
        // if($(this).hasClass('current')){
        //     $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
        // }else{
        //     $(this).addClass('current').siblings().removeClass('current');
        // }
        render();

    })
});