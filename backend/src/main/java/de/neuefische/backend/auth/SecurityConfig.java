package de.neuefische.backend.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

// marks the SecurityConfig class as a configuration class. Spring's dependency injection container will process this class and create beans defined within it
@Configuration
// provides default security configurations and enables the use of Spring Security's annotations and components
@EnableWebSecurity
public class SecurityConfig {

    // injects the value of the APP.URL property from the application's configuration applications.properties
    @Value("${app.url}")
    private String appUrl;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // CSRF is a security vulnerability that allows malicious websites to perform unwanted actions on behalf of an authenticated user.
                // Disabling it is generally not recommended for production applications unless you have other protections in place, especially for forms.
                // is a lambda expression that simplifies disabling the feature
                .csrf(AbstractHttpConfigurer::disable)
                // This configures authorization rules for incoming HTTP requests.
                .authorizeHttpRequests(a -> a
//                        // This rule requires that requests to the /api/auth/me endpoint be authenticated (i.e., the user must be logged in)
//                                        // This path here is used in AuthController to fetch the GitHub username
//                        .requestMatchers("/api/auth/me").authenticated()
//                        // This rule allows all other requests without authentication.
//                        .anyRequest().permitAll()

                        .requestMatchers("/api/auth/me").permitAll()
                        .anyRequest().authenticated()
                )
                // ensures that a session is always created if one doesn't exist. This setting might need to be changed based on the application's needs, like using STATELESS for REST APIs.
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
                .logout( l -> l.logoutSuccessUrl(appUrl + "/login") )
                                                            // sets the default URL to redirect to after a successful OAuth2 login
//                .oauth2Login(o -> o.defaultSuccessUrl(appUrl + "/todos"))
                .oauth2Login(o -> o.defaultSuccessUrl(appUrl))
                // This configures how authentication exceptions are handled.
                .exceptionHandling(e -> e
                // sets the authentication entry point to return an HTTP 401 Unauthorized status code when an unauthenticated user tries to access a protected resource.
                .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)));
        return http.build();
    }

}