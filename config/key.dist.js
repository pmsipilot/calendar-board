export default {
    "web": {
        "client_id": process.env.CALENDARBOARD_CLIENT_ID || "my-client-id",
        "project_id": process.env.CALENDARBOARD_PROJECT_ID || "my-project",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_secret": process.env.CALENDARBOARD_CLIENT_SECRET || "my-very-secret-client-secret",
        "javascript_origins": process.env.CALENDARBOARD_ORIGIN ? process.env.CALENDARBOARD_ORIGIN.split(',') : ["http://localhost:8080"]
    }
};
