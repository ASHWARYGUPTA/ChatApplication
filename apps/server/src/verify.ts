import { Request,Response,NextFunction } from "express"
import {zodUser}  from "./zodValidication"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();


export const zodSignUpParse = (req:Request,res:Response,next:NextFunction)=>{
    try {
        const parsed = zodUser.parse(req.body);
        next();
    } catch (error) {
        res.status(401).json({
            message:"An Error Occured While Parsing Data",
            value:false,
            // @ts-ignore
            error:error.issues
        })
    }
}


export const verifyJWT = (req:Request,res:Response,next:NextFunction)=>{
    if(!process.env.JWT_SECRET){
        res.status(401).json({
            message:"Secret Key Doesn't Exist Internal Server Error",
            value:false
        })
        return;
    }
    
    try {
        const verifyJWTSign = jwt.verify(req.cookies.token,process.env.JWT_SECRET);

        if(verifyJWTSign){
            req.body.decodedJWT = verifyJWTSign;
            next();
        }
        else{
            res.status(400).json({
                message:"Sent Token is Not Signed By Us Verify Again",
                value:false
            })
        }
    } catch (error) {
        res.status(401).json({
            message:"Invalid Token",
            value:false,
            error:error
        })
    }
    
}