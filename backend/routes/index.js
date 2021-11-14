const express = require('express');
const app = express();
const cors = require("cors");
// const bodyParser = require("body-parser");
const db = require('../config/db')
const port = process.env.PORT || 4000;
 
/*
    - POST 요청의 결과를 express.js에서 처리하기위해서는 body-parser 모듈이 필요함
    - 이 body-parser를 미들웨어로 설정하는 코드
    - app.use(bodyParser.urlencoded({ extended: true }));
    - app.use(bodyParser.json());

    => 찾아보니 express 버전 4.16부터는 body-parser없이 자체적으로 지원함(지금은 4.17버전임)
*/

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
    const postId = req.params.id;

    console.log(`GET /posts/${postId}`)
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
    const postId = req.body.id;
    console.log(`PATCH /posts/${postId}`)

    const sql = `UPDATE posts SET ? WHERE id = ${postId}`
    db.query(sql, req.body, (err, result) => {
        if(err) throw err;
        else res.send(`글을 수정했습니다.`)
    })
})

//글 삭제 기능 (개별 포스에서 삭제하기)
app.delete('/posts/:id', (req, res) => {
    const postId = req.params.id;
    console.log(`DELETE /posts/${postId}`);

    const sql = `DELETE FROM posts WHERE id = ${postId}`
    db.query(sql, (err, result) => {
        if(err) throw err;
        else res.send('글이 삭제되었습니다.')
    })
})
// TO DOs
// 선택 글 삭제 기능 (모든 포스트 페이지에서 checkbox로 선택한 게시글의 id를 받아와서 선택삭제하는기능 구현하기)
app.delete('/posts', (req, res) => {
    // const postId = req.params.id;
    // console.log(`DELETE /posts/${postId}`);
    console.log(req.body);
    const [data] = req.body

    const sql = `DELETE FROM posts WHERE id in (${data})`
    db.query(sql, (err, result) => {
        if(err) throw err;
        else res.send('글이 삭제되었습니다.')
    })
})
// thread -  id별로 get
app.get('/thread/:id', (req,res) => {
    const postId = req.params.id;

    console.log(`GET /thread/${postId}`)
    const sql = `SELECT * FROM thread WHERE postId = ${postId}`
    db.query(sql, (err, result) => {
        if(err) throw err;
        else res.send({threadData: result});
    })
})

// thread - post
app.post('/thread/:postId', (req, res) => {
    const postId = req.params.postId;
    console.log("POST /thread")
    console.log(postId);
    const sql = `INSERT INTO thread SET ?`
    db.query(sql, req.body, (err, result) => {
        if(err) throw err;
        else res.send('새 글을 등록 완료했습니다')
    })
})
// TO DOs: 사용자별 권한을 주고나서 해야할 일
// thread - put

// thread - delete


module.exports = app;
