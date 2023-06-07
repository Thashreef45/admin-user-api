import express,{Application,Request,Response} from 'express'
import controller from '../controllers/userController'
import jwtAuth from '../middlewares/jwtAuth'


const user_route:Application = express()


//User--Routes
user_route.post('/signup',controller.signup)
user_route.post('/login',controller.login)
user_route.get('/',jwtAuth,controller.userHome)
user_route.post('/user-profile',jwtAuth,controller.findUser)
user_route.patch('/edit-user',jwtAuth,controller.editUser)



export default user_route
