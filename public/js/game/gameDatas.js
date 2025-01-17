
var BetPatternDataList = function(bet_pattern_data_list)
{
	this.bet_pattern_data_list = bet_pattern_data_list;

	// 賠率
	this.getPayRate = function(pattern, pay_value, fixNum = 2)
	{
		for (let i = 0; i < this.bet_pattern_data_list.length; i++) {
			const data = this.bet_pattern_data_list[i];
			if(data.bet_pattern_id != pattern)
				continue;

			for (let j = 0; j < data.pay_table_data_list.length; j++) {
				const pay_data = data.pay_table_data_list[j];
				if((pay_data.pay_value >= 0 || pay_value >= 0) && pay_data.pay_value != pay_value)
					continue;

				return parseFloat(pay_data.pay_rate).toFixed(fixNum);
			}
		}
		return 0;
	}

	this.getBetNumberLimit = function(pattern)
	{
		for (let i = 0; i < this.bet_pattern_data_list.length; i++) {
			const data = this.bet_pattern_data_list[i];
			if(data.bet_pattern_id != pattern)
				continue;

			return [parseInt(data.limit_rank_count_min), parseInt(data.limit_rank_count_max), //row
				parseInt(data.limit_rank_number_count_min), parseInt(data.limit_rank_number_count_max)] // col
		}
		return [-1,-1,-1,-1];
	}

	this.getBetBalanceLimit = function(pattern)
	{
		for (let i = 0; i < this.bet_pattern_data_list.length; i++) {
			const data = this.bet_pattern_data_list[i];
			if(data.bet_pattern_id != pattern)
				continue;

			return {min:parseInt(data.limit_bet_balance_min), max:parseInt(data.limit_bet_balance_max)};
		}
		return {min:-1,max:-1};
	}

	// 浮動賠率
	this.getPayRateOffset = function(pattern, pay_value, fixNum = 2)
	{
		for (let i = 0; i < this.bet_pattern_data_list.length; i++) {
			const data = this.bet_pattern_data_list[i];
			if(data.bet_pattern_id != pattern)
				continue;

			for (let j = 0; j < data.pay_table_data_list.length; j++) {
				const pay_data = data.pay_table_data_list[j];
				if((pay_data.pay_value >= 0 || pay_value >= 0) && pay_data.pay_value != pay_value)
					continue;

				return parseFloat(pay_data.pay_rate_offset).toFixed(fixNum);
			}
		}
		return 0;
	}
}

