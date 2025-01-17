//同時顯示兩種圖(走勢，K線)
var two_chart = true;

//線圖種類開關
var line_switch = true;
var bar_switch = false;
var kline_switch = true;

var trend_canvas_type_option = {};
var kline_canvas_type_option = {};

var kline_element_id = 'kline_charts_content';

var trend_canvas_type = 'line';
var kline_canvas_type = '15m';

//三種切換的selector
var canvas_type_element = $('#canvas_type');//二合一的切換selector
var trend_canvas_type_element = $('#trend_canvas_type');//走勢圖的切換selector
var kline_canvas_type_element = $('#kline_canvas_type');//K線圖的切換selector

if(canvas_type_element.length > 0 || trend_canvas_type_element.length > 0 || kline_canvas_type_element.length > 0){
    if(line_switch){
        trend_canvas_type_option['line']= MessageType.getText("trend_line");
    }
    if(bar_switch){
        if(!line_switch){
            trend_canvas_type = 'bar';
    }
        trend_canvas_type_option['bar']= MessageType.getText("trend_bar");
    }
    if(!document.getElementById(kline_element_id)){
        kline_switch = false;
        console.log('Do not Have Kline element!!!');
    } 
    if(kline_switch){
        if(!line_switch && !bar_switch){
            canvas_type = kline_canvas_type;
        }
    //    kline_canvas_type_option['1m']= MessageType.getText("1mk");
    //    kline_canvas_type_option['5m']= MessageType.getText("5mk");
        kline_canvas_type_option['15m']= MessageType.getText("15mk");
    //    kline_canvas_type_option['30m']= MessageType.getText("30mk");
        kline_canvas_type_option['1h']= MessageType.getText("1hk");
        kline_canvas_type_option['1d']= MessageType.getText("1dk");
    }
    $.each(trend_canvas_type_option, function(index, value){
        $('#canvas_type').append('<option value="'+index+'">'+value+'</option>');
        $('#trend_canvas_type').append('<option value="'+index+'">'+value+'</option>');
    
    });
    
    $.each(kline_canvas_type_option, function(index, value){
       $('#canvas_type').append('<option value="'+index+'">'+value+'</option>');
        $('#kline_canvas_type').append('<option value="'+index+'">'+value+'</option>');
        
    });
}else{
    if(bar_switch && !line_switch){
        trend_canvas_type = 'bar';
    }
}
//載入畫面
var loading = '<div class="loading"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>';
$('span.icon-undo').click(function(){
  $(this).parents('.tap-content').append(loading);
})
//時間補0
function tozero(numA){
  if(parseInt(numA.text())<10){

    numA.text( 0 + numA.text());
  }
  return numA.text();
}
var betPatternList = {
	'100000' : "100K",
	'250000' : "250K",
	'500000' : "500K",
	'1000000' : "1M",
	'2000000' : "2M",
	'3000000' : "3M",
	'5000000' : "5M",
	'10000000' : "10M",
	'20000000' : "20M",
	'30000000' : "30M",
	'50000000' : "50M",
	'100000000' : "100M",
	'200000000' : "200M",
	'300000000' : "300M",
	'500000000' : "500M",
	'1000000000' : "1000M",
};


function chartDisplay(type){
    if(type == 'line' || type == 'bar'){
        trend_canvas_type = type;
        $('.game-box').show();
        if(kline_switch){
            klineElement.hide();
        }
        if(exchangeChart){
            exchangeChart.redraw(trend_canvas_type);
        }
    }else{
        kline_canvas_type = type;
        $('.game-box').hide();
        if(kline_switch){
            klineElement.show();
        }
        }
    if(two_chart){
    	$('.game-box').show();
        if(kline_switch){
        klineElement.show();
    }
    }
    if(kline_switch){
        klineChart.resize();
    }
}

$(function () {
    $("#canvas_type").on("change",function(){
        chartDisplay($(this).val());
    });
    $("#trend_canvas_type").on("change",function(){
        chartDisplay($(this).val());
    });
    $("#kline_canvas_type").on("change",function(){
        chartDisplay($(this).val());
    });
    $('.game-box').hide();
    if(kline_switch){
        klineElement.hide();
    }
    if(line_switch || bar_switch){
        chartDisplay(trend_canvas_type);
    }else{
        chartDisplay(kline_canvas_type);
    }
    // $("#canvas_type").trigger('change');
    if(kline_switch){
        window.onresize = function() {
            klineChart.resize();
        };
    }
});

