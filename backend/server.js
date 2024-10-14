const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const loginRoutes = require('./routes/loginRoutes');
const getDataRoutes = require('./routes/getDataRoutes');
const postsecret = require('./routes/postSecret')
const authMiddleware = require('./routes/authMiddleware');
const bodyParser = require('body-parser');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000

app.use(cors({origin : 'https://whisperwall.netlify.app'}));
app.use(express.json()); 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/api', authRoutes);
app.use('/api', loginRoutes);
app.use('/api', getDataRoutes);
app.use('/api', postsecret);



mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));



app.get('/', (req,res)=>{
    res.send('hello this is the Whisper Wall Backend')
})

app.listen(PORT,() =>{
    console.log(`server is running on PORT ${PORT}`);
    
})