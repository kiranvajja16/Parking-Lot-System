const db = require('../config/db');
const calculateFare = require("../utils/fare");



const LIMITS = {
    bike :5,
    car : 5,
    truck : 2,
};


const getSlots=(req,res)=>{
    const sql=`
    SELECT vehicle_type, COUNT(*) AS occupied
    FROM tickets 
    WHERE status = 'parked' GROUP BY
    vehicle_type
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
            occupied[row.vehicle_type]= row.occupied;
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
        return res.status(200).json({
    success: true,
    slots: response
});
    });    
};

const parkVehicle = (req,res)=>{
    const {vehicleNumber,vehicleType}= req.body;
    if(!vehicleNumber || !vehicleType){
        return res.status(400).json({
            success: false,
            message: 'Vehicle number and vehicle type are required'
        });
    }

    const validTypes=["bike","car","truck"];
    if(!validTypes.includes(vehicleType)){
        return res.status(400).json({
            success : false,
            message : 'Invalid vehicle type'
        });
    }

    const checkVehicleQuery=`
    SELECT * FROM tickets 
    WHERE vehicle_number = ?
    AND status ='parked'
    `;

    db.query(checkVehicleQuery,[vehicleNumber],(err,result)=>{
        if(err){
            return res.status(500).json({
                success : false,
                message: 'Database Error'
            });
        }
        if(result.length > 0){
                return res.status(400).json({
                    success: false,
                    message: 'Vehicle is already parked'
            });
        }
        const slotQuery=`Select count(*)
        as occupied from tickets where 
        vehicle_type = ? and status = 'parked'`;
        db.query(slotQuery,[vehicleType],(err,slotResult)=>{
            if(err){
                return res.status(500).json({
                    success : false,
                    message: 'Database Error'
                });
            }
            const occupied = slotResult[0].occupied;
            if(occupied >= LIMITS[vehicleType]){
                return res.status(409).json({
                    success: false,
                    message: 'Parking Full'
                });
            }
            const ticketId = "TKT-" + Date.now();
            const insertQuery = `
            insert into tickets(
            ticket_id,
            vehicle_number,
            vehicle_type,
            entry_time,
            status)
            values (?,?,?,NOW(),'parked')`;
            db.query(insertQuery,[ticketId,vehicleNumber,vehicleType],(err)=>{
                if (err) {
                    console.log(err);  
                    return res.status(500).json({
                    success: false,
                    message: "Database Error",
                    error: err.message
                });
}
                return res.status(201).json({
                    success : true,
                    ticket:{
                        ticketId,
                        vehicleNumber,
                        vehicleType,
                        entryTime : new Date()
                    }
                });
            })
        })
    });
};

const exitVehicle = (req,res)=>{
    const {ticketId,vehicleNumber}=req.body;
    if(!ticketId && !vehicleNumber){
        return res.status(400).json({
            success : false,
            message : "Ticket ID or vehicle Number is required"
        });
    }
    let findQuery;
    let value;
    if(ticketId){
        findQuery=`
        select * from tickets
        where ticket_id=?
        and status="parked"
        `;
        value=ticketId;
    }
    else{
        findQuery=`
        select * from tickets where vehicle_number=?
        and status = 'parked'`;
        value=vehicleNumber;
    }
    db.query(findQuery,[value],(err,result)=>{
        if(err){
            return res.status(500).json({
                success:false,
                message: "Database Error"
            });
        }
        if(result.length===0){
            return res.status(404).json({
                success: false,
                message: "Ticket not found or already exited"
            });
        }
        const ticket = result[0];

        const exitTime = new Date();
        const entryTime = new Date(ticket.entry_time);

        const durationMs = exitTime - entryTime;

        const durationHours = Math.ceil(
            durationMs / (1000 * 60 * 60)
        );

        const amount = calculateFare(durationHours);
        const updateQuery=`UPDATE tickets SET exit_time = ?,
        amount = ?, status='exited' where id=?`;

        db.query(updateQuery,[exitTime,amount,ticket.id],(err)=>{
            if(err){
                return res.status(500).json({
                    success: false,
                    message: 'Database Error'
                });
            }

            return res.status(200).json({
                success:true,
                receipt:{
                    ticketId:ticket.ticket_id,
                    vehicleNumber: ticket.vehicle_number,
                    vehicleType:ticket.vehicle_type,
                    entryTime: ticket.entry_time,
                    exitTime,
                    durationHours,
                    amount
                }
            });
        })
    })
};

const getParkedVehicles =(req,res)=>{
    const query=`
    select ticket_id,vehicle_number,
    vehicle_type,entry_time from tickets
    where status = 'parked'
    order by entry_time asc
    `;

    db.query(query,(err,result)=>{
        if(err){
            return res.status(500).json({
                success : false,
                message : 'Database Error'
            });
        }
        const vehicles= result.map((row)=>({
            ticketId:row.ticket_id,
            vehicleNumber: row.vehicle_number,
            vehicleType:row.vehicle_type,
            entryTime: row.entry_time
        }));

        res.status(200).json({
            success:true,
            vehicles
        }); 
    });
};

module.exports={getSlots,parkVehicle,exitVehicle,getParkedVehicles};