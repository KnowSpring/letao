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

