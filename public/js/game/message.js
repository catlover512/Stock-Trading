
// OnConstructor
var LoginRequest = function () {
    this.login_type_id = 0;
    this.msg_params;
};
LoginRequest.prototype.GetServiceName = function() 
{
    return "LoginService";
}

var GetUserRoomDataListRequest = function () {
	this.group_id;
};
GetUserRoomDataListRequest.prototype.GetServiceName = function() 
{
    return "RoomService";
}

// OnConstructor
var JoinRoomRequest = function () {
    this.room_id = 1;
};
JoinRoomRequest.prototype.GetServiceName = function() 
{
    return "RoomService";
}

// OnConstructor
var GetUserDataRequest = function () {
	
};
GetUserDataRequest.prototype.GetServiceName = function() 
{
    return "GameUserService";
}

var BetData = function()
{
	this.bet_pattern_id = 1;
	this.bet_pattern_content = "";
	this.bet_balance = 10.0;
}

// OnConstructor
var UserBetRequest = function () {
    this.room_id = 1;
	this.draw_lottery_id = 1;
	this.bet_data_list;
};
UserBetRequest.prototype.GetServiceName = function() 
{
    return "RoomService";
}

var DrawLotteryLogData = function()
{
	this.id = 1;
	this.draw_lottery_num = "";
	this.expected_draw_time = "";
	this.draw_lottery_time = "";
	this.draw_lottery_content = "";
}

// OnConstructor
var GetDrawLotteryHistoryRequest = function () {
    this.room_id = 1;
	this.count = 5;
};
GetDrawLotteryHistoryRequest.prototype.GetServiceName = function() 
{
    return "DrawLotteryClientService";
}

// OnConstructor
var GetRoomInfoRequest = function () {
    this.room_id = 1;
};
GetRoomInfoRequest.prototype.GetServiceName = function() 
{
    return "RoomService";
}

var GetBetHistoryRequest = function()
{
	this.room_id;
	this.page;
	this.draw_lottery_num;
	this.from_date = 0;
	this.to_date = 0;
}
GetBetHistoryRequest.prototype.GetServiceName = function() 
{
    return "BetLogService";
}

var GetBinaryPriceInfoRequest = function()
{
	this.room_id = 0;
	this.group_id = 0;
	this.count = 0;
}
GetBinaryPriceInfoRequest.prototype.GetServiceName = function() 
{
    return "BinaryOptionClientService";
}

//GetKlineHistoryRequest
var GetKlineHistoryRequest = function()
{
    this.room_id = 0;
}
GetKlineHistoryRequest.prototype.GetServiceName = function() 
{
    return "RoomService";
}