const express= require('express');
const router=express.Router();
const {getSlots,parkVehicle,exitVehicle,getParkedVehicles}=require('../controllers/parkingController');


router.get('/',(req,res)=>{
    res.json({
        message:'Parking API Working',
    });
});
router.get('/slots',getSlots);
router.post('/park',parkVehicle);
router.post('/exit',exitVehicle);
router.get('/parked',getParkedVehicles);

module.exports=router;