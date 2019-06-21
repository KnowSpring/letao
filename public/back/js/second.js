/**
 * Created by gcc-pc on 2019/6/20.
 */

$(function() {

    // 当前页
    var currentPage = 1;
    // 每页多少条
    var pageSize = 5;

    // 1. 一进入页面就渲染页面
    render();

    function render() {

        $.ajax({
            url: "/category/querySecondCategoryPaging",
            type: "get",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function( info ) {
                console.log( info );
                // 结合模板进行渲染
                var htmlStr = template( "secondTpl", info );
                $('.lt_content tbody').html( htmlStr );

                // 分页初始化
                $('#paginator').bootstrapPaginator({
                    // 版本号
                    bootstrapMajorVersion: 3,
                    // 当前页
                    currentPage: info.page,
                    // 总页数
                    totalPages: Math.ceil( info.total / info.size ),

                    // 给页码添加点击事件
                    onPageClicked: function( a, b, c, page ) {
                        // 将选中的页码更新到 currentPage
                        currentPage = page;
                        // 重新渲染
                        render();
                    }
                })
            }
        })

    }


    // 2. 点击添加分类按钮, 显示添加模态框
    $('#addButton').click(function() {
        $('#addModal').modal("show");
        //优化下来表单请求
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            type: 'get',
            dataType:'json',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (info){
                console.log(info);
                var htmlStr = template('firstTpl', info);
                $('#firstCate').html(htmlStr);


            }
        })
    });
    //点击下拉菜单子选项显示在表单
    $('.dropdown_auto').on('click','a',function(){
        // console.log(this);
       $('.firstCateBtn').text($(this).text());
       // console.log($(this).parent().data('id'));
       //将对应的一级分类id放在隐藏表单中
       $("[name = 'categoryId']").val($(this).parent().data('id'));
        //非空校验后手动设置状态
        $("#form").data('bootstrapValidator').updateStatus('categoryId','VALID');
    });


    // 3. 通过校验插件, 添加校验功能
    $("#form").bootstrapValidator({
        // 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        //重置
        excluded: [],

        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        // 校验的字段
        fields: {
            categoryId: {
                // 校验规则
                validators: {
                    // 非空检验
                    notEmpty: {
                        // 提示信息
                        message: "请选择一级分类"
                    }
                }
            },
            brandName: {
                // 校验规则
                validators: {
                    // 非空检验
                    notEmpty: {
                        // 提示信息
                        message: "请输入二级分类名称"
                    }
                }
            },
            brandLogo:{
                // 校验规则
                validators: {
                    // 非空检验
                    notEmpty: {
                        // 提示信息
                        message: "请选择上传图片"
                    }
                }
            },

        }
    });

    //4.上传插件初始化
    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
            console.log(data);
            var imgUrl = data.result.picAddr;
            $('.imgBox img').attr('src',imgUrl);
            //将图片地址放在隐藏域
            $("[name= 'brandLogo']").val(imgUrl);
            //非空校验后手动设置状态
            $("#form").data('bootstrapValidator').updateStatus('brandLogo','VALID');

        }
    });

    // 5. 注册表单校验成功事件
    //    表单校验插件, 会在表单提交时, 进行校验
    //    如果通过校验, 默认会进行提交, 需要阻止, 通过 ajax 进行提交

    // (使用form="form", 通过了校验, 也不会提交了, 可以省去 e.preventDefault() )

    $('#form').on("success.form.bv", function( e ) {
        e.preventDefault();

        $.ajax({
            url: "/category/addSecondCategory",
            type: "POST",
            data: $('#form').serialize(),
            success: function( info ) {
                console.log(info);
                if (info.success) {
                    // 关闭模态框
                    $('#addModal').modal("hide");
                    // 重新渲染页面, 添加的项会在第一页, 所以应该重新渲染第一页
                    currentPage = 1;
                    render();
                    // 重置表单校验状态和 表单内容
                    // 传 true 不仅可以重置 状态, 还可以重置内容
                    $('#form').data("bootstrapValidator").resetForm( true );
                    //添加完成后手动设置
                    $('.firstCateBtn').text('请选择一级分类');
                    $('.imgBox img').attr('src','images/none.png');

                }
            }
        })

    });

});
