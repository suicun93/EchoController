window.onload = deviceInit();
function deviceInit() {
    function menuItemElement(device, name, img, alt) {
        return "<div class='menu-item' onclick=\"showModal(\'"+ device +"\'" + ","+"\'" + name + "\')\">" +
            "<div class='item-img'>" +
            "<img src='img/" + img + ".png' alt='" + alt + "'></div>" +
            "<span class=''>" + name + "</span></div>"
    };
    if (devices[0].hasOwnProperty("ev")) {
        let ev = devices[0].ev;
        $('#device-menu').append(menuItemElement('ev', ev.name, 'car', 'Electric Vehicle'));
    }
    if (devices[0].hasOwnProperty("battery")) {
        let battery = devices[0].battery;
        $('#device-menu').append(menuItemElement('battery', battery.name, 'battery', 'Battery'));
    }
    if (devices[0].hasOwnProperty("solar")) {
        let solar = devices[0].solar;
        $('#device-menu').append(menuItemElement('solar', solar.name, 'sun', 'Solar Energy'));
    }
    if (devices[0].hasOwnProperty("light")) {
        let light = devices[0].light;
        $('#device-menu').append(menuItemElement('light', light.name, 'light', 'Light'));
    }
}

function showModal(modalToShow, deviceName) {
    let modal = $('#modal');
    function modalElement(modalToShow, deviceName) {
        return "<h3>" + deviceName + "設定</h3>" +
            "<div class='right-menu-item-input'>" +
            "<label for='"+modalToShow+"-name'>名称:</label>" +
            "<input size='16' type='text' name='"+modalToShow+"-name' class='input is-rounded is-primary' id='"+modalToShow+"-name'></div>" +
            "<button class='button is-primary'>設定</button></div>";
    }
    switch (modalToShow) {
        case "common":
            modal.html("<h3>時刻設定</h3>" +
                "<div class='right-menu-item-input'>" +
                "<input size='16' type='text' readonly class='form_datetime input is-rounded is-primary'id='time'>" +
                "</div>" +
                "<button class='button is-primary' onclick='setTime()'>設定</button>");
            // loadTime();
            break;
        case "solar":
            modal.html(modalElement('solar',deviceName));
            break;
        case "ev":
            modal.html(modalElement('ev',deviceName));
            break;
        case "battery":
            modal.html(modalElement('battery',deviceName));
            break;
        case "light":
            modal.html(modalElement('light',deviceName));
            break;
    }
}