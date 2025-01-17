MessageType = {
	getText: function (a) {
		switch (a) {
			case 'relogin_message':
				return "Xin vui lòng đăng nhập"; //請返回平台重新登人
			case 'exceed_max_connetion':
				return "Tiếp cận kết nối Max."; //已超出最大連線數
			case 'betting':
				return "Đặt cược ..."; //下注中...
			case 'current_settlement':
				return "Giải quyết hiện tại"; //本期結算
			case 'sec':
				return "Chia ra"; //秒
			case 'bet_failed':
				return "Đặt cược thất bại"; //投注失敗
			case 'no_data':
				return "Không kết quả"; //找不到資料
			case 'bet_num':
				return "Số sê-ri"; //交易編號
			case 'trade_time':
				return "Thời gian"; //交易時間
			case 'draw_lottery_num':
				return "Không."; //期號
			case 'content':
				return "Nội dung"; //內容
			case 'pay_rate':
				return "Tỷ lệ cược "; //賠率
			case 'rate':
				return "Tỷ giá"; //匯率
			case 'result':
				return "Kết quả"; //結果
			case 'amount':
				return "Số tiền"; //交易金額
			case 'my_result':
				return "Kết quả của tôi"; //交易結果
			case 'network_fail':
				return "Mạng thất bại"; //網路錯誤
            case 'prev':
                return "Trang trước"; //上一頁
            case 'next':
                return "Trang tiếp theo"; //下一頁
            case 'invalid':
                return "không hợp lệ"; //無效
			case 'end_of_purchase':
				return "Kết thúc mua hàng"; //結束購買
			case 'countdown':
				return "Đếm ngược."; //本期倒數
			case 'rise':
				return "Tăng lên"; //高標
			case 'fall':
				return "Ngã"; //低標
			case 'odd':
				return "Lẻ"; //奇數
			case 'even':
				return "CHẴN"; //偶數
			case 'up':
				return "Lên"; //漲
			case 'down':
				return "Xuống"; //跌
			case 'not_same':
				return "Không giống"; //非平盤
            case 'time':
                return "thời gian"; //時間
            case 'open':
                return "khai mạc"; //開盤
            case 'close':
                return "Đóng cửa"; //收盤
            case 'highest':
                return "cao nhất"; //最高
            case 'lowest':
                return "thấp nhất"; //最低
            case 'trend_line':
                return "Khuynh hướng(Line)"; //走勢(Line)
            case 'trend_bar':
                return "Khuynh hướng(Bar)"; //走勢(Bar)
            case '1mk':
                return "1 phút K"; //1分K
            case '5mk':
                return "5 phút K"; //5分K
            case '15mk':
                return "15 phút K"; //15分K
            case '30mk':
                return "30 phút K"; //30分K
            case '1hk':
                return "Giờ K"; //小時K
            case '1dk':
                return "Ngày K"; //日K
		}
		return a;
	},
    getRoomNameList: function () {
        return {
            '700': "BTC/USD",
            '701': "ETH/USD",
            '702': "GBP/USD",
            '703': "EUR/USD",
            '704': "USD/JPY",
            '705': "USD/CHF",
            '706': "USD/RUB",
            '710': "XAU/USD",
            '711': "XAG/USD",
            '712': "Natural gas",
            '713': "USD/CNY",
            '714': "Crude oil",
            '715': "TVC",
            '716': "nhôm",
            '717': "Kẽm"
        };
    }
};