$(document).ready(function() {

    // setInterval(function () {
    //   let now = new Date();
    //   $('#now_datetime').text(now.format("yyyy/MM/dd HH:mm:ss"));
    // }, 1000);

    //
    $(".list-item").click(function(){
      $(".list-item").removeClass("active");
      $(this).addClass("active");
    });

    //. Tab切換
    $(".nav-tab>li").click(function(){

      $(this).parent().children().removeClass("active");
      $(this).addClass("active");
      var tab_tar = $(this).data("tabs");
      $(this).parent().siblings($(".block")).find($(".tab-pane")).removeClass("active");
      $(tab_tar).addClass("active");
    });
    
    $('#Game_form input[type=radio]').bind("click", function(){
      $thisObj = $(this);
      if($thisObj.val() == 1){
        $thisObj.prop( "checked", false );
        $thisObj.val(0);
      } else {
        $('#Game_form input[type=radio][name='+$thisObj.attr("name")+']').val(0);
        $thisObj.val(1);
      }
    });

	  var room_id = $.urlParam('game');
    $('.list-item[game="'+room_id+'"]').addClass("active");
    var c_title = $('.list-item[game="'+room_id+'"]').children(".list-item-name").text();
    if(line_switch || bar_switch){
        exchangeChart = new ExchangeChart(c_title, trend_canvas_type);
    }
    /* global setting */
    let datepickersOpt = {
        autoclose: true,
        format: 'yyyy-mm-dd',
        startDate: "-90d",
        endDate: "0d"
    };

    $("#history_form [name=start]").datepicker(datepickersOpt).datepicker("setDate", "today")
      .on('changeDate', function (e) {
        //console.log(e.date);
        if(!e.date)
          return;
        let startDate = e.date;
        let endDate = new Date($("#history_form [name=end]").val());
        if(endDate.getTime() < startDate.getTime())
        {
          $("#history_form [name=end]").datepicker("setDate", startDate);
        }
      });

    $("#history_form [name=end]").datepicker(datepickersOpt).datepicker("setDate", "today")
      .on('changeDate', function (e) {
        //console.log(e.date);
        if(!e.date)
          return;
        let endDate = e.date;
        let startDate = new Date($("#history_form [name=start]").val());
        if(endDate.getTime() < startDate.getTime())
        {
          $("#history_form [name=start]").datepicker("setDate", endDate);
        }
      });
	  if(typeof(betPatternList) !== "undefined"){
		let optionTemplate = new $($('#Game_form select option')[0]);
		$('#Game_form select option').remove();
		$('#Game_form select').append(optionTemplate);
		Object.keys(betPatternList).forEach(key => {
			$('#Game_form select').append("<option value='"+key+"'>"+betPatternList[key]+"</option>");
		});
	  }

	$('.amount-quick-button .button').on('click',function(){
		var value = $(this).attr('value');
		var input_value = $('#amount-input').val();
		input_value = input_value ? input_value : 0;
		if(value > 0){
		   $('#amount-input').val(parseInt(value)+parseInt(input_value));
		}else{
		   $('#amount-input').val("");
		}
	}) 
});

var exchangeChart;

//文字放大
function font_s(e , f_zoom){
  var $this=$(e).parent().parent().parent().parent().find("table");
  var fz= parseInt( $this.css("font-size"));
  if(f_zoom=="add"){
    fz++
  }
  else
    fz--
  $this.css("font-size" , fz+"px")
}
//頁面重新整理
function myrefresh(){
  window.location.reload();
}

//表格轉方向

$('#table-arrow').click(function(){
  var $this = $(this).parent().parent().parent().parent().find("table");
  if( $this.hasClass('mode1')){
      $this.removeClass('mode1');

  }
  else{
    $this.addClass('mode1');

  }
});
//頁面最大化
  var temp="";
  $(".fullScreen input").click(function(){
    var se=$(this).parents(".section");
    
    //視窗最大化
    if( $(this).prop('checked')==true){
      temp = se.parent().prop("class");
      $(".section").addClass("hide");
      se.removeClass("hide");
      se.parent().prop("class","col-md-12 full");
    }
    //視窗恢復
    else{
        se.parent().removeClass("full");
        $(".section").removeClass("hide");
        se.parent().removeClass("col-md-12").addClass(temp);
      }
  })


//光箱
function lightBox(light1){
  $(".lightBox").addClass("active");
  $(".lightBox-panel").removeClass("active");
  $(light1).addClass("active");
}

//關閉光箱
function lightBoxClose(){
  $(".lightBox , .lightBox-panel").removeClass("active");
}

$(".lightBox-close , .lightbox-black").click(function(){
  if($(".lightBox-panel.not_auto_close.active").length > 0)
    return;
  lightBoxClose();
});

