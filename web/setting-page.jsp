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
        <script src="https://kit.fontawesome.com/594a36984d.js" crossorigin="anonymous"></script>
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
                    <a href="/EchoController/" class="button is-info">
                        <i class="fas fa-home"></i>
                        戻り</a>
                    <div class="columns">
                        <div class="left-menu column is-3-fullhd is-4-desktop is-3-tablet">
                            <div class="menu-item" onclick="showModal('common')">
                                <div class="item-img">
                                    <img src="img/website.png" alt="home">
                                </div>
                                <span class="">本体設定</span>
                            </div>
                            <div class="menu-item" onclick="showModal('solar_modal')">
                                <div class="item-img">
                                    <img src="img/sun.png" alt="home">
                                </div>
                                <span class="">太陽発電</span>
                            </div>
                            <div class="menu-item" onclick="showModal('ev_modal')">
                                <div class="item-img">
                                    <img src="img/car.png" alt="home">
                                </div>
                                <span class="">EV</span>
                            </div>
                            <div class="menu-item" onclick="showModal('battery_modal')">
                                <div class="item-img">
                                    <img src="img/battery.png" alt="home">
                                </div>
                                <span class="">蓄電池</span>
                            </div>
                            <div class="menu-item" onclick="showModal('light_modal')">
                                <div class="item-img">
                                    <img src="img/light.png" alt="home">
                                </div>
                                <span class="">照明</span>
                            </div>
                        </div>
                        <div class="right-menu column is-9-fullhd is-7-desktop is-7-tablet">
                            <div class="right-menu-item" id="common">
                                <h3>時刻設定</h3>
                                <div class="right-menu-item-input">
                                    <input size="16" type="text" readonly
                                           class="form_datetime input is-rounded is-primary" id="time">
                                </div>
                                <button class="button is-primary" onclick="setTime()">
                                    設定
                                </button>
                            </div>
                            <div class="right-menu-item" id="solar_modal" style="display: none">
                                <h3>太陽発電 設定</h3>
                                <div class="right-menu-item-input">
                                    <label for="solar-name">名称:</label>
                                    <input size="16" type="text" class="input is-rounded is-primary" id="solar-name">
                                </div>
                                <button class="button is-primary">
                                    設定
                                </button>
                            </div>
                            <div class="right-menu-item" id="ev_modal" style="display: none">
                                <h3>EV 設定</h3>
                                <div class="right-menu-item-input">
                                    <label for="ev-name">名称:</label>
                                    <input size="16" type="text" class="input is-rounded is-primary" id="ev-name">
                                </div>
                                <button class="button is-primary">
                                    設定
                                </button>
                            </div>
                            <div class="right-menu-item" id="battery_modal" style="display: none">
                                <h3>蓄電池 設定</h3>
                                <div class="right-menu-item-input">
                                    <label for="batt-name">名称:</label>
                                    <input size="16" type="text" class="input is-rounded is-primary" id="batt-name">
                                </div>
                                <button class="button is-primary">
                                    設定
                                </button>
                            </div>
                            <div class="right-menu-item" id="light_modal" style="display: none">
                                <h3>照明 設定</h3>
                                <div class="right-menu-item-input">
                                    <label for="light-name">名称:</label>
                                    <input size="16" type="text" class="input is-rounded is-primary" id="light-name">
                                </div>
                                <button class="button is-primary">
                                    設定
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    </body>
    <script src="js/jquery.js"></script>
    <script src="js/bootstrap-datetimepicker.min.js"></script>
    <script type="text/javascript">
                                $(".form_datetime").datetimepicker({format: 'yyyy-mm-dd hh:ii'});
    </script>
    <script src="js/time.js"></script>
    <script src="js/open-modal.js"></script>

</html>