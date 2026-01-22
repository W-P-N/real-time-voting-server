import app from "./app.js";
import appConfig from "./config/env.js";
import http from 'http';
import { once } from "events";

let server;
const sockets = new Set();
let shuttingdown = false;
const FORCE_TIMEOUT_MS = 30_000;

async function startServer() {
    try {
        server = http.createServer(app);
        server.on("connection", (sock) => {
            sockets.add(sock);
            sock.on("close", () => sockets.delete(sock));
        });
        server.on("error", (error) => {
            console.error("HTTP server error: ", error);
        });
        server.listen(appConfig.PORT, () => {
            console.log(`Application listening on port: ${appConfig.PORT}`);
        });
    } catch (error) {
        console.error("Error starting server: ", error);
        process.exit(1);
    };
};

async function gracefulShutdown(signal) {
    if(shuttingdown) {
        return;
    };
    shuttingdown = true;
    console.log(`Received Signal: ${signal}. Shutting down gracefully...`)
    try {
        server.close();
        const closePromise = once(server, "close");
        const timeout = new Promise((res) => setTimeout(res, FORCE_TIMEOUT_MS));
        await Promise.race([closePromise, timeout]);
        for(const s of sockets) {
            try {
                s.destroy();
            } catch(_) {

            }
        };
        console.log("Shutdown complete. Exiting.");
        process.exit(0);
    } catch (error) {
        console.error("Error during shutdown: ", error);
        process.exit(1);
    };
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("uncaughtException", (err) => {
    console.error("uncaughtException: ", err);
    gracefulShutdown("uncaughtException");
});
process.on("unhandledRejection", (reason) => {
    console.error("unhandledRejection", reason);
    gracefulShutdown("unhandledRejection");
});

startServer();


