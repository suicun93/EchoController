var devices = "";
var devices = "";
var ev = null;
var battery = null;
var solar = null;
var light = null;

getAvailableItem();
if(isDisplay){
    setInterval("getAvailableItem()",5400);
}
function getAvailableItem() {
    $.ajax({
        type: "POST",
        url: "GetItemAvailable",
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