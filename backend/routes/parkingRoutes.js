const express= require('express');
const router=express.Router();
const {getSlots,parkVehicle}=require('../controllers/parkingController');


router.get('/',(req,res)=>{
    res.json({
        message:'Parking API Working',
    });
});
router.get('/slots',getSlots);
router.post('/park',parkVehicle);

module.exports=router;