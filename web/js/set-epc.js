function setStatus(device, elem){
    $(elem).attr('disabled', true);
    let edt = '';
    switch(device){
        case 'ev':
            edt = '0x027e';
            if(ev !== null){
                if(EV_CURRENT_STATUS === OFF_STATUS){
                    promiseAjaxStatusOn(edt, ev.macAdd);
                    EV_CURRENT_STATUS = ON_STATUS;
                }else{
                    promiseAjaxStatusOff(edt, ev.macAdd);
                    EV_CURRENT_STATUS = OFF_STATUS;
                }
            }else{
                console.log('EV not found!');
                $('#change-status-failed').attr('style', 'display:block');
                $(elem).attr('disabled', false);
            }
            break;
        case 'solar':
            edt = '0x0279';
            if(solar !== null){
                if(SOLAR_CURRENT_STATUS === OFF_STATUS){
                    promiseAjaxStatusOn(edt, solar.macAdd);
                    SOLAR_CURRENT_STATUS = ON_STATUS;
                }else{
                    promiseAjaxStatusOff(edt, solar.macAdd);
                    SOLAR_CURRENT_STATUS = OFF_STATUS;
                }
            }else{
                console.log('Solar not found!');
                $('#change-status-failed').attr('style', 'display:block');
                $(elem).attr('disabled', false);
            }
            break;
        case 'battery':
            edt = '0x027d';
            if(solar !== null){
                if(BATT_CURRENT_STATUS === OFF_STATUS){
                    promiseAjaxStatusOn(edt, battery.macAdd);
                    BATT_CURRENT_STATUS = ON_STATUS;
                }else{
                    promiseAjaxStatusOff(edt, battery.macAdd);
                    BATT_CURRENT_STATUS = OFF_STATUS;
                }
            }else{
                console.log('Battery not found!');
                $('#change-status-failed').attr('style', 'display:block');
                $(elem).attr('disabled', false);
            }
            break;
        case 'light':
            edt = '0x0290';
            if(solar !== null){
                if(LIGHT_CURRENT_STATUS === OFF_STATUS){
                    promiseAjaxStatusOn(edt, light.macAdd);
                    LIGHT_CURRENT_STATUS = ON_STATUS;
                }else{
                    promiseAjaxStatusOff(edt, light.macAdd);
                    LIGHT_CURRENT_STATUS = OFF_STATUS;
                }
            }else{
                console.log('Light not found!');
                $('#change-status-failed').attr('style', 'display:block');
                $(elem).attr('disabled', false);
            }
            break;
    }
    function promiseAjaxStatusOn(eoj, macAdd){
        ajaxCall(eoj, macAdd, '0x80', '0x30').then(function(response){
            console.log(response);
            $(elem).attr('disabled', false);
            $(elem).removeClass('is-success');
            $(elem).addClass('is-danger');
            $(elem).text('オフ');
            $('#change-status-failed').attr('style', 'display:none');
            return SUCCESS_STATUS;
        })
        .catch(function(error){
            console.log(error);
            $('#change-status-failed').attr('style', 'display:block');
            $(elem).attr('disabled', false);
            return FAIL_STATUS;
        })
    }
    function promiseAjaxStatusOff(eoj, macAdd){
        ajaxCall(eoj, macAdd, '0x80', "0x31").then(function(response){
            console.log(response);
            $(elem).attr('disabled', false);
            $(elem).removeClass('is-danger');
            $(elem).addClass('is-success');
            $(elem).text('オン');
            $('#change-status-failed').attr('style', 'display:none');
            return SUCCESS_STATUS;
        })
        .catch(function(error){
            console.log(error);
            $('#change-status-failed').attr('style', 'display:block');
            $(elem).attr('disabled', false);
            return FAIL_STATUS;
        })
    }
}

function ajaxCall(eoj, macAdd, epc, edt){
    return new Promise(function (resolve, reject){
        $.ajax({
            type : 'POST',
            url: "SetEPC",
            data: eoj +"," + macAdd + "," + epc + "," + edt,
            dataType: 'text',
            success: function (response) {
                resolve(response) ;
            },
            error: function (response) {
                reject(response);
            }
        })
    });
}
    