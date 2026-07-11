const getSlots=(req,res)=>{
    res.json({
        bike:{
            total: 5,
            available:5,
        },
        car:{
            total: 5,
            available: 5,
        },
        truck:{
            total:2,
            available: 2,
        },
    });
};

module.exports={getSlots};