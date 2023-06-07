import { Request,Response , NextFunction } from 'express'
import {verify} from 'jsonwebtoken'


function verifyToken(req :Request ,res : Response , next : NextFunction){
   const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] :req.body.adminToken ;
   
   const verified = verify(token,process.env.JWT_SIGNATURE)   
   if(verified)next() 
   else{
      res.status(401).json({
         message:'Un-Authorized user'
      })
   }
}

export default verifyToken

 

