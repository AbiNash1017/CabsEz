const dotenv=require('dotenv');
dotenv.config();

const connectToDb=require('./db/database');
connectToDb();

const express=require('express');

/*cors:for cross origin resource sharing so that when we move to production it only accepts requests from our server */ 
const cors=require('cors');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/buntu',(req,res)=>{
    console.log('buntu');
    res.send(`the myth is lost in time`);
})


module.exports = app;