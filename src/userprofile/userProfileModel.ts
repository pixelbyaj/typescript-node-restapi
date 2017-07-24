import * as mongoose from 'mongoose';

const COLLECTION = "userprofile";

export type UserProfileModel = mongoose.Document & {
    companyname:string,
    title:string,
    username:string,
    email:string,
    gears:string[],
    website:string,
    authtoken:string,
    address:string,
    city:string,
    country:string,
    postalcode:string,
    picture:string,
    contactno:string[],
    socialprofiles: { facebook: string, twitter: string, instagram: string }
}

//Userprofile Schema
const userProfileSchema = new mongoose.Schema({
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

// export const User: UserType = mongoose.model<UserType>('User', userSchema);
const userProfile = module.exports = mongoose.model("userprofile", userProfileSchema, COLLECTION);
export default userProfile;