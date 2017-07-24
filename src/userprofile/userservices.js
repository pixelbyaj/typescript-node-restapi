UserProfile = require('./models/usermodel');

//Get userProfile
module.exports.getUserProfiles = (callback, limit) => {
    userProfile.find(callback).limit(limit);
}
module.exports.addUserProfiles = (profile,callback) => {
    userProfile.Create(profile);
}