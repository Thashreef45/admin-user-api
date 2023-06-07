import { Request, Response } from 'express'
import { sign, verify } from 'jsonwebtoken'
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
        const user = await userModel.findOne({ email: email })
        if (user) {
            if (user.password == password && user.status) {
                let token = sign({ email: user.email }, process.env.JWT_SIGNATURE)

                const data = await userModel.findOne({ _id: user._id }, { _id: 0, password: 0 })
                res
                    .status(200)
                    .json({ authentication: true, key: token, user: data })
            } else {
                res.status(401).json({ authentication: false })
            }
        } else {
            res
                .status(401)
                .json({ authentication: false })
        }
    },
    findUser: async (req: Request, res: Response) => {

        let userId = req.body.email
        if (!userId) {
            userId = verify(req.headers.authorization.split(" ")[1], process.env.JWT_SIGNATURE)
            userId = userId.email
        }
        const user = await userModel.findOne({ email: userId })
        if (user) res.status(200).json({ email: user.email, name: user.name, image: user.image })
        else res.status(401).json({ message: 'Un-Authorized' })
    },

    editUser: async (req: Request, res: Response) => {
        const { email, name, image } = req.body
        const data = await userModel.updateOne({ email: email }, { $set: { email: email, name: name, image: image } })
        if (data) res.status(201).json({ status: 'Updated' })
    }



}