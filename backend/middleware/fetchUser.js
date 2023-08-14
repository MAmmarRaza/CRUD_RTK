const jwt = require('jsonwebtoken');
const Jwt_Secret_Key = "KeyByRafaySty@le";

const fetchUsers = async (req, res, next) => {
    const token = req.header('auth_token');
    if(!token){
        res.status(401).send({error: "Please authenticate"});
    }
    try {
        console.log("error")
        const data= await jwt.verify(token,Jwt_Secret_Key); //it will return the data we saved in token on login
        req.user=data.user;
        // res.send(data);
        next();
        
    } catch (error) {
        res.status(401).send({error: "Please authenticate"});
    }
}

module.exports = fetchUsers;