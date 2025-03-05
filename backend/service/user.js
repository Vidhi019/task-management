const User = require('../model/user');

exports.getAllUserService = async () => {
   
        return await User.find();

}

exports.getUserService = async (userId) => {

    return await User.findById(userId);

}

exports.getUserServiceByEmail = async (email) => {
    console.log("Searching for user with email:", email); 
    
    const user = await User.findOne({ email }).lean();

    if (!user) {
        console.log("User not found in database.");
        return null;
    }

    console.log("User found:", user); 
    return user;
    // const user = await User.findOne({email}).lean();
    // return user
};

exports.createUserService = async (newUser) => {
    return await User.create(newUser);
}

exports.updateUserService = async (userId, updatedUser) => {
    return await User.findByIdAndUpdate
    (userId, updatedUser
        , { new: true });

}

exports.deleteUserService = async (userId) => {
    return await User.findByIdAndDelete(userId);
}