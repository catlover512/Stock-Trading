ErrorType = {
    getText: function (a) {
        switch (a) {
            case 100:
                return "Lỗi kết nối máy chủ";
            case 20000:
                return "Không tham gia được vào phòng";
            case 30000:
                return "Thương mại thất bại";
            case 30001:
                return "ID giao dịch là khác nhau";
            case 30003:
                return "Chờ đợi Vẽ";
            case 30004:
                return "Không đủ số tiền";
            case 30005:
                return "Số tiền giao dịch vượt quá giới hạn của giao dịch \ n, số tiền giao dịch còn lại: {0}";
            case 30006:
                return "Đã không điền vào số tiền giao dịch";
            case 30007:
                return "Không có nội dung giao dịch";
            case 30008:
                return "Lỗi tỷ lệ cược";
            case 30009:
                return "Có các loại giao dịch trùng lặp trong một thông báo giao dịch";
            case 30100:
                return "Khối lượng giao dịch nằm dưới giới hạn loại đặt cược tối thiểu";
            case 30101:
                return "Khối lượng giao dịch cao hơn giới hạn loại đặt cược tối đa";
            case 30102:
                return "Số lượng tham số cần thiết cho nội dung cá cược là sai";
            case 30103:
                return "Giá trị giao dịch nằm ngoài phạm vi";
            case 30104:
                return "Đặt cược ra khỏi phạm vi";
            case 30105:
                return "Số lượng vị trí cá cược nằm dưới giới hạn tối thiểu";
            case 30106:
                return "Số lượng vị trí cá cược cao hơn giới hạn tối đa";
            case 30107:
                return "Số lượng cược trong cùng tên là dưới giới hạn tối thiểu";
            case 30108:
                return "Số lượng cược trong cùng tên cao hơn giới hạn tối đa";
            case 30109:
                return "Giá trị giao dịch được nhân đôi";
            case 30110:
                return "Số lượng giao dịch lặp đi lặp lại dưới mức giới hạn tối thiểu";
            case 30111:
                return "Số lượng giao dịch lặp lại cao hơn giới hạn tối đa";
            case 30112:
                return "Số tiền giao dịch không có trong định nghĩa";
        }
        return "";
    }
};