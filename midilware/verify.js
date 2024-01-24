const jwt = require('jsonwebtoken');

const verify = async (req, res, next)=>{
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, process.env.PRIVATE_KEY,async function(err, decode){
            if(err){
                res.status(401).json({message: 'Token is not valid', success: false})
            }else{
                req.user=decode;
                next();
            }
        })
    }else{
        res.status(401).json({message: 'Token not found', success: false})
    }
};

module.exports=verify;

