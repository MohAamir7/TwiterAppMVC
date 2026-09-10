import express from 'express';
import morgan from 'morgan'
import {PORT} from './Config/serverConfig.js'
import apiRoutes from './routes/apiRoutes.js';
const app = express();

// const router = express.Router()

app.use(morgan('combined'));

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use('/api',apiRoutes)

app.get('/hello', (req, res) => {
    console.log("query params", req.query);
    console.log("request body", req.body);

    return res.json({
        message: "world"
    });
});

app.get('/tweets/:tweet_id/comments/:comment_id', (req, res) => {
    console.log(req.params); // url params
    return res.json({
        message: 'tweet details'
    });
});
app.get('/', (req, res) => {
    return res.json({word:"hello"});
});

app.get('/home', (req, res) => {
    return res.status(200).json({
        message: "Welcome to home"
    });
});

app.get('/tweet',(req,res)=>{
    return res.status(200).json({
        message:"welcome to tweet page"
    })
})

app.use((req, res) => {
    return res.status(404).json({
        message: "Not Found"
    });
});

await app.listen(PORT);
console.log(`Server is running on port ${PORT}`);