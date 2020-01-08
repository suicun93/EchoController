function setStatus(device){
    let edt = '';
    switch(device){
        case 'ev':
            edt = '0x027e';
            if(ev !== null){
                ajaxCall(edt, ev.macAdd, '0x80', "0x30");
            }
            break;
        case 'solar':
            edt = '0x0279';
            break;
        case 'battery':
            edt = '0x027d';
            break;
        case 'light':
            edt = '0x0290';
            break;
    }
    
}

function ajaxCall(edt, macAdd, epc, value){
    $.ajax({
        type : 'POST',
        url: "http://192.168.52.2:8080/Collector/SetEPC",
        data: edt +"," + macAdd + "," + epc + "," + value,
        success: function (response) {
            console.log(response);
        },
        error: function (response) {
            console.log(response);
        }
    })
}
    