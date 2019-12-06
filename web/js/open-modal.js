function deviceInit() {
    function menuItemElement(device, name, img, alt, macAdd) {
        return "<div class='menu-item' onclick=\"showModal(\'" + device + "\'" + "," + "\'" + name + "\'" + "," + "\'" + macAdd + "\')\">" +
            "<div class='item-img'>" +
            "<img src='img/" + img + ".png' alt='" + alt + "'></div>" +
            "<span class='' id='"+ device + "-menu-name'>" + name + "</span></div>"
    };
    if (devices.hasOwnProperty("ev")) {
        let ev = devices.ev;
        $('#device-menu').append(menuItemElement('ev', ev.name, 'car', 'Electric Vehicle', ev.macAdd));
    }
    if (devices.hasOwnProperty("battery")) {
        let battery = devices.battery;
        $('#device-menu').append(menuItemElement('battery', battery.name, 'battery', 'Battery', battery.macAdd));
    }
    if (devices.hasOwnProperty("solar")) {
        let solar = devices.solar;
        $('#device-menu').append(menuItemElement('solar', solar.name, 'sun', 'Solar Energy', solar.macAdd));
    }
    if (devices.hasOwnProperty("light")) {
        let light = devices.light;
        $('#device-menu').append(menuItemElement('light', light.name, 'light', 'Light', light.macAdd));
    }
}

function showModal(modalToShow, deviceName) {
    let modal = $('#modal');
    function modalElement(modalToShow, deviceName) {
        return "<h3 id='device-name'>" + deviceName + "設定</h3>" +
            "<div class='right-menu-item-input'>" +
            "<label for='" + modalToShow + "-name'>名称:</label>" +
            "<input size='16' type='text' name='" + modalToShow + "-name' class='input is-rounded is-primary' id='" + modalToShow + "-name'></div>" +
            "<button class='button is-primary' id='set-name-btn' onclick=\"setName(\'" + modalToShow + "\')\">設定</button></div>";
    }
    switch (modalToShow) {
        case "common":
            modal.html("<h3>時刻設定</h3>" +
                "<div class='right-menu-item-input'>" +
                "<input size='16' type='text' readonly class='form_datetime input is-rounded is-primary' id='time'>" +
                "</div>" +
                "<button class='button is-primary' onclick='setTime()'>設定</button>");
            timeInput = document.getElementById("time");
            $(".datetimepicker").remove();
            $(".form_datetime").datetimepicker({ format: 'yyyy-mm-dd hh:ii' });
            loadTime();
            break;
        case "solar":
            modal.html(modalElement('solar', deviceName));
            break;
        case "ev":
            modal.html(modalElement('ev', deviceName));
            break;
        case "battery":
            modal.html(modalElement('battery', deviceName));
            break;
        case "light":
            modal.html(modalElement('light', deviceName));
            break;
    }
}