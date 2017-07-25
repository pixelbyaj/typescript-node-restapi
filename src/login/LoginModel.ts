import * as bcrypt from "bcrypt-nodejs";
import * as crypto from "crypto";
import * as mongoose from "mongoose";

interface UserModel extends mongoose.Document {
  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: Date;
  facebook: string;
  tokens: AuthToken[];
  comparePassword: (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;
}

interface AuthToken {
  accessToken: string;
  kind: string
}

class LoginSchema {
  private readonly loginSchema: mongoose.Schema;
  private readonly COLLECTION = "Users";
  /**
   *
   */
  constructor() {
    this.loginSchema = new mongoose.Schema({
      email: { type: String, unique: true },
      password: String,
      passwordResetToken: String,
      passwordResetExpires: Date,
      facebook: String,
      twitter: String,
      google: String,
      tokens: Array,
    }, { timestamps: true });
    this.setPasswordHash();
    this.setComparePassword();
  }

  /**
  * Password hash middleware.
  */
  private setPasswordHash() {
    this.loginSchema.pre("save", function save(next) {
      let user = this;
      if (!user.isModified("password")) { return next(); }
      bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
          if (err) { return next(err); }
          user.password = hash;
          next();
        });
      });
    });
  }


  private setComparePassword() {
    this.loginSchema.methods.comparePassword =
      function (candidatePassword: string, cb: (err: any, isMatch: any) => {}) {
        bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
          cb(err, isMatch);
        });
      }
  }
  public getUserSchema(): mongoose.Model<mongoose.Document> {
    return mongoose.model("User", this.loginSchema,this.COLLECTION);
  }
}
const userSchema = (new LoginSchema()).getUserSchema();

export { userSchema as User, UserModel, AuthToken };