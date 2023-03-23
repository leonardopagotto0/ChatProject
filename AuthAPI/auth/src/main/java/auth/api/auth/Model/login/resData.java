package auth.api.auth.Model.login;

public class resData {
    private String name;
    private String photo;
    private String access;

    public resData(String name, String photo, String access){
        this.name = name;
        this.photo = photo;
        this.access = access;
    }

    public String getAccess() {
        return access;
    }
    public String getName() {
        return name;
    }
    public String getPhoto() {
        return photo;
    }
}
