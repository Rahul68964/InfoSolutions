import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import adminModel from '../models/admin.js';
import userModel from '../models/user.js';
import taskModel from '../models/task.js'

const createtoken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body; 
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false, message:"User doesn't exist"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch){
            const token = createtoken(user._id)
            return res.json({success:true, token})
        }
        else{
            return res.json({success:false, message:"Inavalid username or password"});
        }  
        
    } catch (error) {
        console.log(error);
        return res.json({success:false, message:error.message})
    }
};
const signupUser = async (req, res) => {
    try {
        const {name, email, password, phone} = req.body;
        const exist = await userModel.findOne({email})

        if(exist){
            return res.json({success: false , message:'User already exist'})
        }
        if(!validator.isEmail(email)){
            return res.json({success: false , message:'Please enter valid email '})
        }
        if(password.length < 8 ){
            return res.json({success: false , message:'Please enter a strong password'})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await userModel.create({
            name,
            email,
            phone,
            password:hashedPassword
        })

        const user = await newUser.save();
        const token = createtoken(user._id);
        
        res.json({success:true, token})
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
};

const getAllTasks = async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const tasks = user.tasks;

    // Fetch all task details in parallel
    const taskArray = await Promise.all(
      tasks.map(async ({ taskId, csvPart }) => {
        const task = await taskModel.findById(taskId);
        if (!task) return null; // or handle missing task gracefully
        return {
          taskDetails: task,
          csvPart: csvPart,
        };
      })
    );

    const filteredTasks = taskArray.filter(t => t !== null);

    return res.json({ success: true, taskArray: filteredTasks });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const csvDownloader = async (req, res) => {
  try {
    const { csvPart } = req.body;

    if (!csvPart) {
      return res.status(400).json({ success: false, message: "CSV content is required" });
    }

   
    res.setHeader('Content-Disposition', `attachment; filename=your_data.csv`);
    res.setHeader('Content-Type', 'text/csv');

    res.status(200).send(csvPart);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error downloading CSV" });
  }
};


export { loginUser, signupUser, csvDownloader,getAllTasks };