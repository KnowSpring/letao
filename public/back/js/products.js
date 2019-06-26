/**
 *
 * Created by gcc-pc on 2019/6/21.
 */

$(function(){
    var pageSize = 2;
    var currentPage = 1;
    var picArr =[];//用于存储图片的地址
    render();
    function render(){
        $.ajax({
            url: ' /product/queryProductDetailList',
            type: 'get',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function( info ){
               console.log(info);
               var htmlStr = template('productTpl', info);
                $('.lt_content tbody').html(htmlStr);
                // 分页初始化
                $('#paginator').bootstrapPaginator({
                    // 版本号
                    bootstrapMajorVersion: 3,
                    // 当前页
                    currentPage: info.page,
                    // 总页数
                    totalPages: Math.ceil(info.total / info.size),

                    // 给页码添加点击事件
                    onPageClicked: function (a, b, c, page) {
                        // 将选中的页码更新到 currentPage
                        currentPage = page;
                        // 重新渲染
                        render();
                    },
                    size: "normal",
                    itemTexts: function (type, page, current) {
                        switch(type){
                            case 'first':
                                return "首页";
                            case 'last':
                                return "尾页";
                            case 'prev':
                                return '上一页';
                            case 'next':
                                return '上一页';
                            case 'page':
                                return page;
                        }
                    },
                    tooltipTitles:function(type,page,current){
                        switch( type ) {
                            case "first":
                                return "首页";
                            case "last":
                                return "尾页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "page":
                                return "前往第" + page + "页";
                        }
                    },
                    // 使用 bootstrap 样式的提示框组件
                    useBootstrapTooltip: true
                })
            }
        })
    }
    //点击添加商品按钮显示模态框
    $('#addButton').click(function(){
        $('#addModal').modal('show');
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            type: 'get',
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: 'json',
            success: function( info ){
                var htmlStr = template('secondTpl', info);
                $('#secondCate').html( htmlStr );
            }
        })
    });
    // 下来按钮事件委托, 给 a 注册点击事件
    $('#secondCate').on('click','a',function(){
        var brandId = $(this).parent().data('id');
         $('.secondCateBtn').text($(this).text());
         $("[name='brandId']").val(brandId);
        $('#form').data('bootstrapValidator').updateStatus('brandId',"VALID");
    });
    //实现多文件上传
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function(e,data){
            var picObj = data.result;
            var picAddr = picObj.picAddr;
            console.log(picAddr);
            //不能存数组变为4
            picArr.unshift(picObj);
            console.log(picArr);
            $('.imgBox').prepend("<img src="+picAddr+" height = 100>");
            console.log(picArr.length);
            if(picArr.length>3){
                picArr.pop();
                $('.imgBox img:last-of-type').remove();
            }
            // if（picArr.length = 3）是有执行的
            //手动设置提示为true
            if(picArr.length === 3 ){
                $('#form').data('bootstrapValidator').updateStatus('picStatus','VALID');

            }
        }
    });

    //表单校验
    $('#form').bootstrapValidator({
        excluded: [],
        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: "请选择二级分类"
                    }
                }
            },
            // 商品名称
            proName: {
                validators: {
                    notEmpty: {
                        message: "请输入商品名称"
                    }
                }
            },
            // 商品描述
            proDesc: {
                validators: {
                    notEmpty: {
                        message: "请输入商品描述"
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: "请输入商品库存"
                    },
                    regexp:{
                        regexp: /^[1-9]\d*$/,
                        message: '商品库存格式, 必须是非零开头的数字'
                    }

                }
            },
            // 尺码校验, 规则必须是 32-40, 两个数字-两个数字
            size: {
                validators: {
                    notEmpty: {
                        message: "请输入商品尺码"
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '尺码格式, 必须是 32-40'
                    }
                }
            },
            // 商品价格
            price: {
                validators: {
                    notEmpty: {
                        message: "请输入商品价格"
                    }
                }
            },
            // 商品原价
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: "请输入商品原价"
                    }
                }
            },
            // 标记图片是否上传满三张
            picStatus: {
                validators: {
                    notEmpty: {
                        message: "请上传3张图片"
                    }
                }
            }

        }
    });
    //提交添加信息
    $('#form').on('success.form.bv',function(e){
        e.preventDefault();
        var params = $('#form').serialize();
        params +='&picName1='+ picArr[0].picName+'&picAddr1='+picArr[0].picAddr;
        params +='&picName2='+ picArr[1].picName+'&picAddr2='+picArr[1].picAddr;
        params +='&picName3='+ picArr[2].picName+'&picAddr3='+picArr[2].picAddr;
        console.log(params);
        $.ajax({
            url: "/product/addProduct",
            type: "post",
            data: params,
            success: function( info ){
                console.log(info);
                if( info.success ){
                    $('#addModal').modal('hide');
                    $('#form').data('bootstrapValidator').resetForm(true);
                    currentPage = 1;
                    render();


                    //手动删除图片和重置下拉框
                    $('.dropdown .secondCateBtn').text('请选择二级分类');
                    $('.imgBox img').remove();
                    // 重置数组 picArr
                     picArr = [];


                }
            }


        })

    })





});