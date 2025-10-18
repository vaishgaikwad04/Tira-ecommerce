import mongoose from 'mongoose'

const authSchema = mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    role:{
        type: String,
        enum:['stranger','user','admin'],
        default: 'stranger',
    }
})

const authModel = mongoose.model('Auth', authSchema);
export default authModel;