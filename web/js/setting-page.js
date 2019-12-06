function setName(device) {
    var name = $("#" + device + "-name").val();
    $.ajax({
        type: "POST",
        url: "http://192.168.52.2:8080/Collector/SetName",
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
            $(".msg-wrapper").append(responseMsg(FAIL_STATUS, "Set name success!"));
            closeMsg();
        }
    });

}