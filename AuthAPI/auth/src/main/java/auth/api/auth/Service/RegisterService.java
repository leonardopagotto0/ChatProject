package auth.api.auth.Service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mysql.cj.xdevapi.PreparableStatement;

import auth.api.auth.Config.ConnectionDB;
import auth.api.auth.Model.User;
import auth.api.auth.Model.register.BodyForm;
import auth.api.auth.Service.PasswordService;
import auth.api.auth.Service.TokenService;
import auth.api.auth.Utils.ErrorState;
import auth.api.auth.Utils.ResException;

@Service
public class RegisterService {
    
    private Logger logger = LoggerFactory.getLogger(RegisterService.class);
    
    @Autowired
    private ConnectionDB _conn;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private PasswordService passwordService;

    public User save(BodyForm registerData) throws ResException {

        Connection conn = _conn.execute();
        String sql = "INSERT INTO users (id, email, password, name) VALUES (?, ?, ? ,?)";
        String passwordEncoded = passwordService.Hash(registerData.getPassword());

        User user = new User(
            tokenService.buildID(), 
            registerData.getEmail(), 
            passwordEncoded, 
            registerData.getName(), 
            null
        );

        try {
            PreparedStatement stmt = conn.prepareStatement(sql);
            
            stmt.setString(1, user.getID());
            stmt.setString(2, user.getEmail());
            stmt.setString(3, user.getPassword());
            stmt.setString(4, user.getName());

            int result = stmt.executeUpdate();

            if(result == 0) throw new ResException();

            return user;
        } catch (SQLException e) {
            if(e.getErrorCode() == 1062){
                String message = e.getMessage();
                String pieceFied = message.split("'")[3];
                String field = pieceFied.split("_")[0];
                throw new ResException("FIELD_ALREADY_EXISTING", ErrorState.HANDDLED, field);
            }
            logger.error("SQL ERROR: ", e);
            throw new ResException("ERROR", ErrorState.IN_HOLD);
        }
    }
}
