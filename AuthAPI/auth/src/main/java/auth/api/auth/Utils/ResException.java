package auth.api.auth.Utils;

public class ResException extends Exception {
    private String response = null;
    private String message = null;
    private ErrorState state = ErrorState.IN_HOLD;
    
    public ResException(String response, ErrorState state){
        this.response = response;
        this.state = state;
    }
    public ResException(String response, ErrorState state, String message){
        this.response = response;
        this.state = state;
        this.message = message;
    }
    public ResException(){}

    public ErrorState getState() {
        return state;
    }
    public String getMessage() {
        return message;
    }
    public String getResponse() {
        return response;
    }
}
