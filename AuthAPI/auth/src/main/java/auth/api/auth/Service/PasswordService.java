package auth.api.auth.Service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PasswordService {

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public boolean validate(String password, String rawPassword){
        return encoder.matches(password, rawPassword);
    }

    public String Hash(String password){
        CharSequence encoded = encoder.encode(password);
        return encoded.toString();
    }
}
