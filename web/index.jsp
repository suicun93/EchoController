<%-- 
    Document   : index.jsp
    Created on : Nov 26, 2019, 2:07:46 PM
    Author     : hoang-trung-duc
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
        <link rel="stylesheet" href="css/top-page.css">
        <title>Welcome to HEMS</title>
    </head>
    <body>
        <div class="bg-color">
            <section>
                <div class="container">
                    <div class="welcome-banner">
                        <h1>HEMSシステムデモンストレーション</h1>
                        <div class="main-menu-btn">
                            <div>
                                <button class="button is-primary is-rounded is-large" onclick="window.location.href = 'setting-page.jsp'">設定</button>
                                <span>機器に設定を行います。</span>
                            </div>
                            <div >
                                <button class="button is-link is-rounded is-large" onclick="window.location.href = 'display-page.jsp'">電力表示</button>
                                <span>現在の電力状態を表示できます。</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    </body>

</html>
