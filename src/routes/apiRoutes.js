import express from 'express';
// import Router  from 'router';
import apiV1 from './V1/apiV1.js'
import apiV2 from  './V2/apiV2.js'
const router = express.Router();

router.use('/v1',apiV1);

router.use('/v2',apiV2)


export default router;