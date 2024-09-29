import { 
    Request as ExpressRequest, 
    Response as ExpressResponse, 
    NextFunction as ExpressNextFunction 
} from "express";

type LoggerMiddlewareOptions = {
    logLevel: 'info' | 'warn' | 'error';
}

class stellarProject {
    private logLevel: 'info' | 'warn' | 'error';
    constructor(options: LoggerMiddlewareOptions) {
        this.logLevel = options.logLevel
    }

    public getMiddleware() {
        return (request: ExpressRequest, response: ExpressResponse, next: ExpressNextFunction) => {
            const start = process.hrtime();

            response.on('finish', () => {
              const diff = process.hrtime(start);
              const timeInMs = diff[0] * 1e3 + diff[1] * 1e-6;
      
              this.logMessage(request, response, timeInMs);
            });
          next();
        };
      }
    
    private logMessage(request: ExpressRequest, response: ExpressResponse, timeInMs: number) {
        const message = `${request.method} ${request.url} - ${response.statusCode} - ${timeInMs.toFixed(2)}ms`;
    
        switch (this.logLevel) {
          case 'info':
            console.log(`[INFO] ${message}`);
            break;
          case 'warn':
            console.warn(`[WARN] ${message}`);
            break;
          case 'error':
            if (response.statusCode >= 400) {
              console.error(`[ERROR] ${message}`);
            }
            break;
        }
    }
}

export default stellarProject;