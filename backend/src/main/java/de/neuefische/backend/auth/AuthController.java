package de.neuefische.backend.auth;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// defines a Spring MVC REST controller, AuthController, which handles requests related to authentication, specifically retrieving the currently authenticated user's information

// This annotation marks the AuthController class as a REST controller. It's a combination of @Controller and @ResponseBody.
//    @Controller indicates that this class is a Spring MVC controller that handles web requests.
//    @ResponseBody indicates that the return values of the methods in this class should be directly written to the HTTP response body, typically as JSON or XML.
@RestController
// maps all request URLs starting with /api/auth to this controller. This means that all methods within this controller will handle requests that begin with this path
@RequestMapping("/api/auth")
public class AuthController {

    @GetMapping("/me")
                        // @AuthenticationPrincipal OAuth2User user: This annotation injects the currently authenticated user's OAuth2User object into the user parameter.
                        // OAuth2User represents the user's information obtained from an OAuth2 provider (e.g., Google, GitHub).
    public String getMe(@AuthenticationPrincipal OAuth2User user) {
        // his line retrieves the user's attributes (a map of key-value pairs) and extracts the value associated with the "login" key.
        // Then it converts the value to a String. In many OAuth2 providers, "login" refers to the user's username or login identifier
        return user.getAttributes().get("login").toString();
    }
}