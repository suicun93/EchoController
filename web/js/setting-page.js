function setName(device) {
    var name = $("#" + device + "-name").val();
    if(name != ''){
        $.ajax({
            type: "POST",
            url: "SetName",
            data: device + "," + name,
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            dataType: "text",
            success: function (response) {
                $(".msg-wrapper").append(responseMsg(SUCCESS_STATUS, "Set name success!"));
                closeMsg();
                if (response == SUCCESS_STATUS) {
                    // Set new name that has been changed
                    $("#device-name").html(name + "設定")  ;
                    $("#" + device + "-menu-name").html(name);
                }
            },
            error: function (response) {
                $(".msg-wrapper").append(responseMsg(FAIL_STATUS, "Set name failed!"));
                closeMsg();
            }
        });
    }else{
        $(".msg-wrapper").append(responseMsg(FAIL_STATUS, "Set name failed!"));
        closeMsg();
    }
}