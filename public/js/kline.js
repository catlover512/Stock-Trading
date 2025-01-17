var KlineBarWidth = 10;
var klineElement = $('#'+kline_element_id);
var klineChart = echarts.init(document.getElementById(kline_element_id));

// var KLineData_1m_tmp = {'08:00':['-','-','-','-']};
var KLineData_1m_tmp = {};
var KLineData_5m_tmp = {};
var KLineData_15m_tmp = {};
var KLineData_30m_tmp = {};
var KLineData_1h_tmp = {};
var KLineData_1d_tmp = {};

var KLineData_1m = [];
var KLineData_5m = [];
var KLineData_15m = [];
var KLineData_30m = [];
var KLineData_1h = [];
var KLineData_1d = [];

//顯示幾根
var kSlice_1m = 24;
var kSlice_5m = 24;
var kSlice_15m = 120;
var kSlice_30m = 24;
var kSlice_1h = 24;
var kSlice_1d = 15;

//填滿沒有直的X軸座標
var fill_slice = false;

var upColor = '#0CF49B';
var downColor = '#FD1050';

// 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
// var klineTestData = [
    // ['2013/1/24', 2320.26,2320.26,2287.3,2362.94],
    // ['2013/1/25', 2300,2291.3,2288.26,2308.38]
// ];

if(fill_slice){
    fill_slice_func();
}

