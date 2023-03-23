package auth.api.auth.Model;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

@SuppressWarnings("unchecked") 
public class Response {
    public int httpStatusCode;
    public String response;
    public String message;
    public String path;
    public Object data;

    public Response status(int code){
        if(code == 200) this.response = "SUCCESS";
        this.httpStatusCode = code;
        return this;
    }
    public Response response(String res){
        this.response = res;
        return this;
    }
    public Response message(String message){
        this.message = message;
        return this;
    }
    public Response path(String path){
        this.path = path;
        return this;
    }
    public ResponseEntity data(Object data){
        this.data = data;
        return new ResponseEntity<>(this, HttpStatusCode.valueOf(this.httpStatusCode));
    }
    public ResponseEntity sent(){
        this.data = null;
        return new ResponseEntity<>(this, HttpStatusCode.valueOf(this.httpStatusCode));
    }
}
