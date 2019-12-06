/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Main;

import Common.Convert;
import static Model.MyEchoDevices.EV;
import static Model.MyEchoDevices.BATTERY;
import static Model.MyEchoDevices.SOLAR;
import static Model.MyEchoDevices.LIGHT;

import Model.OperationStatus;
import Model.OperationMode;
import com.sonycsl.echo.Echo;
import com.sonycsl.echo.EchoProperty;
import com.sonycsl.echo.eoj.EchoObject;
import com.sonycsl.echo.eoj.device.DeviceObject;
import com.sonycsl.echo.eoj.device.housingfacilities.Battery;
import com.sonycsl.echo.eoj.device.housingfacilities.ElectricVehicle;
import com.sonycsl.echo.eoj.device.housingfacilities.GeneralLighting;
import com.sonycsl.echo.eoj.device.housingfacilities.HouseholdSolarPowerGeneration;
import com.sonycsl.echo.eoj.device.managementoperation.Controller;
import com.sonycsl.echo.eoj.profile.NodeProfile;
import com.sonycsl.echo.node.EchoNode;
import com.sonycsl.echo.processing.defaults.DefaultController;
import com.sonycsl.echo.processing.defaults.DefaultNodeProfile;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

/**
 *
 * @author hoang-trung-duc
 */
public class EchoController {

    // Init nodeProfile, controller, ev, battery, ...
    private static final DefaultNodeProfile NODE_PROFILE = new DefaultNodeProfile();
    private static final Controller CONTROLLER = new DefaultController();

    public static void startController() throws IOException {
        if (!Echo.isStarted()) {
            addEvent();
            Echo.start(NODE_PROFILE, new DeviceObject[]{CONTROLLER});
            NodeProfile.informG().reqInformInstanceListNotification().send();
        }
    }

    public static void stopController() throws IOException {
        Echo.clear();
    }

    public static ArrayList<DeviceObject> listDevice() {
        ArrayList<DeviceObject> listDevice = new ArrayList<>();
        for (EchoNode node : Echo.getNodes()) {
            if (!node.isSelfNode()) {
                listDevice.addAll(Arrays.asList(node.getDevices()));
            }
        }
        return listDevice;
    }

