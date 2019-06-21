/**
 * Created by gcc-pc on 2019/6/19.
 */
$(function(){
    //当前页
    var currentPage =1 ;
    //一页大小
    var pageSize =5;
    var currentId;
    var isDelete;
    render();
    //渲染用户数据
   function render(){
       $.ajax({
           type: 'get',
           url:'/user/queryUser',
           data:{
               page: currentPage,
               pageSize: pageSize
           },
           success: function(info){
               console.log(info);
               // 参数2 必须是一个对象
               // 在模板中可以任意使用对象中的属性
               // isDelete 表示用户的启用状态, 1就是启用, 0就是禁用
               var htmlStr = template( "tpl", info );
               $('.lt_content tbody').html(htmlStr);

               //配置分页
               $("#paginator").bootstrapPaginator({
                   //设置版本号
                   bootstrapMajorVersion: 3,
                   // 显示第几页
                   currentPage: info.page,
                   // 总页数
                   totalPages: Math.ceil(info.total / info.size),
                   //当单击操作按钮的时候, 执行该函数, 调用ajax渲染页面
                   onPageClicked: function (event,originalEvent,type,page) {
                       // 把当前点击的页码赋值给currentPage, 调用ajax,渲染页面
                       currentPage = page;
                       // 调用 render 重新渲染页面
                       render();
                   }
               })
           }
       });


   }

   //给按钮绑定 委托父元素事件弹出模态框
    $('.lt_content tbody').on('click','.btn',function(){
        $('#userModal').modal('show');
        currentId = $(this).parent().data('id');
        console.log(currentId);
        isDelete = $(this).hasClass('btn-danger')? 0 : 1;
    });
    // 先解绑, 再绑定事件, 可以保证只有一个事件绑定在 按钮上
   $('#userModal').off('click').on('click',function(){
       $.ajax({
           url: '/user/updateUser',
           type: 'post',
           dataType: 'json',
           data: {
               id: currentId,
               isDelete: isDelete
           },
           success: function( info ){
               console.log(info);
               $('#userModal').modal('hide');
               render();
           }

       })
   })
});