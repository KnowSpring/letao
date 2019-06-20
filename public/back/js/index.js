/**
 * Created by gcc-pc on 2019/6/19.
 */
$(function(){
    // 基于准备好的dom，初始化echarts实例
    // 柱状图
    // 基于准备好的dom，初始化echarts实例
    var echart1 = echarts.init(document.querySelector('.echarts_1'));

    // 指定图表的配置项和数据
    var option1 = {
        title: {
            text: '2017年注册人数'
        },
        // 提示框组件
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data:  [1000, 1500, 1800, 1200, 1000, 500]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    echart1.setOption(option1);


    //饼状图
    var echart2 = echarts.init(document.querySelector('.echarts_2'));
    var option2 = {
        title : {
            text: '热门品牌销售',
            subtext: '2017年6月',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            left: 10,
            top: 20,
            data: ['耐克','阿迪','新百伦','李宁','阿迪王'],
        },
        //选项经过
        series : [
            {
                name: '品牌',
                type: 'pie',
                radius : '50%',
                center: ['50%', '50%'],
                data: [
                    {value: 350 , name: '新百伦'},
                    {value:310 , name: '耐克'},
                    {value:234, name:'新百伦'},
                    {value:135, name:'李宁'},
                    {value:1548, name:'阿迪王'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 30,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    echart2.setOption(option2);
});
