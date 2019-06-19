/**
 * Created by gcc-pc on 2019/6/19.
 */
//进度条功能
$(document).ajaxStart(function(){
   NProgress.start();
});
$(document).ajaxStop(function(){
    NProgress.done();
});

//点击展开分类子目录
$('#category').click(function(){
    $(this).next().stop().slideToggle();

});

//左侧移除右侧扩大
$('.lt_topbar .menu').click(function(){
    $('.lt_aside').toggleClass('menuHidden');
    $('.lt_main').toggleClass('menuHidden');
    $('.lt_topbar').toggleClass('menuHidden');

});

//点击topbar的退出图标
$('.icon_logout').click(function(){
    //让模态框显示
    $('#modal').modal('show');
});
//点击模态框中的退出按钮
$('#logout').click(function(){
   $.ajax({
       type:'get',
       url:'/employee/employeeLogout',
       dataType: "json",
       success: function(info){
          if( info.success ){
              location.href="login.html";
          }
       }

   })
});

//登陆拦截功能
if(location.href.indexOf('login.html') === -1 ){
    $.ajax({
        url:'/employee/checkRootLogin',
        type:'get',
        success: function(info){
            if(info.error === 400 ){
                location.href= "login.html";
            }
        }
    })
}

