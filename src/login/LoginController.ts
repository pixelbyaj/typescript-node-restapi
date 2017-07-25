import * as async from "async";
import * as crypto from "crypto";
import * as passport from "passport";
import { Request, Response, NextFunction } from "express";
import { LocalStrategyInfo } from "passport-local";
import { WriteError } from "mongodb";
import * as _ from "lodash";
import { User,UserModel,AuthToken } from "../login/LoginModel";
const request = require("express-validator");



class LoginControl {

    /**
 * POST /signup
 * Create a new local account.
 */
    public postSignup(req: Request, res: Response, next: NextFunction) {
        req.assert("email", "Email is not valid").isEmail();
        req.assert("password", "Password must be at least 4 characters long").len(4);
        req.assert("confirmPassword", "Passwords do not match").equals(req.body.password);
        req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });

        const errors = req.validationErrors();

        if (errors) {
            console.log(errors);
            req.flash("errors", errors);
            return res.redirect("/signup");
        }

        const user = new User({
            email: req.body.email,
            password: req.body.password
        });

        User.findOne({ email: req.body.email }, (err, existingUser) => {
            if (err) { return next(err); }
            if (existingUser) {
                req.flash("errors", { msg: "Account with that email address already exists." });
                return res.send({ "status": "error", msg: "Account with that email address already exists." })
            }
            user.save((err) => {
                if (err) { return next(err); }
                req.logIn(user, (err) => {
                    if (err) {
                        return next(err);
                    }
                    req.flash("success", { msg: "Success! You are logged in." });
                });
            });
        });
    };

    /**
 * POST /login
 * Create a new local account.
 */
    public postLogin(req: Request, res: Response, next: NextFunction) {
        req.assert("email", "Email is not valid").isEmail();
        req.assert("password", "Password cannot be blank").notEmpty();
        req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });

        const errors = req.validationErrors();

        if (errors) {
            req.flash("errors", errors);
            return res.redirect("/login");
        }

        passport.authenticate("local", (err: Error, user: UserModel, info: LocalStrategyInfo) => {
            if (err) { return next(err); }
            if (!user) {
                req.flash("errors", info.message);
                return res.redirect("/login");
            }
            req.logIn(user, (err) => {
                if (err) { return next(err); }
                req.flash("success", { msg: "Success! You are logged in." });
                res.send({"returnUrl":"/login"});
            });
        })(req, res, next);
    };

    /**
 * Login Required middleware.
 */
    public isAuthenticated(req: Request, res: Response, next: NextFunction) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.send({ "returnUrl": "/login" });
    };

    /**
     * Authorization Required middleware.
     */
    public isAuthorized(req: Request, res: Response, next: NextFunction) {
        const provider = req.path.split("/").slice(-1)[0];
        if (_.find(req.user.tokens, { kind: provider })) {
            next();
        } else {
            res.send({ "returnUrl": `/auth/${provider}` });
        }
    };
}
const loginControl = new LoginControl();
export { loginControl as login };