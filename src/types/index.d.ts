import { Request as ExpressRequest, Response as ExpressResponse, NextFunction as ExpressNextFunction } from "express";
export type LoggerMiddlewareOptions = {
    logLevel: 'info' | 'warn' | 'error';
};

export default class StellarProject {
    constructor(options: LoggerMiddlewareOptions);

    public getMiddleware(): (req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) => void;
}
