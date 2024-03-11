import express from 'express';
import cors from 'cors';
import makeConnection from './connection/connection.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import NotesRouter from './routes/notesRouter.js';
import UserRoutes from './routes/userRouter.js';

dotenv.config();


const app = express();
const port = process.env.PORT || 8092;

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));


app.use('/notes',UserRoutes);
app.use('/notes',NotesRouter);



makeConnection(process.env.DB_username,process.env.DB_password);

app.listen(port,()=>{
    console.log("Site is working on ",port);
})
