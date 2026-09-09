import express from 'express';

const router = express.Router();

router.use('/',(req,res)=>{
    res.json({
        message:"Your are api version 1"
    })
})

export default router;