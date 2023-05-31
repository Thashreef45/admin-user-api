import express,{Application,Request,Response} from 'express'
import controller from '../controllers/adminController'

const admin_route:Application = express()


admin_route.post('/login',controller.adminLoginVerify)
admin_route.get('/user-details',controller.userDetails)
admin_route.patch('/block-unblock-user',controller.blockUnblockUser)
admin_route.post('/find-user',controller.findUser)
admin_route.patch('/update-user',controller.updateUser)
admin_route.post('/search-user',controller.searchUser)


export default admin_route