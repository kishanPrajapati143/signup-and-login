import user from "../models/usermodel.js";

let userconteroller = async(req,res) => {

    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }  

        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new user({ name, email, password });
        const usersave = await newUser.save();
        res.status(201).json({ message: "User registered successfully" ,
            user:{ id: user._id, name: user.name, email: user.email}
        });


    } 
    
    catch (error) {
        // console.log(error)
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
    
}
export default userconteroller;