declare module "stellar-project" {
    export interface LoggerMiddlewareOptions {
      logLevel: 'info' | 'warn' | 'error';
    }
  
    export function createLoggerMiddleware(options: LoggerMiddlewareOptions): (req: Request, res: Response, next: NextFunction) => void;
  }
  