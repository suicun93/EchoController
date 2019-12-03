/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Common;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Calendar;

/**
 *
 * @author hoang-trung-duc
 */
public class Config {

    private static final boolean RUNNING_ON_LINUX = true;
//    private static final boolean RUNNING_ON_LINUX = false;

    public static String getLink() {
        if (RUNNING_ON_LINUX) {
            return "/opt/tomcat/webapps/";
        } else {
            return "";
        }
    }

    public static void save(String fileName, String content) throws Exception {

        try {
            // Save config
            try (BufferedWriter writer = new BufferedWriter(new FileWriter(getLink() + fileName))) {
                writer.write(content);
            }
        } catch (IOException e) {
            throw new Exception(Config.class.getName() + ", Save: " + e.getMessage());
        }
    }

    public static void updateDeviceNickname() {
        // Load Config
        byte[] encoded;
        try {
            encoded = Files.readAllBytes(Paths.get(getLink() + "Config.txt"));
        } catch (IOException ex) {
            System.err.println("Load name config error: " + ex.getMessage());
            return;
        }
        String config = new String(encoded, StandardCharsets.UTF_8);

        // Split 4 nick name
        String[] nameConfig = config.split("\\,");
        if (config.isEmpty() || nameConfig.length != 4) {
            System.err.println("Load name config error : File Config is empty.");
            return;
        }
        String evName, solarName, batteryName, lightName;
        evName = nameConfig[0];
        batteryName = nameConfig[1];
        solarName = nameConfig[2];
        lightName = nameConfig[3];

        // Update to MyEchoDevices constants
        MyEchoDevices.BATTERY.nickname = batteryName;
        MyEchoDevices.EV.nickname = evName;
        MyEchoDevices.SOLAR.nickname = solarName;
        MyEchoDevices.LIGHT.nickname = lightName;
    }

}
