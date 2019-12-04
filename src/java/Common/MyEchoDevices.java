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
    EV((short) 0x027E, "ev"),
    BATTERY((short) 0x027D, "battery"),
    SOLAR((short) 0x0279, "solar"),
    LIGHT((short) 0x0290, "light"),
    UNKNOWN((short) 0x0000, "unkown");

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
    public final String name;
    public String nickname;
    public String address;

    private MyEchoDevices(short classcode, String name) {
        this.classcode = classcode;
        this.name = name;
        this.nickname = name;
    }

    @Override
    public String toString() {
        return "\"" + name + "\":{ \n"
                + "         \"name\":\"" + nickname + "\",\n"
                + "         \"eoj\":\"" + String.format("0x%04x", classcode) + "\",\n"
                + "         \"macAdd\":\"" + address + "\"\n"
                + "      }";
    }

    // </editor-fold>
}
