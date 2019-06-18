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
                    }

                }
            }


        }
    })

});