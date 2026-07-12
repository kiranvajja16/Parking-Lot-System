const express= require('express');
const router=express.Router();
const {getSlots,parkVehicle,exitVehicle}=require('../controllers/parkingController');


router.get('/',(req,res)=>{
    res.json({
        message:'Parking API Working',
    });
});
router.get('/slots',getSlots);
router.post('/park',parkVehicle);
router.post('/exit',exitVehicle);

module.exports=router;