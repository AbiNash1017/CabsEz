const dotenv=require('dotenv');
dotenv.config();

const connectToDb=require('./db/database');
connectToDb();

const express=require('express');

/*cors:for cross origin resource sharing so that when we move to production it only accepts requests from our server */ 
const cors=require('cors');

const userRoutes=require('./routes/user.routes');
const captainRoutes=require('./routes/captain.routes');
const mapsRoutes=require('./routes/maps.routes');
const rideRoutes=require('./routes/ride.routes');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(userRoutes);
app.use(captainRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.use('/users',userRoutes);
app.use('/captains',captainRoutes);
app.use('/maps',mapsRoutes);
app.use('/rides',rideRoutes);


module.exports = app;