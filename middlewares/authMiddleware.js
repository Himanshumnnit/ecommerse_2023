import JWT from 'jsonwebtoken'
import userModels from '../models/userModels.js';

// protected route token based 
export const requireSignIn=async(req,res,next)=>{
    try{
        const decode=JWT.verify(req.headers.authorization,process.env.SECRET_KEY);
        req.user=decode;
        next();
    }
    catch(e)
    {
        console.log(e);
    }
}



//admin excess
export const isAdmin=async(req,res,next)=>{
    try{
          const user=await userModels.findOne({_id:req.user._id})
          if(user.role!==1)
          {
             return res.status(401).send({
                success:false,
                message:"Unauthorized user"
             })
          }
          else{
            next();
          }
    }
    catch(e)
    {
        console.log(e);
        res.status(401).send({
            message:"error in admin "
        })
    }
}