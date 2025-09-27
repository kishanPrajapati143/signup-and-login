// // const bcrypt = require('bcryptjs');
// // const jwt = require('jsonwebtoken');
// // const User = require('../models/user'); // Adjust path as needed
// import jwt from 'jsonwebtoken';



// // POST /login
// const login = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         // Find user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         // Compare password
//         const isMatch = await compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         // Generate JWT token
//         const token = jwt.sign(
//             { userId: user._id, email: user.email },
//             process.env.JWT_SECRET || 'yoursecretkey',
//             { expiresIn: '1h' }
//         );

//         res.json({ token, userId: user._id, email: user.email });
//     } catch (err) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// export default login;
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