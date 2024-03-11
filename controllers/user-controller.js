import NoteUser from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const createUser = async (request, response) => {
    try {
        const HashedPass = await bcrypt.hash(request.body.password,5);
        if (!request.body.username || !request.body.email || !request.body.password) {
            return response.status(400).json({
                status: 'fail',
                message: "All fields are required"
            });
        }
        const user = { 
            username: request.body.username, 
            email: request.body.email, 
            password: HashedPass
        };
        const isUser = await NoteUser.find({username:user.username});
        if(isUser.length!==0){
            return response.status(409).json({
                status:'fail',
                message:'user Already Exist'
            })
        }
        const isEmail = await NoteUser.find({email:user.email});
        if(isEmail.length!==0){
            return response.status(409).json({
                status:'fail',
                message:'User Exist with the Email'
            })
        }
        const newuser = new NoteUser(user); 
        await newuser.save(); 

        return response.status(200).json({
            status:'success',
            user:user
        });
        
    } catch (err) {
        console.log("There is an Error while creating a User 🚨 ", err);
        return response.status(400).json({
            status: 'fail',
            message: 'Error while creating a new User',
            error: err
        });
    }
};

export const LoginUser = async (request,response)=>{
    try{
        console.log(request.body);
        if(!request.body.username || !request.body.password){
            return response.status(400).json({
                status:'fail',
                message:'UserName or Password is Invalid'
            })
        }
        const findUser = await NoteUser.findOne({username:request.body.username});
        if(!findUser){
            return response.status(401).json({
                status:'fail',
                message:'The User is not found'
            })
        }
        const comparePass = await bcrypt.compare(request.body.password,findUser.password);
        if(comparePass){
            const jsonToken = jwt.sign(findUser.toJSON(),process.env.Secret_key,{expiresIn:'2d'});
            return response.status(200).json({
                status:'success',
                token :`Bearer ${jsonToken}`,
                username:findUser.username,
                email:findUser.email
            })
        } else{
            return response.status(401).json({
                status:'fail',
                message:'Either Username or Password is Invalid'
            })
        }
    } catch(err){
        console.log("Error while Logging the user ",err);
        response.status(400).json({
            status:'success',
            message:"Error While Creating the User",
            error :err
        });
    }
}
