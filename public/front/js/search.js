/**
 *
 * Created by gcc-pc on 2019/6/23.
 */

$(function(){
    render();
    //渲染历史记录
    function render(){
       var listArr = getHistory();
       //浏览器设置成json形式字符串得到是对象，data-id是键值eg：name，所以浏览设置是数组字符串
       console.log(listArr);
       console.log(listArr.length);
       var htmlStr = template('historyTpl',{'listArr':listArr});
       $('.searchHistory').html(htmlStr);

    }

    //1、删除单条记录
    $('.searchHistory').on('click','.content i',function(){
        mui.confirm(
            "你确定要删除此记录吗",
            "温馨提示",
            ['取消','确定'],
            function( e ){
                if( e.index === 1){
                    var listArr = getHistory();
                    var index = $(this).data('id');
                    // splice( 从哪开始, 删几个, 添加的项1, 添加的项2, ..... );
                    listArr.splice( index, 1);
                    var listStr = JSON.stringify(listArr);
                    localStorage.setItem('searchList',listStr);
                    render();
                }
            })
    });
    //2.删除总记录
    $('.searchHistory').on('click','.btn_empty',function(){
        mui.confirm(
            "你确定要清空历史记录吗",
            "温馨提示",
            ['取消','确定'],
           function(e){
                if(e.index === 1){
                    localStorage.removeItem('searchList');
                    render();
                }

           }
        );


    });

    //3.点击搜索页中的搜索按钮
    $('.lt_search .search_btn').click(function(){
        var key = $('.lt_search .search_input').val();
        if(key.trim() === ""){
        //    加个提示框
            mui.toast('请输入搜索关键字',{ duration:2500 });
            return;
        }
        var listArr = getHistory();
        if(listArr.length > 8){
            //超出8个在数组最后删除
            listArr.pop();
        }
        var index = listArr.indexOf(key);
        //下标为-1表示没有重复项
        if( index !== -1){
            listArr.splice(index,1);

        }
        //在数组前插入新历史记录
        listArr.unshift(key);
        //重新渲染
        render();
        //搜索表当置空
        $('.lt_search .search_input').val("");
        //设置到浏览器中
        var listStr = JSON.stringify(listArr);
        localStorage.setItem('searchList',listStr);
        location.href = "searchList.html?key="+key;



    })





});
