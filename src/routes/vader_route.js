const express=require('express')
const  vader  = require('../controllers/vader_controller')
const router=express.Router()

router.post('/analyze',vader)

module.exports=router