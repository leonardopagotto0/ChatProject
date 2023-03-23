package auth.api.auth.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import auth.api.auth.Model.*;
import auth.api.auth.Model.login.BodyForm;
import auth.api.auth.Model.login.resData;
import auth.api.auth.Service.LoginService;
import auth.api.auth.Service.PasswordService;
import auth.api.auth.Service.TokenService;
import jakarta.servlet.http.HttpServletRequest;

@RestController
public class LoginController {

    private Response res = new Response();

    @Autowired
    private LoginService loginService;
    @Autowired
    private PasswordService passwordService;
    @Autowired
    private TokenService tokenService;

    @PostMapping("auth/login")
    public ResponseEntity getUser(HttpServletRequest req, @RequestBody BodyForm data){
        res.path(req.getRequestURI());

        List<String> invalidFields = data.validateFields();

        if(invalidFields.size() > 0) 
        return res.status(400).response("INVALID_FIELDS").data(invalidFields);

        User user = loginService.getUser(data.getIdentifier());

        if(user.getID() == null) 
        return res.status(400).response("INVALID_CREDENTIALS").sent();
        
        boolean isValid = passwordService.validate(data.getPassword(), user.getPassword());

        if(isValid == false)
        return res.status(400).response("INVALID_CREDENTIALS").sent(); 

        String token = tokenService.create(user);
        
        resData result = new resData(user.getName(), user.getPhoto(), token);

        return res.status(200).data(result);
    }

}