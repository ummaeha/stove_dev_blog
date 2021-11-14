const express = require('express');
const app = express();
const cors = require("cors");
// const bodyParser = require("body-parser");
const db = require('../config/db')
const port = process.env.PORT || 4000;
 
// POST 요청의 결과를 express.js에서 처리하기우ㅟ해서는 body-parser 모듈이 필요함
// 이 body-parser를 미들웨어로 설정하는 코드
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// 찾아보니 express 버전 4.16부터는 body-parser없이 자체적으로 지원함(지금은 4.17버전임)
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads
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

app.listen(port, ()=>{
    console.log(`Connect at http://localhost:${port}`);
})

// DB에서 전체 post들을 불러오는 요청 (Main.js) 
app.get('/posts', (req,res) => {
    console.log("GET /posts")
    const sql = 'SELECT * FROM posts'
    db.query(sql, (err, result) => {
        if(err) throw err;
        else res.send({postData: result});
    })
})

// DB에서 id별 post들을 불러오는 요청 (Post.js) 
app.get('/posts/:id', (req,res) => {
    console.log("GET /posts/:id")
    const postId = req.params.id;
    const sql = `SELECT * FROM posts WHERE id = ${postId}`
    db.query(sql, (err, result) => {
        if(err) throw err;
        else res.send({postDetail: result});
    })
})

// 새 글 생성 (by, Add POST 버튼)
app.post('/posts', (req, res) => {
    console.log("POST /posts")
    const sql = `INSERT INTO posts SET ?`
    db.query(sql, req.body, (err, result) => {
        if(err) throw err;
        else res.send('새 글을 등록 완료했습니다')
    })
})

// 글 쓰기 수정기능 (by, save post 버튼)
app.put('/posts', (req, res) => {
    console.log("PATCH /posts")
    const postId = req.body.id;

    const sql = `UPDATE posts SET ? WHERE id = ${postId}`
    // console.log(req.body);
    db.query(sql, req.body, (err, result) => {
        if(err) throw err;
        else res.send(`글을 수정했습니다.`)
    })
})
module.exports = app;
