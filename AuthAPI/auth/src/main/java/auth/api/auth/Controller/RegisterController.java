package auth.api.auth.Controller;

import java.util.HashMap;
import java.util.List;

import org.jose4j.json.internal.json_simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mysql.cj.xdevapi.JsonString;

import auth.api.auth.Model.Response;
import auth.api.auth.Model.User;
import auth.api.auth.Model.login.resData;
import auth.api.auth.Model.register.BodyForm;
import auth.api.auth.Model.register.KeyRes;
import auth.api.auth.Service.RegisterService;
import auth.api.auth.Service.TokenService;
import auth.api.auth.Utils.ErrorState;
import auth.api.auth.Utils.ResException;
import jakarta.servlet.http.HttpServletRequest;

@RestController
public class RegisterController {
        
    @Autowired
    private TokenService tokenService;
    @Autowired
    private RegisterService registerService;

    private Response res = new Response();

    @GetMapping("auth/pubkey")
    public ResponseEntity getPubKey(){
        // HashMap<String, String> data = new HashMap<String, String>();
        // data.put("key", tokenService.getPublicKey());
        // return new ResponseEntity<HashMap<String, String>>(data, null, 200);
        // KeyRes result = new KeyRes(tokenService.getPublicKey());
        // return new ResponseEntity<KeyRes>(result, null, 200);
        String k = tokenService.getPublicKey();
        return new ResponseEntity<String>("{\"keys\":["+k+"]}", null, 200);
    }

    @PostMapping("auth/register")
    public ResponseEntity register(HttpServletRequest req,@RequestBody BodyForm registerData){
        res.path(req.getRequestURI());

        List<String> invalidFields = registerData.validateFields();
        if(invalidFields.size() > 0) return res.status(400).response("EMPTY_FIELDS").data(invalidFields);

        try {
            User user = registerService.save(registerData);
            String token = tokenService.create(user);

            resData result = new resData(user.getName(), user.getPhoto(), token);
    
            return res.status(201).response("SUCCESS").data(result);
        } catch (ResException e) {
            if(e.getState() == ErrorState.IN_HOLD) return res.status(500).response("ERROR_TO_REGISTER").sent();
            return res.status(400).response(e.getResponse()).message(e.getMessage()).sent();
        }
    }
}