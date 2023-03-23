package auth.api.auth.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import auth.api.auth.Config.ConnectionDB;
import auth.api.auth.Model.User;

@Service
public class LoginService {

    private Logger logger = LoggerFactory.getLogger(LoginService.class);

    @Autowired
    private ConnectionDB _conn;

    public User getUser(String identifier){
        
        String sql = "SELECT * FROM users WHERE email=? OR name=? LIMIT 1";
        User user = new User();
        Connection conn = _conn.execute();

        try {
            PreparedStatement stmt = conn.prepareStatement(sql);

            stmt.setString(1, identifier);
            stmt.setString(2, identifier);

            ResultSet result = stmt.executeQuery();

            while(result.next()){
                if(result.getString("id") == null){
                    user = null;
                    break;
                }
                user.setID(result.getString("id")); 
                user.setEmail(result.getString("email"));  
                user.setPassword(result.getString("password")); 
                user.setName(result.getString("name")); 
                user.setPhoto(result.getString("photo"));
            };

            result.close();
            stmt.close();
            conn.close();

            return user;
        } catch (SQLException e) {
            logger.error("SQLException ERROR: ", e);
            return null;
            // TODO: handle exception
        }
    }
}