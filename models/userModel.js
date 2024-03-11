import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
})


const NoteUser = mongoose.model('noteUser', MemberSchema);

export default NoteUser;