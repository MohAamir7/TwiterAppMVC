import express from 'express';
import tweets from './tweets.js'
import comments from './comments.js'

const router = express.Router();

router.use('/tweets',tweets)
router.use('/comments',comments)

router.use('/',(req,res)=>{
    res.json({
        message:"Your are api version 2"
    })
})

export default router;