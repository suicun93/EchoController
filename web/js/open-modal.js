function deviceInit() {
    function menuItemElement(device, name, img, alt, macAdd) {
        return "<div class='menu-item' onclick=\"showModal(\'" + device + "\'" + "," + "\'" + name + "\'" + "," + "\'" + macAdd + "\')\">" +
            "<div class='item-img'>" +
            "<img src='img/" + img + ".png' alt='" + alt + "'></div>" +
            "<span class='' id='" + device + "-menu-name'>" + name + "</span></div>"
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
    let modeSelect = `<div class="field">
                        <label class="label">モード</label>
                        <div class="select">
                            <select id="mode">
                                <option value="0x42" selected="selected">充電</option>
                                <option value="0x41">急速充電</option>
                                <option value="0x43">放電</option>
                                <select>
                                </select> <br><br>
                            </select>
                        </div>
                    </div>`;
    let setEPCForm = 
    `<div class="columns">
        <div class="main-menu column is-8 is-offset-2">
            <div class="menu-form column is-8 is-offset-2">
                <div class="field">
                    <label class="label">状態</label>
                    <div class="control">
                        <button class="button is-success is-rounded is-medium" id="status-btn">オン</button>
                    </div>
                </div>
                <div class="field">
                    <label class="label">始まる時間</label>
                    <div class="control">
                        <input class="input" id="startTime" type="time" required>
                    </div>
                    <p class="help is-danger" id="start-time-invalid-mess"
                        style="display: none">This value is required!</p>
                </div>
                <div class="field">
                    <label class="label">終了時間</label>
                    <div class="control">
                        <input class="input" id="endTime" type="time" required>
                    </div>
                    <p class="help is-danger" id="end-time-invalid-mess" style="display: none">
                        This value is required!</p>
                </div>
                ${modalToShow !== 'solar' ? modeSelect : ''}
                <div class="field">
                    <label class="label">瞬時値電力量</label>
                    <div class="control">
                        <input class="input" type="number" id="instantaneous" min="1"
                            max="999999999" placeholder="ユニット: W" required>
                    </div>
                    <p class="help is-danger" id="instantaneous-value-mess"
                        style="display: none">This value is required and must be greater than 0
                        and smaller than 999999999</p>
                </div>
                <div class="field">
                    <div class="control">
                        <button class="button is-primary is-outlined">設定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    function modalElement(modalToShow, deviceName) {
        return "<h3 id='device-name'>" + deviceName + "設定</h3>" +
            "<div class='right-menu-item-input'>" +
            "<label for='" + modalToShow + "-name'>名称:</label>" +
            "<input size='16' required type='text' name='" + modalToShow + "-name' class='input is-rounded is-primary' id='" + modalToShow + "-name' ></div>" +
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
            modal.append(setEPCForm);
            break;
        case "ev":
            modal.html(modalElement('ev', deviceName));
            modal.append(setEPCForm);
            break;
        case "battery":
            modal.html(modalElement('battery', deviceName));
            modal.append(setEPCForm);
            break;
        case "light":
            modal.html(modalElement('light', deviceName));
            break;
    }
}