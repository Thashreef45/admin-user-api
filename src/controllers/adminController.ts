import {Request,Response} from 'express'
import adminModel from '../model/adminModel'
import userModel from '../model/userModel'
const jwt = require('jsonwebtoken')

export default {

    adminLoginVerify : async(req:Request , res:Response)=>{
        try {
            const {email,password} = req.body
            const data = await adminModel.findOne({email:email})
            if(data) {
                let auth = jwt.sign({email:data.email},process.env.JWT_SIGNATURE) 
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
            console.log(userData,'data fetched')
            res
            .status(200)
            .json({users:userData})
        } catch (error) {
            console.log(error.message)
        }
    },

    blockUnblockUser : async(req : Request , res : Response) =>{
        try {
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
        let userId
        let user
        if(req.body.userId){
            userId = req.body.userId 
            user = await userModel.findOne({_id:userId.userId})
        }else{
            userId = req.body.email
            console.log(userId)
            user = await userModel.findOne({email:userId})
        }
        if(user) res.status(200).json({email:user.email,name:user.name,image:user.image})
        else res.status(401).json({response:'User not found'})
    },

    updateUser : async(req : Request , res : Response)=>{
        let {username,useremail,userId} = req.body
        userId = userId.userId
        const updated = await userModel.updateOne({_id:userId},{$set:{email:useremail,name:username}})
        if(updated) res.status(201).json({status:'User updated'})
        else res.status(400)
    },
    searchUser : async (req:Request , res : Response)=>{
        console.log(req.body,'body')
        const data = await userModel.find({ name: { $regex: req.body.key } },{email:1,name:1,status:1,_id:0})
        res.status(201).json(data)
    }
}