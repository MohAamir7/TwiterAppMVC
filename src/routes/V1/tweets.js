import express from 'express';
import {getTweet, getTweetById,createTweet} from '../../controller/tweetController.js'
import {zodSchema} from '../../validator/tweetZodSchema.js'
import { validate } from '../../validator/zodValidator.js';

const router = express.Router();

router.get('/',getTweet);
// router.get('/',(req,res)=>{
//     return res.json({
//         message:"Welcome to tweet route"
//     })
// })

    router.get('/:id',getTweetById)
// router.get('/:id',(req,res)=>{
//     return res.json({
//         message:"Welcome to tweet route",
//         id:req.params.id
//     })
// })

    router.post('/',validate(zodSchema),createTweet);

export default router;