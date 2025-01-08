import express from "express"
import signUpRouter from "./signup"
import signInRouter from "./signin"



const app = express();


app.use(express.json());

app.use("/api/v1/signup",signUpRouter);
app.use("/api/v1/signin",signInRouter);



app.listen(3000,()=>{
    console.log("Listening on port 3000");
}) 