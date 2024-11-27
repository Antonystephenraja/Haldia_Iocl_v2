import express from 'express'
import { register,login,AllData,insertData,Limits_Data,saveData,FindData,Report_data} from "../controller/alldata.js";

const router = express.Router();
//important

router.post("/register", register)
router.post("/login",login)
router.get("/insertData",insertData)
router.get("/AllData",AllData)
router.post('/saveData',saveData)
router.get('/FindData',FindData)
router.get('/Limits_Data',Limits_Data)
router.post("/Report_data",Report_data)




export default router;