var ExchangeChart = function(c_title, canvas_type) {	
	$("#game-name").html(c_title);
	
	//設定值與變數

	var arr = [];
	//暫存資料 過濾後加進ARR中給CHART顯示
	this.tmp = {};
	this.startTime=0;
	this.stopTime =0;
	this.gameTime = 0;
	
	var padding = -90000;
	var allOld = {};
	var nowTime = 0;
	var padding = -110000;
	var labelSize = 11;
	var labelPad = 29;
	var labelPad2 = -44;
	var timeFormat = 'MM/DD/YYYY HH:mm';

	var chart = null;
	var ctx = null;
	
	this.gameLabelText = "";
	
	var thisObj = this;
	var refresh = function(chart){
		onRefresh(chart,thisObj);
	}
	//ChartJS走勢圖設定值
	var config = {
		type : canvas_type,
		data : {
			datasets : [{
				label : 'chart',
				backgroundColor : '',
				borderWidth : 1,
				borderColor : 'rgba(255, 255, 255, 1)',
				pointRadius : 0,
				lineTension : 0.1,
				fill : true,
				cubicInterpolationMode : 'monotone',
				data : arr
			}]
		},
		options : {
			title : {
				display : false
			},
			maintainAspectRatio : false,
			legend : {
				display : false
			},
			tooltips : {
				enabled : false,
				// mode: 'nearest',
				// intersect: false
			},
			hover : {
				intersect : false,
				enabled : true,
				mode : 'index',
				animationDuration : 0
			},
			scales : {
				xAxes : [{
					type : 'realtime',
					fontColor : '#ffffff',
					realtime : {
						duration : 180000, //圖表的持續時間(最左邊到最右邊) 180000毫秒 = 3分鐘
						refresh : 100, // 更新頻率多久繪製一次圖表
						delay : padding, //padding,//顯示延遲時間 如為0資料從最右邊開始顯示  負值顯示時間點會往左移動 duration180000 delay -90000 則現在時間點在正中間
						ttl : 36000000, //超過此範圍的資料不顯示
						onRefresh : refresh,

					},
					//顯示的時間格式設定
					time : {
						minUnit : "millisecond", //最小時間單位
						displayFormats : {
							millisecond : "HH:mm:ss.SSS",
							second : "HH:mm:ss",
							minute : "HH:mm:ss",
							hour : "hA",
							day : "MMM D",
							week : "ll",
							month : "MMM YYYY",
							quarter : "[Q]Q - YYYY",
							year : "YYYY"
						}
					},
					gridLines : {
						color : 'rgba(102, 175, 218, 0.3)',
						zeroLineColor : 'rgba(47, 48, 53, 1)',
						drawBorder : true,
						lineWidth : 1
					},
					ticks : {
						fontColor : 'rgba(199, 199, 199, 1)'
					},
				}],
				yAxes : [{
					type : 'linear',
					display : true,
					position : 'right',
					gridLines : {
						color : 'rgba(102, 175, 218, 0.3)',
						zeroLineColor : 'rgba(47, 48, 53, 1)',
						drawBorder : true,
						lineWidth : 1,
						offsetGridLines : true
					},
					scaleLabel : {
						display : false
					},
					ticks : {
						fontColor : 'rgba(199, 199, 199, 1)'
					},
				}]
			},
			pan : {
				enabled : true,
				mode : 'x',
				rangeMax : {
					x : 3600000
				},
				rangeMin : {
					x : padding
				},
				onPan : function(e) {
					//reZoom();
					if (arr.length > 0) {
						chart.options.pan.rangeMax.x = arr.slice(-1)[0].x - arr[0].x + padding;
					}
				}
			},
			zoom : {
				enabled : false,
				// mode : 'x',
				// rangeMax : {
				// 	x : 3600000
				// },
				// rangeMin : {
				// 	x : 180000
				// },
				// speed : 0.5,
				// onZoom : function(e) {
				// 	//reZoom();
				// 	//filter();
				// }
			},
			annotation : {
				events : ['click'],
				dblClickSpeed : 350,
				annotations : []
			}
		}
	};
	
	this.setStartTime = function(time){
		this.startTime = time;
		addLabel(this);
	}
	
	this.setStopTime = function(time){
		this.stopTime = time;
		addLabel(this);
	}
	
	this.setGameTime = function(time){
		this.gameTime = time;
		addLabel(this);
	}
	
	this.setGameLabel = function(str){
		this.gameLabelText = str;
		config.options.annotation.annotations[3].label.content = str;
	}
	
	this.redraw = function(trend_canvas_type){
	    //var canvas_type = $("#canvas_type").val();
	    config.type = trend_canvas_type;
	    if(trend_canvas_type == 'line'){
            config.data.datasets[0].borderWidth = 1.5;
	    }else if(trend_canvas_type == 'bar'){
            config.data.datasets[0].borderWidth = 0;
	    }
	    ctx = $('#chart-view').get(0).getContext('2d');
        var h = $('#chart-view').height();
        gradientFill(ctx, h, trend_canvas_type);
    }
	
	//資料過濾
	function filter(chart, thisObj) {
		var zone = (chart.scales['x-axis-0'].max - chart.scales['x-axis-0'].min);
		arr = [];
		var avg = 200;
		step = (Math.floor(zone / 1000 / avg) || 1) * 1000;
		var min = Math.floor(chart.scales['x-axis-0'].min / step) * step;
		for (var i = 0; i <= avg; i++) {
			var key = Math.floor(min / 1000) * 1000 + (i * step);
			//arr.push({x: key, y: 90});
			if (thisObj.tmp[key]) {
				arr.push({
					x : key,
					y : thisObj.tmp[key]
				});
			}
		}

		//console.log(arr);
		config.data.datasets[0].data = arr;
		chart.update({
			duration : 0
		});
	}

	//ChartJS-Streaming Realtime更新方法
	function onRefresh(chart, thisObj) {
		nowTime = Math.floor(Date.now() / 1000) * 1000;
		
		filter(chart, thisObj);
		
		//走勢圖 目前匯率
		if (arr.length > 0) {
			//更新高度
			var meta = chart.getDatasetMeta(0);
			var metaY = meta.data[meta.data.length - 1]._model;
			$('.now-data').css('top', metaY.y + 10);
			
			//更新顯示數值
			var last = arr[arr.length-1].y;
			$('.now-data b').text(last.slice(0, -2));
			$('.now-data i').text(last.slice(-2));
		}
		else{
			$('.now-data').css('top', '-100%');
		}
		
		var endLabel = chart.config.options.annotation.annotations[2].value;
		
		var t = (thisObj.startTime - nowTime) / 1000;
		t = t === 60 ? 0 : t;

		//周到期滿時間
		var cd = (thisObj.gameTime - nowTime) / 1000;
		cd = cd<0 ? 0 : cd;

		if (nowTime >= endLabel) {
			addLabel(thisObj);
		}
		var gameLabel = chart.config.options.annotation.annotations[3].value;

		//GameLine
		/*if (nowTime >= gameLabel && thisObj.tmp[gameLabel]) {
			var eTime = thisObj.tmp[gameLabel];
			config.options.annotation.annotations[3].label.content = '本期結算: ' + eTime;
			
		} else if (nowTime < gameLabel) {
			config.options.annotation.annotations[3].label.content = '本期結算: ' + (cd) + '秒'
		}*/
		$('#time').text(t);
		
		//StopLine
		config.options.annotation.annotations[1].label.content =  MessageType.getText("countdown") + thisObj.lastSeconds + ' '+ MessageType.getText("sec");
	}

	function addLabel(ec) {
		var length = config.options.annotation.annotations.length;
		var startObj = {
			type : 'line',
			drawTime : 'afterDraw',
			mode : 'vertical',
			scaleID : 'x-axis-0',
			value : ec.startTime,
			borderColor : 'rgba(116, 116, 116, 1)',
			borderWidth : 2,
			label : {
				backgroundColor : 'rgba(0, 0, 0, 0.6)',
				content : MessageType.getText("end_of_purchase"),
				fontStyle : 'normal',
				fonnColor : '#8ba4c2',
				fontSize : labelSize,
				xAdjust : labelPad,
				cornerRadius : 0,
				position : 'top',
				enabled : true
			}
		};
		var stopObj = {
			type : 'line',
			drawTime : 'afterDraw',
			mode : 'vertical',
			scaleID : 'x-axis-0',
			value : ec.stopTime,
			borderColor : 'rgba(136, 136, 136, 1)',
			borderWidth : 2,
			label : {
				backgroundColor : 'rgba(0, 0, 0, 0.6)',
				content : MessageType.getText("countdown"),
				fontStyle : 'normal',
				fonnColor : '#8ba4c2',
				fontSize : labelSize,
				xAdjust : labelPad2,
				cornerRadius : 0,
				position : 'top',
				enabled : true
			}
		};
		var boxObj = {
			type : 'box',
			drawTime : 'afterDraw',
			xScaleID : 'x-axis-0',
			xMin : ec.startTime + 50,
			xMax : ec.stopTime - 50,
			backgroundColor : 'rgba(33, 95, 158, 0.1)',
			borderWidth : 0
		};
		var gameObj = {
			type : 'line',
			drawTime : 'afterDraw',
			mode : 'vertical',
			scaleID : 'x-axis-0',
			value : ec.gameTime,
			borderColor : 'rgba(116, 116, 116, 1)',
			borderWidth : 2,
			label : {
				backgroundColor : 'rgba(40, 145, 189, 0.5)',
				content : ec.gameLabelText,
				fontStyle : 'normal',
				fonnColor : '#8ba4c2',
				fontSize : labelSize,
				cornerRadius : 0,
				position : 'bottom',
				enabled : true
			}
		};
		config.options.annotation.annotations.splice(0, 1, boxObj);
		config.options.annotation.annotations.splice(1, 1, stopObj);
		config.options.annotation.annotations.splice(2, 1, startObj);
		config.options.annotation.annotations.splice(3, 1, gameObj);

		if (length > 4) {
			setTimeout(function() {
				config.options.annotation.annotations.splice(4, length - 4);
			}, 10000);
		}
	}

	//折線下方填充顏色
	var gradientFill = function(canvas, height, trend_canvas_type) {
		var bgc = canvas.createLinearGradient(0, 0, 0, height - 50);
        //var canvas_type = $("#canvas_type").val();
        if(trend_canvas_type == "bar"){
            bgc.addColorStop(1, "rgba(39, 144, 210, 0.5)");
        }else{
            bgc.addColorStop(0, "rgba(39, 144, 210, 0.5)");
            bgc.addColorStop(0.8, "rgba(39, 144, 210, 0.1)");
            bgc.addColorStop(0.95, "rgba(39, 144, 210, 0.025)");
            bgc.addColorStop(1, "rgba(39, 144, 210, 0)");
        }
		config.data.datasets[0].backgroundColor = bgc;
	}; 

    
    


	ctx = $('#chart-view').get(0).getContext('2d');
	chart = new Chart(ctx, config);
    //var canvas_type = $("#canvas_type").val();
    if(canvas_type == 'line'){
        config.type = canvas_type;
        config.data.datasets[0].borderWidth = 1.5;
    }else if(canvas_type == 'bar'){
        config.type = canvas_type;
        config.data.datasets[0].borderWidth = 0;
    }
    
	addLabel(this); //

/*
	setInterval(function() {
		
		chart.update({
			lazy : false
		});
			
		
	}, 200);
*/
	//視窗大小自適化
	$(window).on('resize', function() {
		var h = $('#chart-view').height();
		gradientFill(ctx, h, trend_canvas_type);
	}).resize();
}; 


