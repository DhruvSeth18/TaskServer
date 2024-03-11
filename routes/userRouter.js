import express from 'express';
import {createUser,LoginUser} from '../controllers/user-controller.js';

const UserRoutes = express.Router();

UserRoutes.route('/signup')
.post(createUser);

UserRoutes.route('/login')
.post(LoginUser);

export default UserRoutes;
