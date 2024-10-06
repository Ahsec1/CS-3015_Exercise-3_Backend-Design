const bcrypt = require('bcrypt');
const users = require('../data/users'); 

// Function to hash the passwords of users
const hashPasswords = async () => {
    for (const user of users) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    console.log("Users with hashed passwords:", users); 
};

//get list of users
const getUsers = () => {
    return users;
};

hashPasswords().catch(err => {
    console.error("Error hashing passwords:", err); //error message when hasing fails
});

module.exports = {
    getUsers
};
