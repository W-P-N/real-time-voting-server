import app from "./app.js";
import appConfig from "./config/env.js";

function startServer() {
    try {
        app.listen(appConfig.PORT, () => {
            console.log(`Application listening on port: ${appConfig.PORT}`);
        });
    } catch (error) {
        console.error('Error starting server: ', error);
    };
};

function closeServer() {
    try {
        
    } catch (error) {
        
    };
};

startServer();


