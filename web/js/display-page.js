/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//initDevice();
var isDisplay = true;
function initDevice(){
    if(devices.hasOwnProperty("ev")){
        let ev = devices.ev;
        if(ev.status == "ON"){
            $(".device-ev").html(deviceElem("ev",ev.name,"car",150,ev.mode));
        }
    }
    if(devices.hasOwnProperty("battery")){
        let batt = devices.battery;
        if(batt.status == "ON"){
            $(".device-batt").html(deviceElem("battery",batt.name,"battery",150,batt.mode));
        }
    }
    if(devices.hasOwnProperty("solar")){
        let solar = devices.solar;
        if(solar.status == "ON"){
            $(".device-solar").html(deviceElem("solar",solar.name,"sun",150,"Charging"));
        }
    }
    if(devices.hasOwnProperty("light")){
        let light = devices.light;
        if(light.status == "ON"){
            $(".device-light").html(deviceElem("light",light.name,"light",150,""));
        }
    }
    function deviceElem(device, name, img, value, mode){
        let strMode = "";
        switch (mode){
            case "Charging":
                strMode = "charging";
                break;
            case "Discharge":
                strMode = "discharging";
                break;
            default:
                strMode = "";
        }
        if(device == "solar"){
            return "<div class='"+device+"-"+strMode+"'>"+
                    "<div class='delay1'></div>"+
                    "<div class='delay2'></div>"+
                    "<div class='delay3'></div>"+
                    "<div class='delay4'></div>"+
                "</div>"+
                "<div class='device'>"+
                    "<div class='device-img-wrapper'>"+
                        "<img src='img/"+img+".png' alt='"+name+"'>"+
                    "</div>"+
                    "<div class='device-info-wrapper'>"+
                        "<h5>"+name+"</h5>"+
                        "<h2>"+value+" Wh</h2>"+
                    "</div>"+
                "</div>";
        }
        return "<div class='device'>"+
                    "<div class='device-img-wrapper'>"+
                        "<img src='img/"+img+".png' alt='"+name+"'>"+
                    "</div>"+
                    "<div class='device-info-wrapper'>"+
                        "<h5>"+name+"</h5>"+
                        "<h2>"+value+" Wh</h2>"+
                    "</div>"+
                "</div>"+
                "<div class='"+device+"-"+strMode+"'>"+
                    "<div class='delay1'></div>"+
                    "<div class='delay2'></div>"+
                    "<div class='delay3'></div>"+
                    "<div class='delay4'></div>"+
                "</div>";
    }
}
