package auth.api.auth.Model.register;

import java.util.ArrayList;
import java.util.List;

public class KeyRes {
    private List<String> keys = new ArrayList<String>();

    public KeyRes(String key){
        this.keys.add(key);
    }

    public List<String> getKeys() {
        return keys;
    }
    public void setKey(String key) {
        this.keys.add(key);
    }
}
