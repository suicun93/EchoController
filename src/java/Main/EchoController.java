/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Main;

import Common.Config;
import Common.Convert;
import Common.MyEchoDevices;
import Common.OperationStatus;
import Common.OperationMode;
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
                        super.onGetInstanceListNotification(eoj, tid, esv, property, success); //To change body of generated methods, choose Tools | Templates.
                        for (EchoNode node : Echo.getNodes()) {
                            if (!node.isSelfNode()) {
                                Echo.removeOtherNode(node.getAddressStr());
                            }
                        }
                    }
                });
            }

            @Override
            public void onNewElectricVehicle(ElectricVehicle device) {
                super.onNewElectricVehicle(device);
                MyEchoDevices dv = MyEchoDevices.EV;
                System.out.println("\t   Device = " + device);
                // Setup
                device.setReceiver(new ElectricVehicle.Receiver() {
                    @Override
                    protected void onGetOperationStatus(EchoObject eoj, short tid, byte esv, EchoProperty property, boolean success) {
                        super.onGetOperationStatus(eoj, tid, esv, property, success); //To change body of generated methods, choose Tools | Templates.
                        if (!success) {
                            System.out.println("onGetProperty " + dv.name() + " Failed: EPC = " + Convert.byteToHex(property.epc));
                        } else {
                            dv.operationStatus = OperationStatus.from(property.edt[0]);
                        }
                    }

                    @Override
                    protected void onGetOperationModeSetting(EchoObject eoj, short tid, byte esv, EchoProperty property, boolean success) {
                        super.onGetOperationModeSetting(eoj, tid, esv, property, success); //To change body of generated methods, choose Tools | Templates.
                        if (!success) {
                            System.out.println("onGetProperty " + dv.name() + " Failed: EPC = " + Convert.byteToHex(property.epc));
                        } else {
                            dv.operationMode = OperationMode.from(property.edt[0]);
                        }
                    }

                    @Override
                    protected void onGetMeasuredInstantaneousChargeDischargeElectricEnergy(EchoObject eoj, short tid, byte esv, EchoProperty property, boolean success) {
                        super.onGetMeasuredInstantaneousChargeDischargeElectricEnergy(eoj, tid, esv, property, success); //To change body of generated methods, choose Tools | Templates.
                        if (!success) {
                            System.out.println("onGetProperty " + dv.name() + " Failed: EPC = " + Convert.byteToHex(property.epc));
                        } else {
                            dv.d3 = Convert.byteArrayToInt(property.edt);
                        }
                    }

                });
                // Fire signal
                try {
                    device.get().reqGetOperationStatus().send();
                    device.get().reqGetOperationModeSetting().send();
                    device.get().reqGetMeasuredInstantaneousChargeDischargeElectricEnergy().send();
                } catch (IOException e) {
                    System.out.println("Get Property " + dv.name() + " Failed: " + e.getMessage());
                }
            }

            @Override
            public void onNewBattery(Battery device) {
                super.onNewBattery(device); //To change body of generated methods, choose Tools | Templates.

                MyEchoDevices dv = MyEchoDevices.BATTERY;
                System.out.println("\t   Device = " + device);
                // Set up
                device.setReceiver(new Battery.Receiver() {
                    @Override
                    protected void onGetOperationStatus(EchoObject eoj, short tid, byte esv, EchoProperty property, boolean success) {
                        super.onGetOperationStatus(eoj, tid, esv, property, success); //To change body of generated methods, choose Tools | Templates.
                        if (!success) {
                            System.out.println("onGetProperty " + dv.name() + " Failed: EPC = " + Convert.byteToHex(property.epc));
                        } else {
                            dv.operationStatus = OperationStatus.from(property.edt[0]);
                        }
                    }

                    @Override
                    protected void onGetOperationModeSetting(EchoObject eoj, short tid, byte esv, EchoProperty property, boolean success) {
                        super.onGetOperationModeSetting(eoj, tid, esv, property, success); //To change body of generated methods, choose Tools | Templates.
                        if (!success) {
                            System.out.println("onGetProperty " + dv.name() + " Failed: EPC = " + Convert.byteToHex(property.epc));
                        } else {
                            dv.operationMode = OperationMode.from(property.edt[0]);
                        }
                    }

                    @Override
                    protected void onGetMeasuredInstantaneousChargeDischargeElectricEnergy(EchoObject eoj, short tid, byte esv, EchoProperty property, boolean success) {
                        super.onGetMeasuredInstantaneousChargeDischargeElectricEnergy(eoj, tid, esv, property, success); //To change body of generated methods, choose Tools | Templates.
                        if (!success) {
                            System.out.println("onGetProperty " + dv.name() + " Failed: EPC = " + Convert.byteToHex(property.epc));
                        } else {
                            dv.d3 = Convert.byteArrayToInt(property.edt);
                        }
                    }

                });
                // Fire signal
                try {
                    device.get().reqGetOperationStatus().send();
                    device.get().reqGetOperationModeSetting().send();
                    device.get().reqGetMeasuredInstantaneousChargeDischargeElectricEnergy().send();
                } catch (IOException e) {
                    System.out.println("Get Property " + dv.name() + " Failed: " + e.getMessage());
                }
            }

            @Override
            public void onNewHouseholdSolarPowerGeneration(HouseholdSolarPowerGeneration device) {
                super.onNewHouseholdSolarPowerGeneration(device); //To change body of generated methods, choose Tools | Templates.
                MyEchoDevices dv = MyEchoDevices.SOLAR;
                System.out.println("\t   Device = " + device);
                // Set up
                device.setReceiver(new HouseholdSolarPowerGeneration.Receiver() {
                    @Override
                    protected void onGetOperationStatus(EchoObject eoj, short tid, byte esv, EchoProperty property, boolean success) {
                        super.onGetOperationStatus(eoj, tid, esv, property, success); //To change body of generated methods, choose Tools | Templates.
                        if (!success) {
                            System.out.println("onGetProperty " + dv.name() + " Failed: EPC = " + Convert.byteToHex(property.epc));
                        } else {
                            dv.operationStatus = OperationStatus.from(property.edt[0]);
                        }
                    }

                    @Override
                    protected void onGetMeasuredInstantaneousAmountOfElectricityGenerated(EchoObject eoj, short tid, byte esv, EchoProperty property, boolean success) {
                        super.onGetMeasuredInstantaneousAmountOfElectricityGenerated(eoj, tid, esv, property, success); //To change body of generated methods, choose Tools | Templates.
                        if (!success) {
                            System.out.println("onGetProperty " + dv.name() + " Failed: EPC = " + Convert.byteToHex(property.epc));
                        } else {
                            dv.e0 = Convert.byteArrayToInt(property.edt);
                        }
                    }
                });
                // Fire signal
                try {
                    device.get().reqGetOperationStatus().send();
                    device.get().reqGetMeasuredInstantaneousAmountOfElectricityGenerated().send();
                } catch (IOException e) {
                    System.out.println("Get Property " + dv.name() + " Failed: " + e.getMessage());
                }
            }

            @Override
            public void onNewGeneralLighting(GeneralLighting device) {
                super.onNewGeneralLighting(device); //To change body of generated methods, choose Tools | Templates.
                MyEchoDevices dv = MyEchoDevices.LIGHT;
                System.out.println("\t   Device = " + device);
                // Set up
                device.setReceiver(new GeneralLighting.Receiver() {
                    @Override
                    protected void onGetOperationStatus(EchoObject eoj, short tid, byte esv, EchoProperty property, boolean success) {
                        super.onGetOperationStatus(eoj, tid, esv, property, success); //To change body of generated methods, choose Tools | Templates.
                        if (!success) {
                            System.out.println("onGetProperty " + dv.name() + " Failed: EPC = " + Convert.byteToHex(property.epc));
                        } else {
                            dv.operationStatus = OperationStatus.from(property.edt[0]);
                        }
                    }
                });
                // Fire signal
                try {
                    device.get().reqGetOperationStatus().send();
                } catch (IOException e) {
                    System.out.println("Get Property " + dv.name() + " Failed: " + e.getMessage());
                }
            }
        });
    }
}
