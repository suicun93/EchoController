function setStatus(device, elem){
    $(elem).attr('disabled', true);
    let eoj = '';
    switch(device){
        case 'ev':
            eoj = '0x027e';
            if(ev !== null){
                if(EV_CURRENT_STATUS === OFF_STATUS){
                    promiseAjaxStatusOn(eoj, ev.macAdd);
                    EV_CURRENT_STATUS = ON_STATUS;
                }else{
                    promiseAjaxStatusOff(eoj, ev.macAdd);
                    EV_CURRENT_STATUS = OFF_STATUS;
                }
            }else{
                console.log('EV not found!');
                $('#change-status-failed').attr('style', 'display:block');
                $(elem).attr('disabled', false);
            }
            break;
        case 'solar':
            eoj = '0x0279';
            if(solar !== null){
                if(SOLAR_CURRENT_STATUS === OFF_STATUS){
                    promiseAjaxStatusOn(eoj, solar.macAdd);
                    SOLAR_CURRENT_STATUS = ON_STATUS;
                }else{
                    promiseAjaxStatusOff(eoj, solar.macAdd);
                    SOLAR_CURRENT_STATUS = OFF_STATUS;
                }
            }else{
                console.log('Solar not found!');
                $('#change-status-failed').attr('style', 'display:block');
                $(elem).attr('disabled', false);
            }
            break;
        case 'battery':
            eoj = '0x027d';
            if(solar !== null){
                if(BATT_CURRENT_STATUS === OFF_STATUS){
                    promiseAjaxStatusOn(eoj, battery.macAdd);
                    BATT_CURRENT_STATUS = ON_STATUS;
                }else{
                    promiseAjaxStatusOff(eoj, battery.macAdd);
                    BATT_CURRENT_STATUS = OFF_STATUS;
                }
            }else{
                console.log('Battery not found!');
                $('#change-status-failed').attr('style', 'display:block');
                $(elem).attr('disabled', false);
            }
            break;
        case 'light':
            eoj = '0x0290';
            if(solar !== null){
                if(LIGHT_CURRENT_STATUS === OFF_STATUS){
                    promiseAjaxStatusOn(eoj, light.macAdd);
                    LIGHT_CURRENT_STATUS = ON_STATUS;
                }else{
                    promiseAjaxStatusOff(eoj, light.macAdd);
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

function setEpc(device){
    let eoj = '';
    switch(device){
        case 'ev':
            eoj = '0x027e';
            setSchedule(eoj, ev.macAdd);
            break;
        case 'solar':
            eoj = '0x0279';
            setSchedule(eoj, solar.macAdd);
            break;
        case 'battery':
            eoj = '0x027d';
            break;
        case 'light':
            eoj = '0x0290';
            break;
    }

    function setSchedule(eoj, macAdd){
        //prevent spamming
        $('#submit-btn').attr('disabled', true);

        //validate and convert start time to hex
        let startTime = $('#startTime').val()
        if(startTime === ''){
            //display error message if null
            $('#start-time-invalid-mess').attr('style', 'display:block');
            $('#submit-btn').attr('disabled', false);
            return;
        }else{
            startTime = convertTimeToHex(startTime);
            $('#start-time-invalid-mess').attr('style', 'display:none');
        }
        //validate and convert end time to hex
        let endTime = $('#endTime').val();
        if(endTime === ''){
            //display error message if null
            $('#end-time-invalid-mess').attr('style', 'display:block');
            $('#submit-btn').attr('disabled', false);
            return;
        }else{
            endTime = convertTimeToHex(endTime);
            $('#end-time-invalid-mess').attr('style', 'display:none');
        }
        let mode = $('#mode').val();
        let instValue = $('#instantaneous').val();
        if(instValue === ''){
            //display error message if null
            $('#instantaneous-value-mess').attr('style', 'display:block');
            $('#submit-btn').attr('disabled', false);
            return;
        }else{
            instValue = parseInt(instValue).toString(16);
            do{
                instValue = '0' + instValue;
            }while(instValue.length < 8)
            $('#instantaneous-value-mess').attr('style', 'display:none');
        }
        //add zero into instValue to become 8 bytes
        let data = startTime + endTime + mode + instValue;
        console.log(data);
        ajaxCall(eoj, macAdd, '0xFF', data)
        .then(function(response){
            if(response === SUCCESS_STATUS){
                console.log(response);
                $('#submit-btn').attr('disabled', false);
                $('#menu-form').append(responseMsg(SUCCESS_STATUS, 'Schedule Successful!'));
                closeMsg();
            }else{
                $('#menu-form').append(responseMsg(FAIL_STATUS, 'Schedule Failed!'));
                closeMsg();
            }
        })
        .catch(function(error){
            console.log(error);
            $('#menu-form').append(responseMsg(FAIL_STATUS, 'Schedule Failed!'));
        });
    }
}

function convertTimeToHex(time){
    let splittedTime = time.split(':')
    let hour = parseInt(splittedTime[0]).toString(16);
    let minute = parseInt(splittedTime[1]).toString(16);
    return addZero(hour) + addZero(minute);
}

function addZero(number){
    if(number.length < 2){
        return '0' + number;
    }
    return number;
}

function ajaxCall(eoj, macAdd, edt, epc){
    return new Promise(function (resolve, reject){
        $.ajax({
            type : 'POST',
            url: "http://192.168.52.2:8080/Collector/SetEPC",
            data: eoj +"," + macAdd + "," + edt + "," + epc,
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
    