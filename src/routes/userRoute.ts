import express,{Application,Request,Response} from 'express'
import controller from '../controllers/userController'

const user_route:Application = express()


//User--Routes
user_route.get('/',controller.userHome)
user_route.post('/signup',controller.signup)
user_route.post('/login',controller.login)
user_route.patch('/edit-user',controller.editUser)



export default user_route