function processTime(time){
    var date = new Date(time);
    var year = 1900 + date.getYear();
    var month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
    var day = (date.getDate() < 10 ? '0' : '') + date.getDate();
    var hour = (date.getHours() < 10 ? '0' : '') + date.getHours();
    var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    return year+' '+month+'-'+day+' '+hour+':'+minutes;
}
function addKlineHistory(data){
//    console.log(data.kline_record_group_list);
    $.each(data.kline_record_group_list,function(index,value){//處理不同時間區段資料
        var period = value.period; // 1,5,15,30,1,1
        var period_type = value.period_type; // minute,hour,day
        $.each(value.kline_record_list,function(index1,value1){//處理每筆時間資料
            var time = processTime(value1.start_time);
            var cut_minute = +time.substr(14,2);
            var cut_hour_str = time.substr(0,14);
            var cut_day_str = time.substr(0,10);
            var min5time = '00';
            var min15time = '00';
            var min30time = '00';
            if(cut_minute < 5){
                min5time = '00';
            }else if(cut_minute < 10){
                min5time = '05';
            }else if(cut_minute < 15){
                min5time = '10';
            }else if(cut_minute < 20){
                min5time = '15';
                min15time = '15';
            }else if(cut_minute < 25){
                min5time = '20';
                min15time = '15';
            }else if(cut_minute < 30){
                min5time = '25';
                min15time = '15';
            }else if(cut_minute < 35){
                min5time = '30';
                min15time = '30';
                min30time = '30';
            }else if(cut_minute < 40){
                min5time = '35';
                min15time = '30';
                min30time = '30';
            }else if(cut_minute < 45){
                min5time = '40';
                min15time = '30';
                min30time = '30';
            }else if(cut_minute < 50){
                min5time = '45';
                min15time = '45';
                min30time = '30';
            }else if(cut_minute < 55){
                min5time = '50';
                min15time = '45';
                min30time = '30';
            }else if(cut_minute < 60){
                min5time = '55';
                min15time = '45';
                min30time = '30';
            }
            // 1m //
            if(period == 1 && period_type == 'minute'){
                var min1time_str = time;
                KLineData_1m_tmp[min1time_str] = value1.content.split(',');
            }
            // 1m //
            // 5m //
            if(period == 5 && period_type == 'minute'){
                var min5time_str = cut_hour_str+min5time;
                KLineData_5m_tmp[min5time_str] = value1.content.split(',');
            }
            // 15m //
            // 15m //
            if(period == 15 && period_type == 'minute'){
                var min15time_str = cut_hour_str+min15time;
                KLineData_15m_tmp[min15time_str] = value1.content.split(',');
            }
            // 15m //
            // 30m //
            if(period == 30 && period_type == 'minute'){
                var min30time_str = cut_hour_str+min30time;
                KLineData_30m_tmp[min30time_str] = value1.content.split(',');
            }
            // 30m //
            // 1hr //
            if(period == 1 && period_type == 'hour'){
                KLineData_1h_tmp[cut_hour_str] = value1.content.split(',');
            }
            // 1hr //
            // 1day //
            if(period == 1 && period_type == 'day'){
                KLineData_1d_tmp[cut_day_str] = value1.content.split(',');
            }
            // 1day //
        });
    });
}
function addKlineData(data){
    KlineBarWidth = klineElement.data('barWidth');
    var time = processTime(data.time);
    var value = data.value;
    var cut_minute = +time.substr(14,2);
    var cut_hour_str = time.substr(0,14);
    var cut_day_str = time.substr(0,10);
    // console.log(cut_hour_str);
    // console.log(cut_day_str);
    var min5time = '00';
    var min15time = '00';
    var min30time = '00';
    if(cut_minute < 5){
        min5time = '00';
    }else if(cut_minute < 10){
        min5time = '05';
    }else if(cut_minute < 15){
        min5time = '10';
    }else if(cut_minute < 20){
        min5time = '15';
        min15time = '15';
    }else if(cut_minute < 25){
        min5time = '20';
        min15time = '15';
    }else if(cut_minute < 30){
        min5time = '25';
        min15time = '15';
    }else if(cut_minute < 35){
        min5time = '30';
        min15time = '30';
        min30time = '30';
    }else if(cut_minute < 40){
        min5time = '35';
        min15time = '30';
        min30time = '30';
    }else if(cut_minute < 45){
        min5time = '40';
        min15time = '30';
        min30time = '30';
    }else if(cut_minute < 50){
        min5time = '45';
        min15time = '45';
        min30time = '30';
    }else if(cut_minute < 55){
        min5time = '50';
        min15time = '45';
        min30time = '30';
    }else if(cut_minute < 60){
        min5time = '55';
        min15time = '45';
        min30time = '30';
    }
    // 1m //
    var min1time_str = time;
    if(KLineData_1m_tmp[min1time_str]){
        KLineData_1m_tmp[min1time_str].push(value);
    }else{
        KLineData_1m_tmp[min1time_str] = [value];
    }
    // 1m //
    // 5m //
    var min5time_str = cut_hour_str+min5time;
    if(KLineData_5m_tmp[min5time_str]){
        KLineData_5m_tmp[min5time_str].push(value);
    }else{
        KLineData_5m_tmp[min5time_str] = [value];
    }
    // 5m //
    // 15m //
    var min15time_str = cut_hour_str+min15time;
    if(KLineData_15m_tmp[min15time_str]){
        KLineData_15m_tmp[min15time_str].push(value);
    }else{
        KLineData_15m_tmp[min15time_str] = [value];
    }
    // 15m //
    // 30m //
    var min30time_str = cut_hour_str+min30time;
    if(KLineData_30m_tmp[min30time_str]){
        KLineData_30m_tmp[min30time_str].push(value);
    }else{
        KLineData_30m_tmp[min30time_str] = [value];
    }
    // 30m //
    // 1hr //
    if(KLineData_1h_tmp[cut_hour_str]){
        KLineData_1h_tmp[cut_hour_str].push(value);
    }else{
        KLineData_1h_tmp[cut_hour_str] = [value];
    }
    // 1hr //
    // 1day //
    if(KLineData_1d_tmp[cut_day_str ]){
        KLineData_1d_tmp[cut_day_str].push(value);
    }else{
        KLineData_1d_tmp[cut_day_str] = [value];
    }
    // 1day //
    //var canvas_type = $('#canvas_type').val();
    var drawDataTmp = KLineData_15m_tmp;
    var drawData = KLineData_15m;
    // if(canvas_type && canvas_type !== 'line' && canvas_type !== 'bar'){
        drawDataTmp = eval('KLineData_'+kline_canvas_type+'_tmp');
        drawData = eval('KLineData_'+kline_canvas_type);
    // }
    
    var ordered_drawDataTmp = Object.keys(drawDataTmp).sort().reduce(
      (obj, key) => { 
        obj[key] = drawDataTmp[key]; 
        return obj;
      }, 
      {}
    );
    drawData = [];
    $.each(ordered_drawDataTmp,function(index,value){
        var first = value[0];
        var last = value[value.length-1];
        var min = Math.min(...value);
        var max = Math.max(...value);
        drawData.push([index,+first,+last,min,max]);
    });
    // var kSlice = eval('kSlice_'+kline_canvas_type);
    // if(canvas_type !== 'line' && canvas_type !== 'bar'){
        kSlice = eval('kSlice_'+kline_canvas_type);
    // }
    //console.log(drawData);
    kline_option = getKlineOption(drawData.slice(-kSlice), kline_canvas_type);
    klineChart.setOption(kline_option);
}

