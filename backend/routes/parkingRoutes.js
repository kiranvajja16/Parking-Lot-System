const express= require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    res.json({
        message:'Parking API Working',
    });
});

module.exports=router;