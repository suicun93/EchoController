/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Common;

/**
 *
 * @author hoang-trung-duc
 */
public enum Key {
    Name("name"),
    EOJ("eoj"),
    MacAddress("macAdd"),
    OperationStatus("status"),
    OperationMode("mode"),
    ChargeDischargeElectricEnergy("d3"),
    AmountOfElectricityGenerated("e0");

    private final String value;

    private Key(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return value;
    }

}