function getKlineOption(kLineRawData, kline_canvas_type){
        var type = kline_canvas_type;
        var data0 = splitData(kLineRawData);
        // function calculatePercentage(data){
            // var result = [];
            // var length = data.length;
            // for(i=0;i<length;i++){
                // result.push(((data[i][1]-data[i][0])/data[i][0]*100).toFixed(2));
            // }
            // return result;
        // }
//         
        // function calculateChange(data){
            // var result = [];
            // var length = data.length;
            // for(i=0;i<length;i++){
                // result.push((data[i][1]-data[i][0]).toFixed(2));
            // }
            // return result;
        // }
        
        function splitData(kLineRawData) {
            var categoryData = [];
            var values = [];
            return {
                categoryData: kLineRawData.map(function (item) {
                    if(type == '1m'){
                        return item[0].substr(5);
                    }else if(type == '5m'){
                        return item[0].substr(5);
                    }else if(type == '15m'){
                        return item[0].substr(5);
                    }else if(type == '30m'){
                        return item[0].substr(5);
                    }else if(type == '1h'){
                        return item[0].substr(5,8);
                    }else if(type == '1d'){
                        return item[0].substr(5,5);
                    }else{
                        return item[0];
                    }
                }),
                values: kLineRawData.map(function (item) {
                    return [+item[1], +item[2], +item[3], +item[4]];
                }),
            };
        }
        

        function calculateMA(dayCount) {
            var result = [];
            for (var i = 0, len = data0.values.length; i < len; i++) {
                if (i < dayCount) {
                    result.push('-');
                    continue;
                }
                var sum = 0;
                for (var j = 0; j < dayCount; j++) {
                    sum += data0.values[i - j][1];
                }
                result.push(sum / dayCount);
            }
            return result;
        }
        
        // function calculateVOLMA(dayCount, data) {
            // var result = [];
            // for (var i = 0, len = data.length; i < len; i++) {
                // if (i < dayCount) {
                    // result.push('-');
                    // continue;
                // }
                // var sum = 0;
                // for (var j = 0; j < dayCount; j++) {
                    // sum += parseInt(data[i - j][1]*100);
                // }
                // result.push((sum / dayCount /100).toFixed(2));
            // }
            // return result;
        // }
        var option = {
            backgroundColor: 'transparent',
            animation: false,
            tooltip: {
                trigger: 'axis',
                // axisPointer: {
                    // type: 'cross'
                // },
                axisPointer: {
                    animation: false,
                    type: 'cross',
                    lineStyle: {
                        color: '#376df4',
                        width: 2,
                        opacity: 1
                    }
                },
                formatter: function(data) 
                {   
                    var date = data[0]['axisValue'];
                    var open = data[0]['data'][1] ? data[0]['data'][1] : ('-');
                    var close = data[0]['data'][2] ? data[0]['data'][2] : ('-');
                    var low = data[0]['data'][3] ? data[0]['data'][3] : ('-');
                    var high = data[0]['data'][4] ? data[0]['data'][4] : ('-');
                    //var change = (close-open).toFixed(2);
                    // var percentage = (change/open*100).toFixed(2)+'%';
                    // var vol = (data[0]['data'][5]/1000).toFixed(2)+'K';
                    // var ma5 = Math.floor(data[1]['value']*1000000)/1000000 ? Math.floor(data[1]['value']*1000000)/1000000 : "";
                    // var ma10 = Math.floor(data[2]['value']*1000000)/1000000 ? Math.floor(data[2]['value']*1000000)/1000000 : "";
                    // var ma20 = Math.floor(data[3]['value']*1000000)/1000000 ? Math.floor(data[3]['value']*1000000)/1000000 : "";
                    var color = '#FD1050';
                    // if(change > 0){
                        // color = '#0CF49B';
                    // }
                    result = '<div style="width:150px;">'+
                    '<div><span>'+MessageType.getText("time")+':</span><span style="float:right;">'+date+'</span></div>'+
                    '<div><span>'+MessageType.getText("open")+':</span><span style="float:right;">'+open+'</span></div>'+
                    '<div><span>'+MessageType.getText("close")+':</span><span style="float:right;">'+close+'</span></div>'+
                    '<div><span>'+MessageType.getText("highest")+':</span><span style="float:right;">'+high+'</span></div>'+
                    '<div><span>'+MessageType.getText("lowest")+':</span><span style="float:right;">'+low+'</span></div>'+
                    // '<div style="color:'+color+'"><span>漲跌額:</span><span style="float:right;">'+change+'</span></div>'+
                    // '<div style="color:'+color+'"><span>漲跌幅:</span><span style="float:right;">'+percentage+'</span></div>'+
                    // '<div style="color:'+color+'"><span>交易量:</span><span style="float:right;">'+vol+'</span></div>'+
                    // '<div style="color:#cc9dd8"><span>MA5:</span><span style="float:right;">'+ma5+'</span></div>'+
                    // '<div style="color:#c6c60b"><span>MA10:</span><span style="float:right;">'+ma10+'</span></div>'+
                    // '<div style="color:brown"><span>MA20:</span><span style="float:right;">'+ma20+'</span></div>'+
                    '</div>';
                    return result;
                }
            },
            axisPointer: {
                link: {xAxisIndex: 'all'},
                label: {
                    backgroundColor: '#777'
                }
            },
            visualMap: {
                show: false,
                seriesIndex: 1,
                dimension: 2,
                pieces: [{
                    value: 1,
                    color: upColor
                }, {
                    value: -1,
                    color: downColor
                }]
            },
            grid: {
                left: '5%',
                right: '50',
                bottom: '10%'
            },
            // grid: [
                // {
                    // top: 10,
                    // left: 0,
                    // right: 40,
                    // height: '85%'
                // },
                // {
                    // left: 0,
                    // right: 40,
                    // top: '90%',
                    // height: '10%'
                // }
            // ],
            xAxis: [
                {
                    type: 'category',
                    data: data0.categoryData,
                    scale: true,
                    boundaryGap: false,
                    axisLine: {onZero: false, lineStyle: { color: '#8392A5' } },
                    splitLine: {show: false},
                    splitNumber: 20,
                    min: 'dataMin',
                    max: 'dataMax',
                    axisPointer: {
                        z: 100
                    }
                },
                // {
                    // type: 'category',
                    // gridIndex: 1,
                    // data: dates,
                    // scale: true,
                    // boundaryGap: false,
                    // axisLine: {onZero: false},
                    // axisTick: {show: false},
                    // splitLine: {show: false},
                    // axisLabel: {show: false},
                    // splitNumber: 20,
                    // min: 'dataMin',
                    // max: 'dataMax'
                // }
            ],
            yAxis: [
                {
                    scale: true,
                    axisLine: { lineStyle: { color: '#8392A5' } },
                    splitLine: {
                        lineStyle: { opacity: 0.3 },
                    },
                    position: 'right',
                },
                // {
                    // show: false,
                    // scale: true,
                    // gridIndex: 1,
                    // splitNumber: 2,
                    // axisLabel: {show: false},
                    // axisLine: {show: false},
                    // axisTick: {show: false},
                    // splitLine: {show: false}
                // }
            ],
            // dataZoom: [
                // {
                    // type: 'inside',
                    // xAxisIndex: 0,
                    // start: 0,
                    // end: 100
                // },
            // ],
            series: [
                {
                    name: 'K線',
                    type: 'candlestick',
                    barMaxWidth:KlineBarWidth,
                    data: data0.values,
                    itemStyle: {
                        color: upColor,
                        color0: downColor,
                        borderColor: upColor,
                        borderColor0: downColor,
                    },
                },
                // {
                    // name: 'Volume',
                    // type: 'bar',
                    // xAxisIndex: 1,
                    // yAxisIndex: 1,
                    // data: vol_data,
                    // tooltip:{
                        // show:false,
                    // }
                // },
                // {
                    // name: 'MA5',
                    // type: 'line',
                    // data: calculateMA(5),
                    // smooth: true,
                    // showSymbol: false,
                    // lineStyle: {
                        // width: 1,
                        // color: '#cc9dd8',
                    // }
                // },
                // {
                    // name: 'MA10',
                    // type: 'line',
                    // data: calculateMA(10),
                    // smooth: true,
                    // showSymbol: false,
                    // lineStyle: {
                        // width: 1,
                        // color: 'yellow',
                    // }
                // },
                // {
                    // name: 'MA20',
                    // type: 'line',
                    // data: calculateMA(20),
                    // smooth: true,
                    // showSymbol: false,
                    // lineStyle: {
                        // width: 1,
                        // color: 'brown',
                    // }
                // },
                // {
                    // xAxisIndex: 1,
                    // yAxisIndex: 1,
                    // name: 'VOLMA5',
                    // type: 'line',
                    // data: calculateVOLMA(5, vol_data),
                    // smooth: true,
                    // showSymbol: false,
                    // lineStyle: {
                        // width: 1,
                        // color: '#cc9dd8',
                    // },
                    // tooltip:{
                        // show:false,
                    // },
                // },
                // {
                    // xAxisIndex: 1,
                    // yAxisIndex: 1,
                    // name: 'VOLMA10',
                    // type: 'line',
                    // data: calculateVOLMA(10, vol_data),
                    // smooth: true,
                    // showSymbol: false,
                    // lineStyle: {
                        // width: 1,
                        // color: 'yellow',
                    // },
                    // tooltip:{
                        // show:false,
                    // }
                // },
            ]
        };
        return option;
}
function fill_slice_func(){
    for (var i=1; i <= kSlice_1m; i++) {
        var date = new Date();
        date.setMinutes(date.getMinutes() - i);
        var time = processTime(date.getTime());
        KLineData_1m_tmp[time] = ['-','-','-','-'];
    };
    for (var i=1; i <= kSlice_5m; i++) {
        var date = new Date();
        date.setMinutes(date.getMinutes() - (i*5));
        var time = processTime(date.getTime());
        var cut_minute = +time.substr(14,2);
        var cut_hour_str = time.substr(0,14);
        var min5time = '00';
        if(cut_minute < 5){
            min5time = '00';
        }else if(cut_minute < 10){
            min5time = '05';
        }else if(cut_minute < 15){
            min5time = '10';
        }else if(cut_minute < 20){
            min5time = '15';
        }else if(cut_minute < 25){
            min5time = '20';
        }else if(cut_minute < 30){
            min5time = '25';
        }else if(cut_minute < 35){
            min5time = '30';
        }else if(cut_minute < 40){
            min5time = '35';
        }else if(cut_minute < 45){
            min5time = '40';
        }else if(cut_minute < 50){
            min5time = '45';
        }else if(cut_minute < 55){
            min5time = '50';
        }else if(cut_minute < 60){
            min5time = '55';
        }
        var time_str = cut_hour_str+min5time;
        KLineData_5m_tmp[time_str] = ['-','-','-','-'];
    };

    for (var i=1; i <= kSlice_15m; i++) {
        var date = new Date();
        date.setMinutes(date.getMinutes() - (i*15));
        var time = processTime(date.getTime());
        var cut_minute = +time.substr(14,2);
        var cut_hour_str = time.substr(0,14);
        var min15time = '00';
            if(cut_minute < 15){
            }else if(cut_minute < 30){
                min15time = '15';
            }else if(cut_minute < 45){
                min15time = '30';
            }else if(cut_minute < 60){
                min15time = '45';
            }
        var time_str = cut_hour_str+":"+min15time;
        KLineData_15m_tmp[time_str] = ['-','-','-','-'];
    };
    for (var i=1; i <= kSlice_30m; i++) {
        var date = new Date();
        date.setMinutes(date.getMinutes() - (i*30));
        var time = processTime(date.getTime());
        var cut_minute = +time.substr(14,2);
        var cut_hour_str = time.substr(0,14);
        var min30time = '00';
            if(cut_minute < 30){
            }else if(cut_minute < 60){
                min30time = '30';
            }
        var time_str = cut_hour_str+min30time;
        KLineData_30m_tmp[time_str] = ['-','-','-','-'];
    };
    for (var i=1; i <= kSlice_1h; i++) {
        var date = new Date();
        date.setMinutes(date.getMinutes() - (i*60));
        var time = processTime(date.getTime());
        var cut_hour_str = time.substr(0,14);
        KLineData_1h_tmp[cut_hour_str] = ['-','-','-','-'];
    };
    for (var i=1; i <= kSlice_1d; i++) {
        var date = new Date();
        date.setMinutes(date.getMinutes() - (i*1440));
        var time = processTime(date.getTime());
        var cut_day_str = time.substr(0,10);
        KLineData_1d_tmp[cut_day_str] = ['-','-','-','-'];
    };
}
