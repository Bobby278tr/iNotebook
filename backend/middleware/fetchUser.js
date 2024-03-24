const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Thisisainotebookappusingmern%123';

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and apend user id to req obj
    const token = req.header("auth-token");
    if (!token) {
        req.status(401).send({ error: "Please Authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please Authenticate using a valid token" })
    }

}

module.exports = fetchuser;