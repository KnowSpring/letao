/**
 *
 * Created by gcc-pc on 2019/6/20.
 */

$(function(){
    var currentPage = 1;
    var pageSize = 5;
    render();
    //渲染一级分类列表
    function render(){
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function( info ) {
                console.log(info);
                var htmlStr = template('firstTpl',info);
                $('.lt_content tbody').html(htmlStr);
                //分页功能
                $('#paginator').bootstrapPaginator({
                    //设置版本号
                    bootstrapMajorVersion: 3,
                    // 显示第几页
                    currentPage: info.page,
                    // 总页数
                    totalPages: Math.ceil(info.total / info.size),
                    //当单击操作按钮的时候, 执行该函数, 调用ajax渲染页面
                    onPageClicked: function( a, b, c, page){
                        currentPage = page;
                        render();
                    }

                })
            }

        })
    }
    //点击分类按钮，显示，模态框
    $('#addButton').click(function(){
        $('#addModal').modal('show');
    });
    //表单验证功能
    $('#form').bootstrapValidator({
        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryName: {
                validators :{
                    notEmpty: {
                        message: '请输入一级分类'
                    }
                }
            }

        }
    });
    //表单验证提交
    $('#form').on('success.form.bv',function(e){

        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/category/addTopCategory',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function( info ){
                if(info.success){
                    $('#addModal').modal('hide');
                    //优化体验添加显示第一页
                    currentPage = 1;
                    render();
                    // 重置表单校验状态和 表单内容
                    // 传 true 不仅可以重置 状态, 还可以重置内容
                    $('#form').data('bootstrapValidator').resetForm(true);
                }


            }
        })
    })
});
