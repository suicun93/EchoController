/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Servlet;

import Common.Config;
import Common.MyEchoDevices;
import static Common.MyEchoDevices.UNKNOWN;
import static Main.EchoController.listDevice;
import static Main.EchoController.startController;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author hoang-trung-duc
 */
public class GetItemAvailable extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response) {
        response.setContentType("text/plain;charset=UTF-8");
        PrintWriter out = null;
        try {

            // get Param
            out = response.getWriter();
            startController();

            // Load config
            Config.updateDeviceNickname();

            StringBuilder responseString = new StringBuilder("success" + "\n");
            listDevice.forEach((deviceObject) -> {
                MyEchoDevices device = MyEchoDevices.from(deviceObject);
                if (device != UNKNOWN) {
                    responseString.append(device).append("\n");
                } else {
                    responseString.append(UNKNOWN.name).append(",");
                    responseString.append(UNKNOWN.nickname).append(",");
                    responseString.append(String.format("0x%04x", deviceObject.getEchoClassCode())).append(",");
                    responseString.append(deviceObject.getNode().getAddressStr()).append("\n");
                }
            });
            responseString.deleteCharAt(responseString.length() - 1);
            out.print(responseString.toString());

        } catch (IOException ex) {
            System.out.println(GetItemAvailable.class.getName() + " " + ex.getMessage());
            if (out != null) {
                out.print(GetItemAvailable.class.getName() + " " + ex.getMessage());
            }
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
