const express= require('express');
const router=express.Router();
const {getSlots}=require('../controllers/parkingController');


router.get('/',(req,res)=>{
    res.json({
        message:'Parking API Working',
    });
});
router.get('/slots',getSlots);

module.exports=router;