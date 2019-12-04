
var devices = "";
getAvailableItem();
if(isDisplay){
    setInterval("getAvailableItem()",5000);
}
function getAvailableItem(){
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://192.168.52.2:8080/Collector/GetItemAvailable", true);
    xmlHttp.setRequestHeader("Content-Type", "text/plain");
    xmlHttp.onerror = (e) => {
        console.log("Cannot connect to server");
    };
    xmlHttp.onload = (e) =>{
        if (xmlHttp.readyState === STATE_READY && xmlHttp.status === STATUS_OK) {
            devices = JSON.parse(xmlHttp.responseText).devices;
            console.log(devices);
            if(!isDisplay){
                deviceInit();
            }else{
                initDevice();
            }
        }else{
            console.log("Get devices2 failed");
        }
    };
    xmlHttp.send("");
}