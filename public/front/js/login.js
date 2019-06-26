/**
 * Created by gcc-pc on 2019/6/26.
 */
$(function(){
   $('#loginBtn').click(function(){
       var username = $('#username').val();
       var password = $('#password').val();
       if(username.trim() === ''){
           mui.toast('请输入用户名');
           return;
       }
       if ( password.trim() === "" ) {
           mui.toast("请输入密码");
           return;
       }
       // 发送ajax请求, 进行登录
       $.ajax({
           type: "post",
           url: "/user/login",
           data: {
               username: username,
               password: password
           },
           dataType: "json",
           success: function (info) {
               console.log(info);
               if( info.error === 403){
                   mui.toast('用户名或者密码错误');
                   return;
               }
               if(info.success){
                   if( location.search.indexOf('retUrl') > -1 ){
                       var retUrl = location.search.replace('?retUrl=','');
                       location.href = retUrl;
                   }
                   else{
                       location.href= 'index.html';
                   }
               }


           }
       });


   })
});