/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Common;

import com.sonycsl.echo.eoj.device.DeviceObject;

/**
 *
 * @author hoang-trung-duc
 */
public enum MyEchoDevices {
    EV((short) 0x027E, "ev") {
        @Override
        public String toString() {
            return "\"" + type + "\":{ \n"
                    + "         \"name\":\"" + name + "\",\n"
                    + "         \"eoj\":\"" + String.format("0x%04x", classcode) + "\",\n"
                    + "         \"macAdd\":\"" + address + "\",\n"
                    + "         \"status\" : \"" + operationStatus.name() + "\",\n"
                    + "         \"mode\" : \"" + operationMode.name() + "\",\n"
                    + "         \"d3\" : \"" + d3 + "\"\n"
                    + "             }\n";
        }
    },
    BATTERY((short) 0x027D, "battery") {
        @Override
        public String toString() {
            return "\"" + type + "\":{ \n"
                    + "         \"name\":\"" + name + "\",\n"
                    + "         \"eoj\":\"" + String.format("0x%04x", classcode) + "\",\n"
                    + "         \"macAdd\":\"" + address + "\",\n"
                    + "         \"status\" : \"" + operationStatus.name() + "\",\n"
                    + "         \"mode\" : \"" + operationMode.name() + "\",\n"
                    + "         \"d3\" : \"" + d3 + "\"\n"
                    + "      }\n";
        }
    },
    SOLAR((short) 0x0279, "solar") {
        @Override
        public String toString() {
            return "\"" + type + "\":{ \n"
                    + "         \"name\":\"" + name + "\",\n"
                    + "         \"eoj\":\"" + String.format("0x%04x", classcode) + "\",\n"
                    + "         \"macAdd\":\"" + address + "\",\n"
                    + "         \"status\" : \"" + operationStatus.name() + "\",\n"
                    + "         \"e0\" : \"" + e0 + "\"\n"
                    + "      }\n";
        }
    },
    LIGHT((short) 0x0290, "light") {
        @Override
        public String toString() {
            return "\"" + type + "\":{ \n"
                    + "         \"name\":\"" + name + "\",\n"
                    + "         \"eoj\":\"" + String.format("0x%04x", classcode) + "\",\n"
                    + "         \"macAdd\":\"" + address + "\",\n"
                    + "         \"status\" : \"" + operationStatus.name() + "\"\n"
                    + "      }\n";
        }
    },
    UNKNOWN((short) 0x0000, "unkown") {
    };

    public static MyEchoDevices from(DeviceObject device) {
        for (MyEchoDevices e : values()) {
            if (e.classcode == device.getEchoClassCode()) {
                e.address = device.getNode().getAddressStr();
                return e;
            }
        }
        return UNKNOWN;
    }
    // <editor-fold defaultstate="collapsed" desc="// Skip this">
    public final short classcode;
    public final String type;
    public String name;
    public String address;
    public OperationStatus operationStatus = OperationStatus.OFF;
    public OperationMode operationMode = OperationMode.Other;
    public int d3;
    public int e0;

    private MyEchoDevices(short classcode, String type) {
        this.classcode = classcode;
        this.type = type;
        this.name = type;
    }

    // </editor-fold>
}
