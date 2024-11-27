import LoginModel from "../components/login.js";
import  jwt from 'jsonwebtoken';
import  bcrypt from  'bcryptjs';
import DataModel from "../components/insert.js";
import Data from "../components/Data.js";


export const register = async(req,res) => {
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await LoginModel.create({
            email: req.body.email,
            password: newPassword,
        })
        res.json({status: 'ok'})
    } catch (error) {
        res.json({status: 'error', error: 'Duplicate email'})
    }
  }



  export const login =async (req, res) => {
    const user = await LoginModel.findOne({
        email: req.body.email,
    })
    if(!user) {
        return {status: 'error', error: 'Invalid User'}
    }
    const isPasswordVaild = await bcrypt.compare(
        req.body.password,
        user.password
    )
    if (isPasswordVaild) {
        const token = jwt.sign(
            {
                name: user.name,
                email: user.email
            },
            'secret123'
        )
        return res.json({status: 'ok', user: token})
    } else {
        return res.json({status: 'error', user: false})
    }
  }


  export const AllData =  (req, res) => {
    DataModel.find({}) 
      .then(data => {
        if (data.length > 0) {
          res.status(200).json(data);
        } else {
          res.status(404).json({ error: 'No data found' });
        }
      })
      .catch(err => res.status(500).json({ error: err.message }));
  }

  
  export const saveData = async(req,res)=>{
    try {
      
      const inputValue = req.body.inputValue;
      const newData = new Data({ inputValue });
      await newData.save();
  
      res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }



  export const FindData = async (req, res) => {
    try {
      const data_stage = req.query.inputValue
      if(data_stage){
        const data = await DataModel.find({}).sort({_id:-1}).limit(data_stage);
        if(data.length>0){
          res.status(200).json(data);
        }else{
          res.status(404).json({error:"No Data Found"});
        }
      }else{
        res.status(501).json({error:"undefined"});

      }
      
      
    } catch (error) {
      console.error("Error with fetching data:", error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  

  export const Limits_Data = async(req,res)=>{
    Data.findOne({},{},{sort:{_id:-1}}).then(data=>{
       if(data){
        res.status(200).json({inputValue:data.inputValue,
        });
       }else{
        res.status(400).json({error:"No Data found"});
       }
    })
    .catch(err =>res.status(500).json({error:err.message}))
}




export const Report_data = async(req,res)=>{

  try {
    const fromDates = req.body.fromDates;
    const todatas =req.body.toDates;

    
    const filteredData = await DataModel.find({
      time: {
        $gte: fromDates,
        $lte: todatas
      }
    });

    res.status(200).json(filteredData);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}



  export const insertData = async(req,res)=>{
    const { R_N, sensor1, sensor2, sensor3, sensor4, sensor5, time } = req.query;
    if (!R_N || !sensor1 || !sensor2 || !sensor3 || !sensor4 || !sensor5 || !time) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }
    try {
        const newData = {
            R_N: R_N,
            sensor1: sensor1,
            sensor2: sensor2,
            sensor3: sensor3,
            sensor4: sensor4,
            sensor5: sensor5,
            time: time,
        };

        await DataModel.create(newData);
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}