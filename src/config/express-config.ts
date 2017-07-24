import * as express from "express";
import expressValidator = require("express-validator");
import * as session from "express-session";
import { PassportConfig } from "./passport-config";

class ExpressConfig extends PassportConfig {
    private readonly app: any;
    /**
     *
     */
    constructor(port: number) {
        super();
        this.app = express();
        this.app.set("port", port || 3000);

    }

    /**
     * name
     */
    public add(option: any) {
        this.app.use(option);
    }
    /**
     * addRange
     */
    public addRange(options: any[]) {
        let self = this;
        options.forEach(function (option) {
            self.app.use(option);
        });
    }


    public addRequestResponseHandler(func: (request: express.Request, response: express.Response, next: () => any) => any) {
        this.app.use(func);
    }

    public listen(func: () => void): boolean {
        if (this.app) {
            this.app.listen(this.app.get("port"), func);
            return true;
        }
        return false;
    }

    public getSession() {
        if (session) {
            return session;
        }
    }

    public getExpress() {
        if (this.app) {
            return this.app;
        }
    }
}
export { ExpressConfig }; 
