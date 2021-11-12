const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require('../config/db')
const port = process.env.PORT || 4000;
 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

db.connect((err) => {
    if(err) throw err;
    console.log('Connected with MySQL2');
    // const sql = `SELECT * FROM posts`
    // db.query(sql, (err, result) => {
    //     if(err) throw err;
    //     console.log('user table created');
    //     console.log(result);
    // })

})

// http://localhost:4000/ 으로 접속 시 응답메시지 출력
app.get('/', (req, res) =>{
    res.send('연결됐는지 테스트하는중')
})

app.post("/id", (req,res)=>{
    const serverid = req.body.id;
    console.log(serverid);
});

app.listen(port, ()=>{
    console.log(`Connect at http://localhost:${port}`); // '가 아닌 좌측상단의 esc버튼 밑의 `다.
})

app.get('/test', (req,res) => {
    const sql = 'SELECT * FROM posts'
    db.query(sql, (err, result, fields) => {
        if(err) throw err;
        else res.send(result);
    })
})
 
module.exports = app;
