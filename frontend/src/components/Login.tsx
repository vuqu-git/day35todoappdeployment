export default function Login() {

    // this method initiates an OAuth2 authorization flow with GitHub
    function login() {
        // window.location.host: This retrieves the hostname and port of the current browser window (e.g., localhost:5173).
        // window.location.host === 'localhost:5173': This checks if the current hostname and port are localhost:5173, which is typically the development server for a React application running with Vite.
        // 'http://localhost:8080': If the condition is true (i.e., you're running in development), this sets the host variable to http://localhost:8080, assuming your Spring Boot backend is running on port 8080.
        // window.location.origin: If the condition is false (i.e., you're not running in development, likely in a production environment), this sets the host variable to the origin of the current page (e.g., https://your-production-domain.com). This is crucial for production deployments where the frontend and backend might be on the same domain.
        // In summary, this line dynamically determines base URL of your backend server (= the backend URL) based on whether the frontend is running in development or production.
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080': window.location.origin;

        // This line opens a new browser window or tab (or replaces the current one) to initiate the OAuth2 authorization flow.
        //     host + '/oauth2/authorization/github': This constructs the URL for the GitHub OAuth2 authorization endpoint on your backend server. The /oauth2/authorization/github path is typically configured by Spring Security's OAuth2 client support.
        //     window.open(...): This JavaScript function opens a new browser window or tab.
        //     '_self': This argument specifies that the URL should be opened in the same browser window or tab, effectively redirecting the user.
        window.open(host + '/oauth2/authorization/github', '_self');
    }

    return  (
        <div className="login-container">
            <h1>Please login to the Todo app</h1>
            <button onClick={login}>Login with GitHub</button>
        </div>
    )
}