const jwt = require("jsonwebtoken");
require("dotenv").config();


function authUser(req) {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token, "verification token")
    const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
    const userId = decodedToken.userId;
    
    return userId;
};

module.exports = authUser;
