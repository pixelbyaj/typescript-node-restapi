import * as mongoose from 'mongoose';



interface UserProfileModel extends mongoose.Document {
    companyname: string;
    title: string;
    username: string;
    email: string;
    gears: string[];
    website: string;
    authtoken: string;
    address: string;
    city: string;
    country: string;
    postalcode: string;
    picture: string;
    contactno: string[];
    socialprofiles: { facebook: string, twitter: string, instagram: string }
}

class UserProfileModel {
    private readonly userProfileSchema: mongoose.Schema;
    private COLLECTION = "UserProfile";
    /**
     *
     */
    constructor() {
        this.userProfileSchema = new mongoose.Schema({
            companyname: {
                type: String, required: true
            },
            title: {
                type: String, required: true,
            },
            username: {
                type: String, unique: true, required: true,
            },
            gears: [],
            website: {
                type: String
            },
            email: {
                type: String, unique: true, required: true,
            },
            address: {
                type: String, required: true,
            },
            city: {
                type: String, required: true,
            },
            postalcode: {
                type: String, required: true,
            },
            aboutme: {
                type: String, required: true,
            },
            picture: {
                type: String
            },
            contactno: [],
            socialprofiles: { facebook: String, twitter: String, instagram: String }
        });
    }

    public getUserProfileSchema(): mongoose.Model<mongoose.Document> {
        return mongoose.model("User", this.userProfileSchema, this.COLLECTION);
    }
}

//Userprofile Schema
const userProfileSchema = (new UserProfileModel()).getUserProfileSchema();
export { userProfileSchema as UserProfile };