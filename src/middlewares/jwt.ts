import jwt from 'jsonwebtoken'

const sign = process.env.JWT_SIGNATURE
function verifyToken(token){
   const verified =  jwt.verify(token,sign)
   console.log(verified,'verified?')
}

