import { Request, Response, NextFunction } from "express";

interface LoggerMiddlewareOptions {
    logLevel: "info" | "warn" | "error";
}

export class Logger {
    private logLevel: LoggerMiddlewareOptions["logLevel"];
    constructor(options: LoggerMiddlewareOptions) {
        this.logLevel = options.logLevel
    }

    public LoggerMiddleware() {
        return async (request: Request, response: Response, next: NextFunction) => {
            const start = process.hrtime();

            response.on("finish", () => {
                const diff = process.hrtime(start);
                const timeInMs = diff[0] * 1e3 + diff[1] * 1e-6; // conversão para milissegundos

                this.LoggedMessage(request, response, timeInMs);
            })

            next();
        }
    }

    private LoggedMessage(request: Request, response: Response, timeInMs: number) {
        const message = `${request.method} ${request.url} - ${response.statusCode} - ${timeInMs.toFixed(2)}ms`;

        switch (this.logLevel) {
        case "info":
            console.log(`[INFO] ${message}`);
            break;
        case "warn":
            console.warn(`[WARN] ${message}`);
            break;
        case "error":
            if (response.statusCode >= 400) {
            console.error(`[ERROR] ${message}`);
            }
            break;
        }
    }
}