const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require('../config/db')
const port = process.env.PORT || 4000;
 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// DB가 연결되었는지 확인 -> 백엔드 서버 켠 곳 콘솔에 로그 메시지가 뜨는지 확인!
db.connect((err) => {
    if(err) throw err;
    console.log('Connected with MySQL2');
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

app.get('/posts', (req,res) => {
    const sql = 'SELECT * FROM posts'
    db.query(sql, (err, result, fields) => {
        if(err) throw err;
        else res.send({postData: result});
    })
})
 
app.get('/posts/:id', async (req,res) => {
    const postId = req.params.id;
    // console.log(req);
    // res.send(req.params)
    const sql = `SELECT * FROM posts WHERE id = ${postId}`
    await db.query(sql, (err, result, fields) => {
        if(err) throw err;
        else res.send({postDetail: result});
    })
})

module.exports = app;
