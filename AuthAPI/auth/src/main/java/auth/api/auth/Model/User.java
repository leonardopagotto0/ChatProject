package auth.api.auth.Model;

import java.util.ArrayList;
import java.util.List;

// colocar pros personalizadas do password tipo: @passwordManager
public class User {
    private String 
    id, 
    email, 
    password, 
    name, 
    photo;

    // Constructor
    public User(String id, String email, String password, String name, String photo)
    {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.photo = photo;
    }
    public User(){

    }

    public List<String> validateFields(){
        List<String> invalidFields = new ArrayList<String>();  
        
        if(this.email == null) invalidFields.add("Email field can not be null");
        if(this.password == null) invalidFields.add("Password field can not be null");
        if(this.name == null) invalidFields.add("Name field can not be null");
        
        return invalidFields;
    }

    // Setters
    public void setID(String id){
        this.id = id;
    }
    public void setEmail(String email){
        this.email = email;
    }
    public void setPassword(String password){
        this.password = password;
    }
    public void setName(String name){
        this.name = name;
    }
    public void setPhoto(String photo){
        this.photo = photo;
    }

    // Getters
    public String getID(){
        return id;
    }
    public String getEmail(){
        return email;
    }
    public String getPassword(){
        return password;
    }
    public String getName(){
        return name;
    }
    public String getPhoto(){
        return photo;
    }
}