import * as mongoose from "mongoose";
import * as mongo from "connect-mongo"; // (session)
class MongoConfig {
    //#region Private Member
    private readonly mongoStore: mongo.MongoStoreFactory;
    //#endregion

    //#region Constructor
    constructor(uri: string, onerror: () => void, session: (options?: any) => any) {
        this.mongoStore = mongo(session);
        mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
        mongoose.connection.on("error", onerror);
        this.mongoStore = mongo(session);
    }
    //#endregion

    public getMongoStore(config: any) {
        return (new this.mongoStore(config));
    }
}
export { MongoConfig };