import mongoose from 'mongoose';

const makeConnection = async (username,password)=>{
    try{
        await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.jb6pz7m.mongodb.net/?retryWrites=true&w=majority`)
        .then(()=>{console.log("Connection is successfull");})
    }
    catch(err){
        console.log("Error in the connection 🚨",err);
    }
}
export default makeConnection;