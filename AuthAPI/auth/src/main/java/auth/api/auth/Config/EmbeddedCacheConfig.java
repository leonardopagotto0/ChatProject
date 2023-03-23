// package auth.api.auth.Config;

// import java.util.ArrayList;
// import java.util.List;

// import org.springframework.cache.CacheManager;
// import org.springframework.cache.annotation.EnableCaching;
// import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.stereotype.Component;

// @Configuration
// @EnableCaching
// @Component
// public class EmbeddedCacheConfig  {
//     @Bean
//     public CacheManager cacheManager() {
//         ConcurrentMapCacheManager mgr = new ConcurrentMapCacheManager();

//         List<String> cacheNames = new ArrayList<String>();
//         cacheNames.add("RSAkeys");
//         cacheNames.add("Teste");
//         mgr.setCacheNames(cacheNames);
//         return mgr;
//     }
// }