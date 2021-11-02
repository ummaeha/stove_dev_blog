const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./dbServer')
// const posts = require("./posts")
const port = process.env.PORT || 4000;

app.use(cors());

app.use(bodyParser.json());
app.use('/api', async (req, res) => {
    res.json({username:'Yasmine'})
});
app.use(express.urlencoded({
    extended: true
}))

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
app.post('/posts', async (req, res) => {
    try {
        console.log("POST /posts")
        console.log(req.body);
        const {data} = await db.post("/posts", req.body)
        res.status("201").json({newPostdata: data}).end() // 201 == created
    } catch(err) {
        console.log(err.message)
        res.status("400").json(err).end()
    }
})
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