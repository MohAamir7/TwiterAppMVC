import express from 'express';

const router = express.Router();

router.use('/',(req,res)=>{
    res.json({
        message:"Your are api version 2"
    })
})

export default router;