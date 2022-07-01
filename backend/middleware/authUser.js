const jwt = require("jsonwebtoken");
require("dotenv").config();

const authUser = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
    const userId = decodedToken.userId;
console.log(token)
    return userId;
};

module.exports = authUser;