var DrawLotteryHistoryList = function(draw_lottery_log_list, options)
{
	/** 取得大小數值 
	 * @return 1=大, 2=小
	*/
	this.getBigSmallValue = function(cur_lo, center_select_nmu)
	{
		return (cur_lo > center_select_nmu) ? 1 : 2;
	}

	this.getBuySellValue = function(lo)
	{
		return false;
	}

	/** 取得單雙數值 
	 * @return 1=單, 2=雙
	 * */
	this.getOddEvenValue = function(cur_lo)
	{
		return (cur_lo % 2 == 0) ? 2 : 1;
	}

	var o = $.extend({
		max_rank: 10,
		min_select_num: 0,
		max_select_num: 9,
		max_draw_history_list_count:100,
		miss_count_limits: [100],
		get_buySell_fun: this.getBuySellValue,
		get_bigSmall_fun: this.getBigSmallValue,
		get_oddEven_fun: this.getOddEvenValue,
		closer_num_count: null,
		// 計算冷熱(出現次數)的時候判斷
		closer_compareLo_fun: function(lo) { return [lo.lottery - o.min_select_num]; }
	}, options || {});

	var lastDrawContent = null;
	draw_lottery_log_list.sort(function(a,b){return a.draw_lottery_num - b.draw_lottery_num;});

	while(draw_lottery_log_list.length > o.max_draw_history_list_count)
		draw_lottery_log_list.shift();

	if(!o.closer_num_count)
		o.closer_num_count = o.max_select_num - o.min_select_num;

	var thisObj = this;

	var center_select_nmu = Math.floor(o.max_select_num / 2);

	var cLottery = function(lo){
		this.lottery = lo;
		this.buySell = o.get_buySell_fun(lo);
		this.bigSmall = o.get_bigSmall_fun(lo, center_select_nmu); // 大小
		this.oddEven = o.get_oddEven_fun(lo); // 單雙
	}

	var createLotteryLogObject = function(obj)
	{	
		//console.log("gameData => createLotteryLogObject");
		obj.content = parseFloat(obj.draw_lottery_content);
		obj.pre_content = lastDrawContent;
		//var lottery = [obj.draw_lottery_content];
		obj.lotteryList = [];
		//for (let i = 0; i < lottery.length; i++) {
			obj.lotteryList[0] = new cLottery(obj);
		//}
		lastDrawContent = obj.content;

		if(obj.pre_content == null)
			return null;

		obj.isInit = true;
		return obj;
	}

	this.getHistoryListCount = function(){
		return draw_lottery_log_list.length;
	}

	this.getHistory = function(idx){ // idx = 0 是最新的 log
		if(draw_lottery_log_list.length <= idx)
			return null;

		var obj = draw_lottery_log_list[idx];
		if(obj && !obj.isInit){
			obj = createLotteryLogObject(obj);
			if(obj == null){
				draw_lottery_log_list.splice(idx, 1);
				return this.getHistory(idx);
			}
			else
				draw_lottery_log_list[idx] = obj;
		}

		return obj;
	}

	this.addHistory = function(lo){
		//var logObj = {draw_lottery_content:lo.draw_lottery_content, draw_lottery_num:lo.draw_lottery_num,content:lo.draw_lottery_content,pre_content:lastDraw.content};

		if(draw_lottery_log_list != null && (draw_lottery_log_list.length == 0 || draw_lottery_log_list[draw_lottery_log_list.length -1].draw_lottery_num != lo.draw_lottery_num)){
			logObj = createLotteryLogObject(lo);
			if(logObj)
				draw_lottery_log_list.push(logObj);
			
			while(draw_lottery_log_list.length > o.max_draw_history_list_count)
				draw_lottery_log_list.shift();
			//addHistoryToAnalysRank(logObj);
			//addHistoryToAnalysMissCount(logObj);
			return logObj;
		}
		return null;
	}

	var drawLotteryRankArray = null; // idx = 0 是最舊的 log
	var draw_lottery_num_list = null;
	var analysByRank = function()
	{
		drawLotteryRankArray = []; // [[冠軍1,冠軍2,冠軍3,...],[亞軍1,亞軍2,亞軍3,....]....]
        for (let i = 0; i < o.max_rank; i++) // 名次
            drawLotteryRankArray.push([]);

		draw_lottery_num_list = [];

		for (let i = thisObj.getHistoryListCount()-1; i >= 0; i--) {
			const logObj = thisObj.getHistory(i);
			addHistoryToAnalysRank(logObj);
		}
	}
	var addHistoryToAnalysRank = function(log){

		if(!drawLotteryRankArray)
			return;

		for (let j = 0; j < log.lotteryList.length; j++) {
			const lo = log.lotteryList[j];

			drawLotteryRankArray[j].push(lo);
		}
		draw_lottery_num_list.push(log.draw_lottery_num);
	}

	this.getHistoryRankArray = function(){
		if(!drawLotteryRankArray)
			analysByRank();
		return drawLotteryRankArray;
	}

	this.getDrawLotteryNumList = function(){  // idx = 0 是最舊的 log
		if(!drawLotteryRankArray)
			analysByRank();
		return draw_lottery_num_list;
	}

	this.getHistoryArrayByRank = function(rank){
		if(!drawLotteryRankArray)
			analysByRank();
		if(drawLotteryRankArray.length <= rank)
			return null;
		return drawLotteryRankArray[rank];
	}

	// 遺漏
	var drawLotteryMissCountArray = null; // [[0冠軍數量,1冠軍數量...],[0亞軍數量,1亞軍數量...]]
	// 冷熱
	var drawLotteryCloserCountArray = null; // [[0冠軍數量,1冠軍數量...],[0亞軍數量,1亞軍數量...]]
	var analysMissCount = function()
	{
		drawLotteryMissCountArray = [];
		drawLotteryCloserCountArray = [];
		for (let i = 0; i < o.miss_count_limits.length; i++) {
			const limit = o.miss_count_limits[i];
			
			drawLotteryMissCountArray[i] = {limit_count:limit, valueArray:[]};
			drawLotteryCloserCountArray[i] = {limit_count:limit, valueArray:[]};
			var isFindmissCount = [];
			for (let j = 0; j < o.max_rank; j++){ // 名次
				drawLotteryMissCountArray[i].valueArray[j] = [];
				drawLotteryCloserCountArray[i].valueArray[j] = [];
				isFindmissCount[j] = [];
				for (let k = 0; k <= o.closer_num_count; k++){
					drawLotteryMissCountArray[i].valueArray[j].push(0);
					drawLotteryCloserCountArray[i].valueArray[j].push(0);
					isFindmissCount[j].push(0);
				}
			}
		}
		
		for (let i = 0; i < thisObj.getHistoryListCount(); i++) {
			const log = thisObj.getHistory(i);

			for (let j = 0; j < log.lotteryList.length; j++) {
				const lo = log.lotteryList[j];
				const lo_key_array = o.closer_compareLo_fun(lo);

				// 計算冷熱
				for (let lc_idx = 0; lc_idx < o.miss_count_limits.length; lc_idx++) {
					if(i < drawLotteryCloserCountArray[lc_idx].limit_count){
						
						for (let lo_idx = 0; lo_idx < lo_key_array.length; lo_idx++) {
							const lo_key = lo_key_array[lo_idx];
							
							drawLotteryCloserCountArray[lc_idx].valueArray[j][lo_key]++;
						}
					}
				}

				// 計算遺漏
				for (let k = 0; k < isFindmissCount[j].length; k++) {
					if(isFindmissCount[j][k]) // 找到就不找了
						continue;

					for (let lo_idx = 0; lo_idx < lo_key_array.length; lo_idx++) {
						const lo_key = lo_key_array[lo_idx];
						if(k != lo_key){
							for (let lc_idx = 0; lc_idx < o.miss_count_limits.length; lc_idx++) {
								if(i < drawLotteryMissCountArray[lc_idx].limit_count){
									drawLotteryMissCountArray[lc_idx].valueArray[j][k]++;
								}
							}
						}
						else
							isFindmissCount[j][k] = 1;
					}
				}
			}
		}
	}
	var addHistoryToAnalysMissCount = function(logObj){
		analysMissCount(); // 重新計算
	}

	this.getMissCountArray = function(limit_count = 100){
		if(!drawLotteryMissCountArray)
			analysMissCount();

		for (let lc_idx = 0; lc_idx < o.miss_count_limits.length; lc_idx++) {
			if(limit_count == drawLotteryCloserCountArray[lc_idx].limit_count){
				return {closer:drawLotteryCloserCountArray[lc_idx].valueArray, missCount:drawLotteryMissCountArray[lc_idx].valueArray};
			}
		}
		return null;
	}
	
}


