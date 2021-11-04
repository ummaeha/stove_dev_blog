const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./dbServer')
const port = process.env.PORT || 4000;

app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


app.use(bodyParser.json());
app.use('/api', async (req, res) => {
    res.json({username:'Yasmine'})
});
app.use(express.urlencoded({
    extended: true
}))

// 전체 post들을 불러옴
app.get('/posts', async(req,res) => {
    try {
        console.log(`GET /posts`)
        const { data }  = await db.get(`/posts`)//res.body.id
        res.json({postdata: data})
    } catch (err) {
        console.log(err)
        res.status("400").json(err).end()
    }
})

// post들을 id에 따라 불러옴
app.get('/posts/:id', async(req,res) => {
    try {
        console.log(`GET /posts/${req.params.id}`)
        const { data }  = await db.get(`/posts?id=${req.params.id}`)
        res.status("201").json({postDetail: data}).end()
    } catch (err) {
        console.log(err)
        res.status("400").json(err).end()
    }
})

// 새 글 생성 (by, Add POST 버튼)
app.post('/posts', async (req, res) => {
    try {
        console.log("POST /posts")
        // console.log(req.body);
        const {data} = await db.post("/posts", req.body)
        res.status("201").json({newPostdata: data}).end() // 201 == created
    } catch(err) {
        console.log(err.message)
        res.status("400").json(err).end()
    }
})

// 글 쓰기 수정기능
app.put('/posts', async (req, res) => {
    // console.log(req.body);
    try {
        console.log(`PATCH /posts/${req.body.id}`)
        const { data } = await db.patch(`/posts/${req.body.id}`, req.body)
        // res.send({data})
        // console.log(data);
        res.status("200").json(data).end()
    } catch(err) {
        console.log(err.message)
        res.status("400").json(err).end()
    }
})

// TO DO: (미완성) 삭제 기능
// => db에 delete메소드가 작동하지 않아서, 1. Posts들을 get해오고, 2. postid가 동일하지 않은 데이터만 filter 해서 3. 다시 업데이트하는 방식을 시도해봤으나 잘 안됨.

// app.delete('/posts/:postId', async (req, res) => {
//     // console.log(req.body);
//     try {
//         console.log(`DELETE /posts/${req.params.postId}`)
//         const {data} = await db.get(`/posts`)
//         // console.log(data);
//         await db.delete()
//         const newData = data.filter((datum) => {
//             return datum.id != `${req.params.postId}`
//         })
//         res.status("200").json(newData).end()

//     } catch(err) {
//         console.log(err.message)
//         res.status("400").json(err).end()
//     }
// })

// postid와 맞는 댓글을 불러옴
app.get('/thread/:id', async(req,res) => {
    try {
        console.log(`GET /thread/${req.params.id}`)
        const { data } = await db.get(`/thread?postId=${req.params.id}`)
        res.status("201").json({threadData: data}).end() 
    } catch (err) {
        console.log(err)
            res.status("400").json(err).end()
    }
})

// 새 댓글 생성하기
app.post('/thread/:id', async(req,res) => {
    try {
        console.log(`POST /thread/${req.params.id}`)
        const { data } = await db.post(`/thread?postId=${req.params.id}`, req.body)
        res.status("201").json({newThreadData: data}).end() 
    } catch (err) {
        console.log(err)
        res.status("400").json(err).end()
    }
})

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})