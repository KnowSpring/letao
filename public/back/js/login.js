/**
 * Created by gcc-pc on 2019/6/18.
 */
$(function(){


    $('#form').bootstrapValidator({
        //校验图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //校验规则
        fields: {
            //校验用户名
            username: {
                validators: {
                    notEmpty: {
                        message:"密码不能为空"
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: "用户名长度为2~6"
                    },
                    //专门设置规则给账户校验
                    callback: {
                        message: "用户名不存在"
                    }
                }

            },
            //校验密码
            password: {
                validators: {
                    notEmpty: {
                        message: "密码不能为空"
                    },
                    stringLength: {
                        min: 6,
                        max: 16,
                        message: "密码长度为6~16"
                    },
                    callback: {
                        message: "密码账户"
                    }

                }
            }


        }
    });
    //获取bootstrapValidator插件实例 放在实例化后面
    var bootstrapValidator = $('#form').data('bootstrapValidator');
    // console.log(bootstrapValidator);
    //校验成功后对密码账户校验
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交
        $.ajax({
            url: "/employee/employeeLogin",
            type: 'post',
            data: $("#form").serialize(),
            dataType: 'json',
            success: function( info ){
                console.log(info);
                if( info.success ){
                    location.href="index.html";
                }

                if( info.error === 1000){
                    //利用 bootstrapValidator api
                    bootstrapValidator.updateStatus('username','INVALID', 'callback');
                }
                if( info.error === 1001 ){
                    bootstrapValidator.updateStatus('password','INVALID', 'callback');

                }

        }

        })
    });

    //点击重置按钮，图标也重置
    $("[type='reset']").click(function(){
        bootstrapValidator.resetForm(true);
    });



});