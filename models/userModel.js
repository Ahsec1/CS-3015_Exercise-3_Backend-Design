const bcrypt = require('bcrypt');
const users = require('../data/users'); 

const hashPasswords = async () => {
    for (const user of users) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    console.log("Users with hashed passwords:", users); 
};

const getUsers = () => {
    return users;
};

hashPasswords().catch(err => {
    console.error("Error hashing passwords:", err);
});

module.exports = {
    getUsers
};
