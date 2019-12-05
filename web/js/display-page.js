/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function initDevice() {
    var solarElectricAmount = 0;
    var evElectricAmount = 0;
    var batteryElectricAmount = 0;
    
    if (devices.hasOwnProperty("ev")) {
        let ev = devices.ev;
        if(ev.status == ON_STATUS){
            $(".device-ev").html(deviceElem("ev", ev.name, "car", ev.d3 + " Wh", ev.mode));
            if(ev.mode == "Charging"){
                evElectricAmount = ev.d3;
            }else{
                evElectricAmount = 0 - ev.d3;
            }
        }else{
            $(".device-ev").html(deviceElem("ev", ev.name, "car", 0 + " Wh", ""));
        }
    }
    if (devices.hasOwnProperty("battery")) {
        let batt = devices.battery;
        if(batt.status == ON_STATUS){
            $(".device-batt").html(deviceElem("battery", batt.name, "battery", batt.d3 + " Wh", batt.mode));
            if(batt.mode == "Charging"){
                batteryElectricAmount = batt.d3;
            }else{
                batteryElectricAmount = 0 - batt.d3;
            }
        }else{
            $(".device-batt").html(deviceElem("battery", batt.name, "battery", 0 + " Wh", ""));
        }
    }
    if (devices.hasOwnProperty("solar")) {
        let solar = devices.solar;
        if(solar.status == ON_STATUS){
            solarElectricAmount = solar.e0;
            $(".device-solar").html(deviceElem("solar", solar.name, "sun", solar.e0 + " Wh", ""));
        }else{
            $(".device-solar").html(deviceElem("solar", solar.name, "sun", 0 + " Wh", ""));
        }
    }
    if (devices.hasOwnProperty("light")) {
        let light = devices.light;
        $(".device-light").html(deviceElem("light", light.name, "light", light.status, ""));
    }
    $("#sum-up").html(sumUp() + " Wh");
    
    function deviceElem(device, name, img, value, mode) {
        let strMode = "";
        switch (mode) {
            case "Charging":
                strMode = "charging";
                break;
            case "Discharge":
                strMode = "discharging";
                break;
            default:
                strMode = "";
        }
        return "<div class='device'>" +
                "<div class='device-img-wrapper'>" +
                "<img src='img/" + img + ".png' alt='" + name + "'>" +
                "</div>" +
                "<div class='device-info-wrapper'>" +
                "<h5>" + name + "</h5>" +
                "<h2>" + value + "</h2>" +
                "</div>" +
                "</div>" +
                "<div class='" + device + "-" + strMode + "'>" +
                "<div class='delay1'></div>" +
                "<div class='delay2'></div>" +
                "<div class='delay3'></div>" +
                "<div class='delay4'></div>" +
                "</div>";
    }
    function sumUp(){
        return solarElectricAmount + evElectricAmount + batteryElectricAmount;
    }
}