ExchangeChart.prototype.redraw = function(datas, canvas_type) {
    exchangeChart.redraw(canvas_type);
    // console.log(exchangeChart);
}


ExchangeChart.prototype.init = function(datas) {
	for (var i = 0; i < datas.length; i++) {
		this.addNewData(datas[i]);
	}
}


ExchangeChart.prototype.resize = function()
{
  //this.myChart.resize();
}

//走勢圖-縮放功能
ExchangeChart.prototype.chart_scale = function(e) 
{
/*
  //取得圖表縮放開始值
  var start = this.myChart.getOption().dataZoom[0].start;
  //取得圖表縮放結束值
  var end = this.myChart.getOption().dataZoom[0].end;

  if (e == "add") {
    start = start + 5;
  }
  if (e == "less") {
    start = start - 5;
  }
  this.myChart.clear();
  this.myChart.setOption({
    dataZoom: [
      {
        start: start,
        end: end,
      }],
  });
*/
}

//新增顯示購買的數值
ExchangeChart.prototype.addBuyValue = function(value) 
{
    var item = {
      yAxis: value,
      label: {
        show: true,
        position: 'end',
        rotate: 180,
        color: 'red',
        fontSize: 14,
        padding: 5
      },
      lineStyle: { type: 'dashed', color: 'red' }
    }
    this.markline_data.push(item);
}


ExchangeChart.prototype.addNewData = function(data,force = false) {
	//console.log("force = " + force);
	timestamp = moment(data["time"]).format("X") * 1000;
	if(force || !this.tmp[timestamp])
		this.tmp[timestamp] = data["value"];
}

ExchangeChart.prototype.setLastSeconds = function(lastSeconds) {
	this.lastSeconds = lastSeconds;
}

   
/*
function addNewData(data) {
	timestamp = moment(data["time"]).format("X") * 1000;
	tmp[timestamp] = data["value"];
	//console.log(timestamp);
}
*/
