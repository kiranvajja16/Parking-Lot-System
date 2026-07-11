const db = require('../config/db');

const LIMITS = {
    bike :5,
    car : 5,
    truck : 2,
};


const getSlots=(req,res)=>{
    const sql=`
    SELECT vechile_type, COUNT(*) AS occupied
    FROM tickets 
    WHERE status = 'parked' GROUP BY
    vechile_type
    `;

    db.query(sql,(err,results)=>{
        if(err){
            return res.status(500).json({
                success : false,
                message : "Database Error",
                error: err.message,
            });
        }

        const occupied = {
            bike : 0,
            car : 0,
            truck : 0,
        };

        results.forEach((row)=>{
            occupied[row.vechile_type]= row.occupied;
        });
        
        const response = {
            bike:{
                total :  LIMITS.bike,
                available : LIMITS.bike - occupied.bike,
            },
            car:{
                total : LIMITS.car,
                available : LIMITS.car - occupied.car,
            },
            truck:{
                total : LIMITS.truck,
                available : LIMITS.truck - occupied.truck,
            },
        };
        res.json(response);
    });    
};

module.exports={getSlots};