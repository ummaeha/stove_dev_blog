const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./dbServer')
const port = process.env.PORT || 4000;

app.use(cors());

app.use(bodyParser.json());
app.use('/api', async (req, res)=> {
    const profile = await db.get(`/profile`)
    res.json({username:'Yasmine', profile:`${profile.data.name}`})
});

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})