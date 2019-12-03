function responseMsg(type,content){
    console.log("<div class=\"notification is-" + (type == "success" ? "primary" : "danger") +"\" id=\"response-msg\"><button class=\"delete\"></button>"+content+"</div>");
    return "<div class=\"notification is-" + (type == "success" ? "primary" : "danger") +"\" id=\"response-msg\" ><button class=\"delete\"></button>"+content+"</div>";
}
function closeMsg() {
    $(".delete").click(function (e) { 
        $("#response-msg").remove();
    });
}

const INTERVAL_TIME = 15000;
const TIME_OUT = 1000;
const STATE_READY = 4;
const STATUS_OK = 200;
const SUCCESS_STATUS = "success";
const FAIL_STATUS = "failed";