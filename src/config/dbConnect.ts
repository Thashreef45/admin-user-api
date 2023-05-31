import mongoose from 'mongoose'

const Connectdb =()=>{
    mongoose.connect(process.env.DB_URL)
}

export default Connectdb