import mongoose,{Schema} from 'mongoose'

const adminSchema:Schema = new Schema({

    email:{ type:String,required : true},
    password:{type:String,required : true}
    
})

const adminModel = mongoose.model('Admin',adminSchema)
export default adminModel
