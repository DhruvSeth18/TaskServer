import mongoose from "mongoose";

const CreateNotes = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    title: {
        type: String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    validTill:{
        type:Number,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    currdate:{
        type:String,
        required:true,
    },
    completed:{
        type:Boolean,
        required:true,
        default: false
    }
});

const Notes = mongoose.model('Notes',CreateNotes);

export default Notes;