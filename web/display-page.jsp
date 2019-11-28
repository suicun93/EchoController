<%-- 
    Document   : display-page
    Created on : Nov 28, 2019, 1:15:01 PM
    Author     : nguyen-viet-bach
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="stylesheet" href="css/bulma.min.css">
    <link rel="stylesheet" href="css/common.css">
    <link rel="stylesheet" href="css/display-page.css">
    <title>Display</title>
</head>

<body>
<div class="bg-color">
        <section class="header">
            <div class="container">
                <div></div>
                <h1 class="head-title">HEMSシステムデモンストレーション</h1>
            </div>
        </section>
        <section class="content">
            <div class="container">
                <div class="main-screen columns">
                    <div class="column is-10 is-offset-1">
                        <div>
                            <div class="devices top-devices columns">
                                <div class="device-ev column is-4-fullhd is-4-desktop is-6-tablet ">
                                    <div class="device">
                                        <div class="device-img-wrapper">
                                            <img src="img/car.png" alt="Electronic Vehicle">
                                        </div>
                                        <div class="device-info-wrapper">
                                            <h5>Set Name EV</h5>
                                            <h2>100Wh</h2>
                                        </div>
                                    </div>
                                    <div class="">
                                        <div class="delay1"></div>
                                        <div class="delay2"></div>
                                        <div class="delay3"></div>
                                        <div class="delay4"></div>
                                    </div>
                                </div>
                                <div class="device-batt column is-4-fullhd is-4-desktop is-6-tablet is-offset-4-fullhd is-offset-4-desktop is-offset-0-tablet  ">
                                    <div class="device">
                                        <div class="device-img-wrapper">
                                            <img src="img/battery.png" alt="Battery">
                                        </div>
                                        <div class="device-info-wrapper">
                                            <h5>Set Name EV</h5>
                                            <h2>100Wh</h2>
                                        </div>
                                    </div>
                                    <div class="">
                                        <div class="delay1"></div>
                                        <div class="delay2"></div>
                                        <div class="delay3"></div>
                                        <div class="delay4"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="devices middle-devices columns">
                                <div class="home column is-6 is-offset-3">
                                    <div class="home-img-wrapper">
                                        <img src="img/home.png" alt="House">
                                    </div>
                                    <div class="home-info-wrapper">
                                        <h2>100Wh</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="devices bottom-devices columns">
                                <div class="device-solar column is-4-fullhd is-4-desktop is-6-tablet ">
                                    <div class="device">
                                        <div class="device-img-wrapper">
                                            <img src="img/sun.png" alt="Solar Panel">
                                        </div>
                                        <div class="device-info-wrapper">
                                            <h5>Set Name EV</h5>
                                            <h2>100Wh</h2>
                                        </div>
                                    </div>
                                </div>
                                <div class="device-light column is-4-fullhd is-4-desktop is-6-tablet is-offset-4-fullhd is-offset-4-desktop is-offset-0-tablet is-offset-0-mobile">
                                    <div class="device">
                                        <div class="device-img-wrapper">
                                            <img src="img/light.png" alt="Light">
                                        </div>
                                        <div class="device-info-wrapper">
                                            <h5>Set Name EV</h5>
                                            <h2>100Wh</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

</body>

</html>