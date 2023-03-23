package auth.api.auth.Model.login;

import java.util.ArrayList;
import java.util.List;

public class BodyForm {
    private String identifier;
    private String password;

    public BodyForm(String id, String password){
        this.identifier = id;
        this.password = password;
    }

    public List<String> validateFields()
    {
        List<String> invalidFields = new ArrayList<String>();  
        
        if(this.identifier == null) invalidFields.add("'identifier' field required");
        if(this.password == null) invalidFields.add("'password' field required");
        
        return invalidFields;
    }

    public String getIdentifier(){
        return this.identifier;
    } 
    public String getPassword(){
        return this.password;
    } 
}