import express,{Application} from 'express'
import controller from '../controllers/adminController'
import jwtAuth from '../middlewares/jwtAuth'
const admin_route:Application = express()


admin_route.post('/login',controller.adminLoginVerify)
admin_route.get('/user-details',jwtAuth,controller.userDetails)
admin_route.patch('/block-unblock-user',jwtAuth,controller.blockUnblockUser)
admin_route.post('/find-user',jwtAuth,controller.findUser)
admin_route.patch('/update-user',jwtAuth,controller.updateUser)
admin_route.post('/search-user',jwtAuth,controller.searchUser)


export default admin_route