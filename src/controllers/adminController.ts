import {Request,Response} from 'express'
import adminModel from '../model/adminModel'
import userModel from '../model/userModel'
import { sign } from 'jsonwebtoken'

export default {

    adminLoginVerify : async(req:Request , res:Response)=>{
        try {
            const {email,password} = req.body
            const data = await adminModel.findOne({email})
            if(data) {
                let auth = sign({email:data.email},process.env.JWT_SIGNATURE) 
                if(data.password == password) res.status(200).json({Authentication:true,jwt:auth})
                else res.status(401).json({Authentication:false})
            }
        } catch (error) {
            console.log(error.message)
        }
    },

    userDetails : async(req:Request , res : Response)=>{
        try {
            const userData = await userModel.find({},{password:0})
            res
            .status(200)
            .json({users:userData})
        } catch (error) {
            console.log(error.message)
        }
    },

    blockUnblockUser : async(req : Request , res : Response) =>{
        try {
            console.log('hi am thashrref');
            
            const {userId,status} = req.body
            const userUpdateStatus = await userModel.updateOne({_id:userId},{$set:{status:!status}})
            const newData = await userModel.find()
            res
            .status(201)
            .json({users:newData})
        } catch (error) {
            console.log(error.message)
        }
    },

    findUser : async(req : Request , res : Response) => {
        let userId = req.body.userId 
        let user = await userModel.findOne({_id:userId.userId})
        if(user) res.status(200).json({email:user.email,name:user.name})
        res.status(401).json({response:'User not found'})
    },

    updateUser : async(req : Request , res : Response)=>{
        let {username,useremail,userId} = req.body
        userId = userId.userId
        const updated = await userModel.updateOne({_id:userId},{$set:{email:useremail,name:username}})
        if(updated) res.status(201).json({status:'User updated'})
        else res.status(400)
    },
    searchUser : async (req:Request , res : Response)=>{
        const data = await userModel.find({ name: { $regex: req.body.key } },{email:1,name:1,status:1,_id:0})
        res.status(201).json(data)
    }
}