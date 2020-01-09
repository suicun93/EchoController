function deviceInit() {
    function menuItemElement(device, name, img, alt, macAdd) {
        return "<div class='menu-item' onclick=\"showModal(\'" + device + "\'" + "," + "\'" + name + "\'" + "," + "\'" + macAdd + "\')\">" +
            "<div class='item-img'>" +
            "<img src='img/" + img + ".png' alt='" + alt + "'></div>" +
            "<span class='' id='" + device + "-menu-name'>" + name + "</span></div>"
    };
    if (devices.hasOwnProperty("ev")) {
        ev = devices.ev;
        EV_CURRENT_STATUS = ev.status;
        $('#device-menu').append(menuItemElement('ev', ev.name, 'car', 'Electric Vehicle', ev.macAdd));
    }
    if (devices.hasOwnProperty("battery")) {
        battery = devices.battery;
        BATT_CURRENT_STATUS = battery.status;
        $('#device-menu').append(menuItemElement('battery', battery.name, 'battery', 'Battery', battery.macAdd));
    }
    if (devices.hasOwnProperty("solar")) {
        solar = devices.solar;
        SOLAR_CURRENT_STATUS = solar.status;
        $('#device-menu').append(menuItemElement('solar', solar.name, 'sun', 'Solar Energy', solar.macAdd));
    }
    if (devices.hasOwnProperty("light")) {
        light = devices.light;
        LIGHT_CURRENT_STATUS = light.status;
        $('#device-menu').append(menuItemElement('light', light.name, 'light', 'Light', light.macAdd));
    }
}

function showModal(modalToShow, deviceName) {

    let modal = $('#modal');
    let modeSelectElement = `<div class="field">
                        <label class="label">モード</label>
                        <div class="select">
                            <select id="mode">
                                <option value="42" selected="selected">充電</option>
                                <option value="41">急速充電</option>
                                <option value="43">放電</option>
                                <select>
                                </select> <br><br>
                            </select>
                        </div>
                    </div>`;
    function modalSetEPCForm(status) {
        return `<div class="columns">
        <div class="main-menu column is-8 is-offset-2" id="menu-form">
            <div class="menu-form column is-8 is-offset-2"  >
                <div class="field">
                    <label class="label">状態</label>
                    <div class="control">
                    ${status === ON_STATUS ? `<button class="button is-danger is-rounded is-medium" id="status-btn" onclick="setStatus('${modalToShow}', this)">オフ</button>`
                                    : `<button class="button is-success is-rounded is-medium" id="status-btn" onclick="setStatus('${modalToShow}', this)">オン</button>`}
                        <p class="help is-danger" id="change-status-failed" style='display: none'>Failed to change status!</p>
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
                ${modalToShow !== 'solar' ? modeSelectElement : ''}
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
                        <button class="button is-primary is-outlined" id='submit-btn' onclick="setEpc('${modalToShow}')">設定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    }

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
            modal.append(modalSetEPCForm(SOLAR_CURRENT_STATUS));
            break;
        case "ev":
            modal.html(modalElement('ev', deviceName));
            modal.append(modalSetEPCForm(EV_CURRENT_STATUS));
            break;
        case "battery":
            modal.html(modalElement('battery', deviceName));
            modal.append(modalSetEPCForm(BATT_CURRENT_STATUS));
            break;
        case "light":
            modal.html(modalElement('light', deviceName));
            modal.append(
                 `<div class="columns">
                    <div class="main-menu column is-8 is-offset-2">
                    <div class="menu-form column is-8 is-offset-2">
                    <div class="field">
                        <label class="label">状態</label>
                        <div class="control">
                        ${LIGHT_CURRENT_STATUS === ON_STATUS ? `<button class="button is-danger is-rounded is-medium" id="status-btn" onclick="setStatus('light', this)">オフ</button>`
                                        : `<button class="button is-success is-rounded is-medium" id="status-btn" onclick="setStatus('light', this)">オン</button>`}
                            <p class="help is-danger" id="change-status-failed" style='display: none'>Failed to change status!</p>
                        </div>
                    </div>
                    </div>
                    </div>
                </div>`);
            break;
    }
}

