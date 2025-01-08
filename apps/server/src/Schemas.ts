export enum signInEnum{
    normal = "normal",
    google = "google",
    linkedin = "linkedin",
    facebook = "facebook",
    github = "github"
}


export interface User {
    username    :     String;          
    email       :     String;          
    password?   :     String;
    name        :     String;
    age?        :     Number;
    signInType? :     signInEnum;
    rooms?      :     String[];
  }
  
export  interface Room {       
    name?        :     String;
    members      :     User[]
    admins       :     User[]
    messages     :     Messages[]
  }
  
export  interface Messages {
    senderId     :     String
    sender       :     User         
    receiverId?  :     String
    receiver?    :     User     
    roomId?      :     String
    room?        :     Room
    content      :     String
  }

export  interface SignIn{
    username:String,
    email:String,
    password:String
  }