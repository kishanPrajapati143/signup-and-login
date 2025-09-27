
import jwt from 'jsonwebtoken';
import user from "../models/usermodel.js";



const userLogin = async(req,res) => {

    try{
       const {email, password} = req.body;

       const existdUser = await user.findOne({email});

         if(existdUser){
        console.log(existdUser);
         if(password===existdUser.password){
        // const passwordMatch = await compare(password, existdUser.password);
             const token = jwt.sign(
                {userId: existdUser._id, email: existdUser.email},
                process.env.JWT_SECRET || 'yoursecretkey',
                {expiresIn: '.5h'}
            );
            res.json({token, userId: existdUser._id, email: existdUser.email});
         }
       else{
        return res.status(401).json({message: "invalid pssword"});
       }
    }
    else{
        return res.status(401).json({message: "invalid email"});
    }

    }
catch(error){
    console.error(error);
    res.status(500).json({message: "server error"});
    }

}

export default userLogin;
