import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import express from "express";
import { Router,Request,Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { verifyJWT } from "./verify";
dotenv.config();



const router = express.Router();
const client = new PrismaClient();


router.use(express.json());
router.use(cookieParser());


router.post("/",async (req:Request,res:Response)=>{
    if(!process.env.JWT_SECRET){
        res.status(404).json({
            message:"NO SECRET FOUND INTERNAL SERVER ERROR",
            value:false
        })
        return;
    }
    const user = await client.user.findFirst({
        where:{
            username:req.body.username
        },
        select:{
            password:true,
            email:true,
            id:true,
            name:true
        }
    })
    
    
    if(user != null){
        if(user?.password === null){
            res.status(300).json({
                message:"Signed In Not Using Table Choose Another Route to SignIn",
                value:false
            })
            return;
        }
        const passCompare = await bcrypt.compare(req.body.password,user.password);
        if(passCompare){
            const currDate = new Date();
            const expireDate = new Date();
            expireDate.setDate(currDate.getDate() + 155);

            const payloadJWT = jwt.sign({
                id:user.id,
                username:req.body.username,
                name:user.name
            },process.env.JWT_SECRET)
            res.cookie("token",payloadJWT,{secure:true,expires:expireDate,httpOnly: true});

            res.status(200).json({
                message:"Logged In Successfully",
                value:true
            })
        }
        else{
            res.status(400).json({
                message:"Wrong Password Or Diffrent Sign Up Method",
                value:false
            })
        }
    }
})

router.get("/",verifyJWT,(req,res)=>{
    res.status(200).json({
        message:"Verified Successfully",
        decoded:req.body.decodedJWT,
        value:true
    })
})

router.get("/findEmail",async (req,res)=>{
    if(!req.headers.email) return;
    const getEmail = await client.user.findFirst({
        where:{
            email:String(req.headers.email)
        },
        select:{
            email:true
        }
    })
    if(getEmail){
        res.status(200).json({
            message:"Found Email",
            value:true
        })
    }
    else{
        res.status(401).json({
            message:"Invalid Email",
            value:false
        })
    }
})

router.get("/findUsername",async(req,res)=>{
    const getUser = await client.user.findFirst({
        where:{
            username:String(req.headers.username)
        },
        select:{
            username:true
        }
    })

    if(getUser){
        res.status(200).json({
            message:"Found User",
            value:true
        })
    }
    else{
        res.status(401).json({
            message:"Invalid Username",
            value:false
        })
    }
})

export default router;