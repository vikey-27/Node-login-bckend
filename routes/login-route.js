const express=require('express');
const bodyParser=require('body-parser');
const controller=require('../controllers/controller');

const router=express.Router();


router.use(controller.login)

module.exports=router;