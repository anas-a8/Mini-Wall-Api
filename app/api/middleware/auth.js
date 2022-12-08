const jwt = require("jsonwebtoken")
const SECRET_KEY = "POSTSAPI"

const auth = (req,res,next)=>{
    try {
        //authorization get the token from headers(will get it when we login) 
        //then will store on token
        let token = req.headers.authorization;
        console.log(token);
        if(token){
            // 
            token = token.split(" ")[1];
            console.log(token);
            // it will verfy if the user has token and secret key 
            let user = jwt.verify(token,SECRET_KEY)
            req.userId = user.id;
        }
        else{
            res.status(401).json({message : "Unauthorized User"})
        }
        
        
        next();
        // any error inside try this code will be run an error
        
    } catch (error){
        console.log(error)
        res.status(401).json({message:"Unauthorized User"})
    }
}

module.exports = auth;