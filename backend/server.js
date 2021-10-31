const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./dbServer')
const port = process.env.PORT || 4000;

app.use(cors());

app.use(bodyParser.json());
app.use('/api', async (req, res) => {
    res.json({username:'Yasmine'})
});

app.use('/posts', async(req,res) => {
    try {
        // db에서 조회해오고, 값이 있으면 그대로 리턴, 없으면 새로 삽입 후 삽입한 컬럼을 리턴;
        console.log(`GET /posts`)
        const { data }  = await db.get(`/posts`)//res.body.postId
        res.json({postdata: `${data}`})
        console.log(data)


    } catch (err) {
        console.log(err)
        res.status("400").json(err).end()
    }
})
app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})