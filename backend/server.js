const express=require('express');
const cors=require('cors');
require('dotenv').config();

const db=require('./config/db');

const parkingRoutes=require('./routes/parkingRoutes');

const app=express();

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('parking Lot Backend is running..');
});

app.use('')