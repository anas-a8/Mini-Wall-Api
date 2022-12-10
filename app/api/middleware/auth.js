const jwt = require("jsonwebtoken")
const SECRET_KEY = "POSTSAPI"

const auth = (req,res,next)=>{
    try {
        //get the token out of the header
        let token = req.headers.authorization;
        console.log(token);

        if(token){
        // retrieve the authorization header and parse out the
        // JWT using the split function
            token = token.split(" ")[1];
            console.log(token); 
            
        // verify that this was a token signed with OUR secret key
            let user = jwt.verify(token,SECRET_KEY)
            req.userId = user.id;
        }
        else{
            res.status(401).json({message : "Unauthorized User"})
        }
        
        
        next();
    // otherwise send back a status code of 401 (Unauthorized User) with a message
        
    } catch (error){
        console.log(error)
        res.status(401).json({message:"Unauthorized User"})
    }
}

module.exports = auth;