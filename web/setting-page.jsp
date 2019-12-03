<%-- 
    Document   : setting_page
    Created on : Nov 26, 2019, 4:35:10 PM
    Author     : nguyen-viet-bach
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/bootstrap-datetimepicker.min.css">
    <link rel="stylesheet" href="css/bulma.min.css">
    <link rel="stylesheet" href="css/common.css">
    <link rel="stylesheet" href="css/setting-page.css">
    <title>Setting</title>
</head>

<body>
    <div class="bg-color">
        <section class="header">
            <div class="container">
                <div></div>
                <h1 class="head-title">HEMSシステムデモンストレーション　ー　設定</h1>
            </div>
        </section>
        <section class="content">
            <div class="container">
                <a href="/Collector/" class="button is-info">
                    <i class="fas fa-home"></i>
                    戻り</a>
                <div class="columns">
                    <div class="left-menu column is-3-fullhd is-4-desktop is-3-tablet" id="device-menu">
                        <div class="menu-item" onclick="showModal('common',' ')">
                            <div class="item-img">
                                <img src="img/website.png" alt="home">
                            </div>
                            <span class="">本体設定</span>
                        </div>
                    </div>
                    <div class="right-menu column is-9-fullhd is-7-desktop is-7-tablet">
                        <div class="right-menu-item" id="modal">
                            <h3>時刻設定</h3>
                            <div class="right-menu-item-input">
                                <input size="16" type="text" readonly class="form_datetime input is-rounded is-primary"
                                    id="time">
                            </div>
                            <button class="button is-primary" onclick="setTime()">
                                設定
                            </button>
                            <div class="notification is-primary" id="success-msg" style="display: none">
                                <button class="delete"></button>
                                Set time successfully!
                            </div>
                            <div class="notification is-danger" id="failed-msg" style="display: none">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

</body>
<script src="js/common.js"></script>
<script src="js/device-json.js"></script>
<script src="js/jquery.js"></script>
<script src="js/bootstrap-datetimepicker.min.js"></script>
<script type="text/javascript">
    $(".form_datetime").datetimepicker({ format: 'yyyy-mm-dd hh:ii' });
</script>
<script src="js/open-modal.js"></script>
<script src="js/time.js"></script>

</html>