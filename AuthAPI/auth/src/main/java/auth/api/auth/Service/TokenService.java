package auth.api.auth.Service;

import java.security.PublicKey;
import java.security.interfaces.RSAKey;
import java.security.interfaces.RSAPublicKey;
import java.util.UUID;

import org.jose4j.jwk.JsonWebKey;
import org.jose4j.jwk.JsonWebKey.Factory;
import org.jose4j.jwk.RsaJsonWebKey;
import org.jose4j.jws.AlgorithmIdentifiers;
import org.jose4j.jws.JsonWebSignature;
import org.jose4j.jwt.JwtClaims;
import org.jose4j.jwk.RsaJwkGenerator;
import org.jose4j.lang.JoseException;
import org.springframework.stereotype.Service;

import auth.api.auth.Model.User;

@Service
public class TokenService {

    private RsaJsonWebKey jwk = null;

    public RsaJsonWebKey keyManager(){
        try {
            RsaJsonWebKey jwk = RsaJwkGenerator.generateJwk(2048);
            jwk.setKeyId("auth");
            jwk.setUse("sig");

            return jwk;
        } catch (JoseException e) {
            return null;
        }
    }
    
    public boolean validate(){
        return true;
    }

    public String create(User user){
        JwtClaims jwtClaims = new JwtClaims();
            jwtClaims.setClaim("id", user.getID());
            jwtClaims.setClaim("email", user.getEmail());
            jwtClaims.setClaim("name", user.getName());
            jwtClaims.setExpirationTimeMinutesInTheFuture(60);
            jwtClaims.setIssuedAtToNow();
        ;

        JsonWebSignature jws = new JsonWebSignature();

        try {
            if(this.jwk == null) this.jwk = keyManager();

            jws.setKey(this.jwk.getPrivateKey());
            jws.setKeyIdHeaderValue(this.jwk.getKeyId());
            jws.setPayload(jwtClaims.toJson());
            jws.setAlgorithmHeaderValue(AlgorithmIdentifiers.RSA_USING_SHA256);
        
            return jws.getCompactSerialization();
        } catch (Exception e) {
            return null;
        }
    }
    
    public String getPublicKey(){
        if(this.jwk == null) return null;

        return jwk.toJson();
    }

    public String buildID(){
        return UUID.randomUUID().toString();
    }

}
