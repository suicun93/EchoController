var devices = "";
getAvailableItem();
if(isDisplay){
    setInterval("getAvailableItem()",10000);
}
function getAvailableItem() {
    $.ajax({
        type: "POST",
        url: "http://192.168.52.2:8080/Collector/GetItemAvailable",
        data: "",
        dataType: "json",
        success: function (response) {
            devices = response.devices;
            console.log(response);
            if (!isDisplay) {
                deviceInit();
            } else {
                initDevice();
            }
        },
        error: function (response) {
            console.log(response);
        }

    });
}