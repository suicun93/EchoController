/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Main;

import Common.Convert;
import Model.MyBattery;
import Model.MyElectricVehicle;
import Model.MyLight;
import Model.MySolar;
import com.sonycsl.echo.Echo;
import com.sonycsl.echo.EchoProperty;
import com.sonycsl.echo.eoj.EchoObject;
import com.sonycsl.echo.eoj.device.DeviceObject;
import com.sonycsl.echo.eoj.device.housingfacilities.Battery;
import com.sonycsl.echo.eoj.device.housingfacilities.ElectricVehicle;
import com.sonycsl.echo.eoj.device.housingfacilities.GeneralLighting;
import com.sonycsl.echo.eoj.device.housingfacilities.HouseholdSolarPowerGeneration;
import com.sonycsl.echo.eoj.device.managementoperation.Controller;
import com.sonycsl.echo.node.EchoNode;
import com.sonycsl.echo.processing.defaults.DefaultNodeProfile;
import java.util.ArrayList;

/**
 *
 * @author hoang-trung-duc
 */
public class EchoController {

    // Init nodeProfile, controller, ev, battery, ...
    private static final DefaultNodeProfile NODE_PROFILE = new DefaultNodeProfile();
    public static final MyElectricVehicle EV = new MyElectricVehicle();
    public static final MyBattery BATTERY = new MyBattery();
    public static final MySolar SOLAR = new MySolar();
    public static final MyLight LIGHT = new MyLight();
    public static ArrayList<DeviceObject> listDevice = new ArrayList<>();

    public static boolean contains(String device) {
        if (device.equalsIgnoreCase("battery")) {
            return listDevice.contains(BATTERY);
        }
        if (device.equalsIgnoreCase("ev")) {
            return listDevice.contains(EV);
        }
        if (device.equalsIgnoreCase("solar")) {
            return listDevice.contains(SOLAR);
        }
        if (device.equalsIgnoreCase("light")) {
            return listDevice.contains(LIGHT);
        }
        return false;
    }

    // Add Event
    public static void addEvent() {
        Echo.addEventListener(new Echo.EventListener() {

            // Found new Node.
            @Override
            public void onNewNode(EchoNode node) {
                super.onNewNode(node);
                // Found new Node.
                System.out.println("New Node found.");
                System.out.println("Node id = " + node.getAddress().getHostAddress());
                System.out.println("Node = " + node.getNodeProfile());
                System.out.println("--------\n");
            }

            // Found new DeviceObject.
            @Override
            public void onNewDeviceObject(DeviceObject device) {
                super.onNewDeviceObject(device);
                System.out.println("\t   New " + deviceDetect(device) + " found.");
                System.out.println("\t   Device = " + device);
                System.out.println("\t   ----\n\n");

                // Set Receiver for getter setter.
                device.setReceiver(new ElectricVehicle.Receiver() {
                    // Getter Receiver 
                    @Override
                    protected boolean onGetProperty(EchoObject eoj, short tid, byte esv, EchoProperty property, boolean success) {
                        if (!success) {
                            System.out.println("onGetProperty Failed: EPC = " + Convert.byteToHex(property.epc));
                        } else {
                            System.out.println("onGetProperty Success:  EPC = " + Convert.byteToHex(property.epc) + " Data: ");
                            Convert.printHexArray(property.edt);
                        }
                        return super.onGetProperty(eoj, tid, esv, property, success);
                    }

                    // Setter Receiver
                    @Override
                    protected boolean onSetProperty(EchoObject eoj, short tid, byte esv, EchoProperty property, boolean success) {
                        if (!success) {
                            System.out.println("onSetProperty Failed: EPC = " + Convert.byteToHex(property.epc));
                        } else {
                            System.out.println("onSetProperty Success:  EPC = " + Convert.byteToHex(property.epc));
                        }
                        return super.onSetProperty(eoj, tid, esv, property, success);
                    }
                });
            }
        }); // No more events.
    }
    // Device Detection

    private static String deviceDetect(DeviceObject device) {
        // Device detection
        if (device instanceof Controller) {
            return "Controller";
        }
        if (device instanceof MyBattery) {
            return "My Battery";
        }
        if (device instanceof MyElectricVehicle) {
            return "My Electric Vehicle";
        }
        if (device instanceof MySolar) {
            return "My Solar";
        }
        if (device instanceof MyLight) {
            return "My Light";
        }
        if (device instanceof ElectricVehicle) {
            return "Electric Vehicle";
        }
        if (device instanceof Battery) {
            return "Battery";
        }
        if (device instanceof HouseholdSolarPowerGeneration) {
            return "Solar";
        }
        if (device instanceof GeneralLighting) {
            return "Light";
        }
        return "Unknown";
    }
}
