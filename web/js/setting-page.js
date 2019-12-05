function setName(device){
    var name = $("#"+device+"-name").val();
    $.ajax({
        type: "POST",
        url: "/SetName",
        data: device +"," +name,
        scriptCharset: 'UTF-8',
        dataType: "text",
        success: function (result,status,xhr) {
            $(".msg-wrapper").append(responseMsg(SUCCESS_STATUS, "Set name success!"));
            closeMsg();
        },
        error: function(result,status,xhr){
            $(".msg-wrapper").append(responseMsg(FAIL_STATUS, "Set name success!"));
            closeMsg();
        }
    });
}