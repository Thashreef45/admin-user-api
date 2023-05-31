import mongoose,{Schema} from 'mongoose'

const userSchema:Schema = new Schema({

    email : {type : String,required : true},
    name : {type : String,required : true},
    password : {type : String,required : true},
    image : {type : String},
    phone : {type : Number},
    status: {type: Boolean,default: true},

})

const userModel = mongoose.model('User',userSchema)
export default userModel