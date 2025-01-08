import { z } from "zod";
import { signInEnum } from "./Schemas";


const zodEnumSignIn = z.nativeEnum(signInEnum);



export const zodUser = z.object({
    username : z
                .string()
                .min(4,"Username Atleast of 4 Char")
                .max(150,"Username Not More than 150 Character"),
    email:     z
                .string()
                .email("Invalid Email Type"),
    password:  z
                .string()
                .min(8,"Password atleast 8 characters")
                .max(150,"Password can't be more than 150 characters")
                .optional(),
    name:      z
                .string()
                .min(1,"Can't be empty")
                .max(150,"name can't be more than 150 characters"),
    age:       z
                .number({message:"Must be a number"})
                .min(1,"Can't be less than one year")
                .optional()
})


export const zodMessage = z.object({
    sendersId       :  z
                        .string()
                        .max(90),
    reciversId      :  z
                        .string()
                        .max(90)
                        .optional(),
    roomId          :  z.string()
                        .max(90)
                        .optional(),
    content         :  z
                        .string()
                        .min(1)
                        .max(1024)
})

