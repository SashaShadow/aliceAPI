import mongoose from "mongoose";

//MONGODB CONFIG
export const db = mongoose.connect(process.env.MONGODB, 
{ useNewUrlParser: true })

const photoSchema = new mongoose.Schema({
    name: {type: String, required: true },
    url: {type: String, required: true},
    desc: {type: String, required: true},
    category: {type: String, required: true}
}, {
    versionKey: false 
})

export const photoModel = mongoose.model("photos", photoSchema);

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, max: 30},
    password: {type: String, required: true, max: 20},
    admin: {type: Boolean}
})

export const User = mongoose.model('Users', userSchema);
