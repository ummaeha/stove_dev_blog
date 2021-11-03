const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./dbServer')
// const posts = require("./posts")
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
app.put('/posts', async (req, res) => {
    console.log(req.body);
    try {
        console.log(`PATCH /posts/`)
        const { data } = await db.patch(`/posts/${req.body.postId}`, req.body)
        // res.send({data})
        console.log(req.body);
        res.status("200").json(data).end()
    } catch(err) {
        console.log(err.message)
        res.status("400").json(err).end()
    }
})
app.delete('/posts/:id', async (req, res) => {
    try {
        console.log(`DELETE /posts/${req.params.id}`)
        const { data } = await db.get(`/posts/${req.params.id}`)
        console.log(req);
        
        let [filteredData] =data.filter((datum) => {
            return datum.id != `${req.params.id}`
        })
        // // console.log(filteredData);
        // // await db.delete('/posts')
        const { finalData } = await db.patch(`/posts`, filteredData )
        // res.send(finalData)
        res.status("201").json({deletedData: finalData}).end()
        // await db.delete(`/posts?id=${req.params.id}`)
        // const { data } = await db.get(`/posts?id=${req.params.id}`)
        // console.log(data);
        // res.status("201").json({deletedData: data}).end() // 201 == created
        // res.send([{title:'dummy'},{title:'dummy2'}])
    } catch(err) {
        console.log(err.message)
        res.status("400").json(err).end()
    }
})

// server.delete('/posts/:id', (req, res) => {
//     // lowdb를 사용해서 db.json에서 completed: true인 todo를 제거
//     lowdb.get("/posts").remove({id: `${req.params.id}`}).write();
  
//     // todos를 응답
//     res.send(lowdb.get("todos").value());
//   });
// app.put('/posts/:id', async (req, res) => {
//     try {
//         console.log(`PATCH /posts/${req.params.id}`)
//         console.log(req.body);
//         // const {data} = await db.post("/posts", req.body)
//         // res.status("201").json({newPostdata: data}).end() // 201 == created
//     } catch(err) {
//         console.log(err.message)
//         res.status("400").json(err).end()
//     }
// })
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