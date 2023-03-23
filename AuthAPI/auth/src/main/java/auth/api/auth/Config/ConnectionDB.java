package auth.api.auth.Config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import javax.swing.JOptionPane;

import org.springframework.stereotype.Component;

@Component
public class ConnectionDB {

    private String url = "jdbc:mysql://localhost:3306/chatdb?user=root&password=teste123";

    public Connection execute(){
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            JOptionPane.showMessageDialog(null, e.getMessage(), "Database drive was not found!", 0);
        }
        try {
            Connection conn = DriverManager.getConnection(this.url);
            return conn;
        } catch (SQLException e) {
            JOptionPane.showMessageDialog(null, e.getMessage(), "Data base connection Error!", 0);
            return null;
        }
    }

}
