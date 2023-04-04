const jwt = require('jsonwebtoken');
const JWT_SECRET = "Akhlaque_Ahmad";

const fetchuser = (req, res, next) => {
    // Get user from jwt and add to req obj
    const token = req.header('auth-token');
    if (!token) {
        req.status(400).send({ error: "please authincate using valid toeken" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;

    } catch (err) {
        req.status(400).send({ error: "please authincate using valid toeken" });
    }
    next();
};
module.exports = fetchuser;