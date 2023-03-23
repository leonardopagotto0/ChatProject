package auth.api.auth.Model.register;

import java.util.ArrayList;
import java.util.List;

public class BodyForm {
    private String email;
    private String password;
    private String name;

    public BodyForm(String email, String password, String name){
        this.email = email;
        this.password = password;
        this.name = name;
    }

    public BodyForm(){}

    public List<String> validateFields(){
        List<String> invalidFields = new ArrayList<String>();  
        
        if(this.email == null) invalidFields.add("'email' field required");
        if(this.password == null) invalidFields.add("'password' field required");
        if(this.name == null) invalidFields.add("'name' field required");

        return invalidFields;
    }

    // Getters
    public String getEmail(){
        return this.email;
    }
    public String getPassword(){
        return this.password;
    }
    public String getName(){
        return this.name;
    }
}
