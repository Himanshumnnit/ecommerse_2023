import express from "express";
import JWT from 'jsonwebtoken'
import { loginController,registerController,testController } from "../controllers/authController.js";
import { requireSignIn,isAdmin} from "../middlewares/authMiddleware.js";



// router object
const router=express.Router()

//routing 
//register
router.post('/register',registerController)

//login
router.post('/login',loginController);

//test 
router.get('/test',requireSignIn,isAdmin,testController);

export default router