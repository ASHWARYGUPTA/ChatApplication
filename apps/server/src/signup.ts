import express from "express"
import { PrismaClient } from "@prisma/client";
import { zodSignUpParse } from "./verify";
import bcrypt from "bcrypt"
import { signInEnum } from "./Schemas";


const router = express.Router();
const client = new PrismaClient();


router.use(express.json());

router.post("/",zodSignUpParse,async (req,res)=>{
    try {
        const hashedPass = await bcrypt.hash(req.body.password,10);
        const User = await client.user.create({
            data:{
                name:req.body.name,
                email:req.body.email,
                username:req.body.username,
                age:req.body.age,
                password:hashedPass,
                signInType:signInEnum.normal
            }
        })
        // console.log(User);
        // console.log("Data Entered For User");
        res.status(200).json({
            message:"Data Sent Successfully",
            value:true
        })
    } catch (error) {
        res.status(401).json({
            message:"An Unkown Error Occured",
            value:false,
            error:error
        })
    }

})

export default router;