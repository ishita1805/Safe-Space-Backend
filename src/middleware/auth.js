const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    try{
        // console.log(req.cookies)
        const token = req.cookies.jwtss
        if(token==="" || !token){
            res.clearCookie('jwtss')
            return res.json({message:"User not logged in."})
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "key")
        req.userData = decoded
        next()
    }catch(err){
        console.log(err)
        return res.status(401).json({
            message:"Auth failed!"
        })
    }
}