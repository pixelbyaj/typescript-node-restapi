/**
 * Module dependencies.
 */
import * as exp from "express";
import { ExpressConfig } from "./config/express-config";
import { MongoConfig } from "./config/mongo-config";
import { RouteConfig } from "./config/route-config";

import * as compression from "compression";  // compresses requests
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as errorHandler from "errorhandler";
import * as lusca from "lusca";
import * as dotenv from "dotenv";
import * as flash from "express-flash";
import * as path from "path";
import expressValidator = require("express-validator");
import * as passport from "passport";
import * as passportConfig from "./config/passport-config";


class Server extends RouteConfig {


  private mongoDB: MongoConfig;
  private readonly expressConfig: ExpressConfig;
  private readonly session:any;
  private readonly route: RouteConfig;
    
  //#region Constructor
  constructor(expressConfig: ExpressConfig) {
    super(expressConfig.getExpress());
    this.loadEnvironmentConfig();
    this.expressConfig = expressConfig;
    this.session = this.expressConfig.getSession()

    let connectUri = process.env.MONGODB_URI || process.env.MONGOLAB_URI;
    this.mongoDB = new MongoConfig(connectUri, () => {
    }, this.session);
    
    this.setExpressConfig();
  }
  //#endregion

  //#region Private Methods
  /**
     * Load environment variables from .env file, where API keys and passwords are configured.
  **/
  private loadEnvironmentConfig() {
    dotenv.config({ path: ".env.example" });
  }

  private setExpressConfig() {
    this.expressConfig.add(compression());
    this.expressConfig.add(logger("dev"));
    this.expressConfig.add(bodyParser.json());
    this.expressConfig.add(bodyParser.urlencoded({ extended: true }));
    this.expressConfig.add(expressValidator());
    this.expressConfig.add(this.session({
      resave: true,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET,
      store: this.mongoDB.getMongoStore({
        url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
        autoReconnect: true
      })
    }));
    this.expressConfig.add(passport.initialize());
    this.expressConfig.add(passport.session());
    this.expressConfig.add(flash());
    this.expressConfig.add(lusca.xframe("SAMEORIGIN"));
    this.expressConfig.add(lusca.xssProtection(true));
    this.expressConfig.addRequestResponseHandler((req, res, next) => {
      res.locals.user = req.user;
      next();
    });
    this.expressConfig.add(errorHandler());
  }
  //#endregion

  //#region Public Method
  public start() {
    if (this.expressConfig) {
      this.expressConfig.listen(() => {
        console.log(("  App is running at http://localhost:%s in %s mode"), process.env.EXPRESS_PORT, process.env.BUILD_ENV);
        console.log("  Press CTRL-C to stop\n");
      });
    }
  }
  
 //#endregion  

}


/**
 * Controllers (route handlers).
 */
import {login} from "./login/LoginController";


var server = new Server((new ExpressConfig(process.env.EXPRESS_PORT)));
server.httpPost("/api/signup", login.postSignup);
server.httpPost("/api/login", login.postLogin);
server.start();
/**
 * Error Handler. Provides full stack - remove for production
 */