import * as express from "express";
class RouteConfig {

    private _express: any;
    /**
     *
     */
    constructor(exp:any) {
       this._express=exp;

    }
    public httpGet(route: string, func: (request:express.Request,response:express.Response,next:()=>any) => void) {
        this._express.get(route,func);
    }
    public httpPost(route: string, func: (request:express.Request,response:express.Response,next:()=>any) => void) {
        this._express.post(route,func);
    }
    public httpPut(route: string, func: (request:express.Request,response:express.Response,next:()=>any) => void) {
        this._express.put(route,func);
    }
    public httpDelete(route: string, func: (request:express.Request,response:express.Response,next:()=>any) => void) {
        this._express.delete(route,func);
    }
}
export {RouteConfig};