// 珠路盤
AnalysisCell = {
	detailAnalysisCell: function(curIdx, drawLottery, draw_lottery_num_list, valueArray, cellObj, checkEqualFun, getViewFun, cell_max_row)
	{
		const lo = drawLottery[curIdx];
		if(curIdx > 0 && checkEqualFun(lo, drawLottery[curIdx-1]))
		{
			if(cellObj.LastColIdx >= 0){
				// 已經轉方向，固定方向不需要再換行
				cellObj.ColIdx++;
			}
			else
			{
				cellObj.RowIdx++;

				var isChangCol = false;
				if(cellObj.RowIdx < cell_max_row && valueArray.length > cellObj.RowIdx){
					for (let i = 0; i < valueArray[cellObj.RowIdx].length; i++) {
						const element = valueArray[cellObj.RowIdx][i];
						if(element.col == cellObj.ColIdx){
							isChangCol = true;
							break;
						}
					}
				}
				if(isChangCol || cellObj.RowIdx >= cell_max_row)
				{
					if(cellObj.LastColIdx < 0)
						cellObj.LastColIdx = cellObj.ColIdx;
					cellObj.RowIdx--;
					cellObj.ColIdx++;
				}
			}
		}
		else
		{
			if(cellObj.LastColIdx >= 0){
				if(cellObj.RowIdx > 0)
					cellObj.ColIdx = cellObj.LastColIdx;
				cellObj.LastColIdx = -1;
			}
			cellObj.RowIdx = 0;
			cellObj.ColIdx++;
		}

		// 補滿 row
		//for (let i = valueArray.length; i <= cellObj.RowIdx; i++) {
		for (let i = valueArray.length; i < cell_max_row; i++) {
			valueArray.push([]);
		}
		var groupIdx = (cellObj.LastColIdx >= 0) ? cellObj.LastColIdx : cellObj.ColIdx;
		var obj = {col:cellObj.ColIdx, lo:lo, getViewFun:getViewFun, draw_lottery_num:draw_lottery_num_list[curIdx], group:groupIdx };
		valueArray[cellObj.RowIdx].push(obj);
		if(cellObj.MaxColIdx < cellObj.ColIdx)
			cellObj.MaxColIdx = cellObj.ColIdx;
		return obj;
	},
	
	/**
	 * 依照 valueArray(drawLotteryRankArray) 來排珠路盤
	 * @param valueArray 資料格式跟 drawLotteryRankArray 一樣 [[冠軍1,冠軍2,冠軍3,...],[亞軍1,亞軍2,亞軍3,....]....]
	 * @param convertToFuns 幾種 toValue 和 toText 的方式
	 * @returns analysis:[[冠軍資料[row0][row1][row2][row3][row4]], [亞軍資料...]], row0:[{col, lo, getViewFun, draw_lottery_num, group},...]
	 */
	analysisCell:function(valueArray, draw_lottery_num_list, convertToFuns, cell_max_row)
	{
		if(!convertToFuns){
			convertToFuns = { checkEqualFun:[function (cur_lo, pre_lo) {return cur_lo.lottery == pre_lo.lottery;}], 
			                  getViewFun: [function (lo) {return lo.lottery.toString();}] };
		}

		var result = new cAnalysisCell(convertToFuns, cell_max_row);
		for (let type = 0; type < convertToFuns.checkEqualFun.length; type++) {
			result.resultArray[type] = [];
		}

		for (let i = 0; i < valueArray.length; i++) {
			const element = valueArray[i];

			for (let type = 0; type < convertToFuns.checkEqualFun.length; type++) {
				
				var cellObj = {RowIdx:0, ColIdx:-1, LastColIdx:-1, MaxColIdx:-1};
				result.resultArray[type][i] = {analysis:[], cellObj:cellObj};
				
				for (let k = 0; k < element.length; k++) {
					AnalysisCell.detailAnalysisCell(k, element, draw_lottery_num_list, result.resultArray[type][i].analysis, cellObj, convertToFuns.checkEqualFun[type], convertToFuns.getViewFun[type], cell_max_row);
				}
			}
		}

		return result;
	}
};
var cAnalysisCell = function(convertToFuns, cell_max_row){
	this.resultArray = [];
	this.convertToFuns = convertToFuns;
	this.cell_max_row = cell_max_row;

	this.addAnalysisCell = function (lotteryList, draw_lottery_num) {
		
		for (let type = 0; type < this.resultArray.length; type++) {
			const tReslutArray = this.resultArray[type];
		
			for (let i = 0; i < lotteryList.length; i++) {
				var cellObj = tReslutArray[i].cellObj;
				const last_lo_row_list = tReslutArray[i].analysis[cellObj.RowIdx];
				const last_lo = last_lo_row_list[last_lo_row_list.length-1].lo;

				const lo = lotteryList[i];

				var tmpArray = [last_lo, lo];
				var tmp_draw_lottery_num_list = ["", draw_lottery_num];
				
				AnalysisCell.detailAnalysisCell(1, tmpArray, tmp_draw_lottery_num_list, this.resultArray[type][i].analysis, cellObj, this.convertToFuns.checkEqualFun[type], this.convertToFuns.getViewFun[type], this.cell_max_row);
			}	
		}
	}
}