    // Add Event
    public static void addEvent() {
        Echo.addEventListener(new Echo.EventListener() {

            @Override
            public void onNewNodeProfile(NodeProfile profile) {
                System.out.println("Node = " + profile);
                System.out.println("--------");
                super.onNewNodeProfile(profile);
                profile.setReceiver(new NodeProfile.Receiver() {
                    @Override
                    protected void onGetInstanceListNotification(EchoObject eoj, short tid, byte esv, EchoProperty property, boolean success) {
                        super.onGetInstanceListNotification(eoj, tid, esv, property, success);
                        for (EchoNode node : Echo.getNodes()) {
                            if (!node.isSelfNode()) {
                                Echo.removeOtherNode(node.getAddressStr());
                            }
                        }
                    }
                });
            }

            @Override
            public void onNewElectricVehicle(ElectricVehicle ev) {
                super.onNewElectricVehicle(ev);
                System.out.println("\t   Device = " + ev);

                // Setup
                EV.address = ev.getNode().getAddressStr();
                ev.setReceiver(new ElectricVehicle.Receiver() {
                    @Override
                    protected void onGetOperationStatus(EchoObject eoj, short tid, byte esv, EchoProperty property, boolean success) {
                        super.onGetOperationStatus(eoj, tid, esv, property, success); //To change body of generated methods, choose Tools | Templates.
                        if (!success) {
                            System.out.println("onGetProperty " + EV.name() + " Failed: EPC = " + Convert.byteToHex(property.epc));
                        } else {
                            EV.operationStatus = OperationStatus.from(property.edt[0]);
                        }
                    }

                    @Override
                    protected void onGetOperationModeSetting(EchoObject eoj, short tid, byte esv, EchoProperty property, boolean success) {
                        super.onGetOperationModeSetting(eoj, tid, esv, property, success); //To change body of generated methods, choose Tools | Templates.
                        if (!success) {
                            System.out.println("onGetProperty " + EV.name() + " Failed: EPC = " + Convert.byteToHex(property.epc));
                        } else {
                            EV.operationMode = OperationMode.from(property.edt[0]);
                        }
                    }

                    @Override
                    protected void onGetMeasuredInstantaneousChargeDischargeElectricEnergy(EchoObject eoj, short tid, byte esv, EchoProperty property, boolean success) {
                        super.onGetMeasuredInstantaneousChargeDischargeElectricEnergy(eoj, tid, esv, property, success); //To change body of generated methods, choose Tools | Templates.
                        if (!success) {
                            System.out.println("onGetProperty " + EV.name() + " Failed: EPC = " + Convert.byteToHex(property.epc));
                        } else {
                            EV.d3 = Convert.byteArrayToInt(property.edt);
                        }
                    }

                });
                // Fire signal
                try {
                    ev.get().reqGetOperationStatus().send();
                    ev.get().reqGetOperationModeSetting().send();
                    ev.get().reqGetMeasuredInstantaneousChargeDischargeElectricEnergy().send();
                } catch (IOException e) {
                    System.out.println("Get Property " + EV.name() + " Failed: " + e.getMessage());
                }
            }

            @Override
            public void onNewBattery(Battery battery) {
                super.onNewBattery(battery);
                System.out.println("\t   Device = " + battery);

                // Set up
                BATTERY.address = battery.getNode().getAddressStr();
                battery.setReceiver(new Battery.Receiver() {
                    @Override
                    protected void onGetOperationStatus(EchoObject eoj, short tid, byte esv, EchoProperty property, boolean success) {
                        super.onGetOperationStatus(eoj, tid, esv, property, success); //To change body of generated methods, choose Tools | Templates.
                        if (!success) {
                            System.out.println("onGetProperty " + BATTERY.name() + " Failed: EPC = " + Convert.byteToHex(property.epc));
                        } else {
                            BATTERY.operationStatus = OperationStatus.from(property.edt[0]);
                        }
                    }

                    @Override
                    protected void onGetOperationModeSetting(EchoObject eoj, short tid, byte esv, EchoProperty property, boolean success) {
                        super.onGetOperationModeSetting(eoj, tid, esv, property, success); //To change body of generated methods, choose Tools | Templates.
                        if (!success) {
                            System.out.println("onGetProperty " + BATTERY.name() + " Failed: EPC = " + Convert.byteToHex(property.epc));
                        } else {
                            BATTERY.operationMode = OperationMode.from(property.edt[0]);
                        }
                    }

                    @Override
                    protected void onGetMeasuredInstantaneousChargeDischargeElectricEnergy(EchoObject eoj, short tid, byte esv, EchoProperty property, boolean success) {
                        super.onGetMeasuredInstantaneousChargeDischargeElectricEnergy(eoj, tid, esv, property, success); //To change body of generated methods, choose Tools | Templates.
                        if (!success) {
                            System.out.println("onGetProperty " + BATTERY.name() + " Failed: EPC = " + Convert.byteToHex(property.epc));
                        } else {
                            BATTERY.d3 = Convert.byteArrayToInt(property.edt);
                        }
                    }

                });
                // Fire signal
                try {
                    battery.get().reqGetOperationStatus().send();
                    battery.get().reqGetOperationModeSetting().send();
                    battery.get().reqGetMeasuredInstantaneousChargeDischargeElectricEnergy().send();
                } catch (IOException e) {
                    System.out.println("Get Property " + BATTERY.name() + " Failed: " + e.getMessage());
                }
            }

            @Override
            public void onNewHouseholdSolarPowerGeneration(HouseholdSolarPowerGeneration solar) {
                super.onNewHouseholdSolarPowerGeneration(solar); //To change body of generated methods, choose Tools | Templates.
                System.out.println("\t   Device = " + solar);

                // Set up
                SOLAR.address = solar.getNode().getAddressStr();
                solar.setReceiver(new HouseholdSolarPowerGeneration.Receiver() {
                    @Override
                    protected void onGetOperationStatus(EchoObject eoj, short tid, byte esv, EchoProperty property, boolean success) {
                        super.onGetOperationStatus(eoj, tid, esv, property, success); //To change body of generated methods, choose Tools | Templates.
                        if (!success) {
                            System.out.println("onGetProperty " + SOLAR.name() + " Failed: EPC = " + Convert.byteToHex(property.epc));
                        } else {
                            SOLAR.operationStatus = OperationStatus.from(property.edt[0]);
                        }
                    }

                    @Override
                    protected void onGetMeasuredInstantaneousAmountOfElectricityGenerated(EchoObject eoj, short tid, byte esv, EchoProperty property, boolean success) {
                        super.onGetMeasuredInstantaneousAmountOfElectricityGenerated(eoj, tid, esv, property, success); //To change body of generated methods, choose Tools | Templates.
                        if (!success) {
                            System.out.println("onGetProperty " + SOLAR.name() + " Failed: EPC = " + Convert.byteToHex(property.epc));
                        } else {
                            SOLAR.e0 = Convert.byteArrayToInt(property.edt);
                        }
                    }
                });
                // Fire signal
                try {
                    solar.get().reqGetOperationStatus().send();
                    solar.get().reqGetMeasuredInstantaneousAmountOfElectricityGenerated().send();
                } catch (IOException e) {
                    System.out.println("Get Property " + SOLAR.name() + " Failed: " + e.getMessage());
                }
            }

            @Override
            public void onNewGeneralLighting(GeneralLighting light) {
                super.onNewGeneralLighting(light); //To change body of generated methods, choose Tools | Templates.
                System.out.println("\t   Device = " + light);

                // Set up
                LIGHT.address = light.getNode().getAddressStr();
                light.setReceiver(new GeneralLighting.Receiver() {
                    @Override
                    protected void onGetOperationStatus(EchoObject eoj, short tid, byte esv, EchoProperty property, boolean success) {
                        super.onGetOperationStatus(eoj, tid, esv, property, success); //To change body of generated methods, choose Tools | Templates.
                        if (!success) {
                            System.out.println("onGetProperty " + LIGHT.name() + " Failed: EPC = " + Convert.byteToHex(property.epc));
                        } else {
                            LIGHT.operationStatus = OperationStatus.from(property.edt[0]);
                        }
                    }
                });
                // Fire signal
                try {
                    light.get().reqGetOperationStatus().send();
                } catch (IOException e) {
                    System.out.println("Get Property " + LIGHT.name() + " Failed: " + e.getMessage());
                }
            }
        });
    }
}
