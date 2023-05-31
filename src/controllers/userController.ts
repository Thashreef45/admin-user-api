import { Request, Response } from 'express'
const jwt = require('jsonwebtoken')
import userModel from '../model/userModel'

export default {

    userHome: async (req: Request, res: Response) => {
        res
        .status(200)
        .json({ 'response': 'user Home page' })
    },

    signup: async (req: Request, res: Response) => {
        const { email, name, password } = req.body
        const data = await userModel.findOne({ email: email })

        if (!data) {
            const newUser = new userModel({
                name, email, password
            })
            const save = newUser.save()
            res
            .status(201)
            .json({ 'response': true })
        } else {
            res
            .status(409)
            .json({ 'response': false })
        }
    },
    login: async (req: Request, res: Response) => {
        const { email, password } = req.body
        const user = await userModel.findOne({ email: email})
        if (user) {
            if (user.password == password && user.status) {                
                let token = jwt.sign({email:user.email},process.env.JWT_SIGNATURE)
                const data=await userModel.findOne({_id:user._id},{_id:0,password:0})
                res
                .status(200) 
                .json({ authentication: true,key:token,user:data})
            } else {
                res.status(401).json({ authentication: false })
            }
        } else {
            res
            .status(401)
            .json({ authentication: false })
        }
    },

    editUser : async (req : Request , res : Response)=>{
       const { email, name, image} = req.body
       const data = await userModel.updateOne({email:email},{$set:{email:email,name:name,image:image}})
       if(data) res.status(201).json({status:'Updated'})
    }



}