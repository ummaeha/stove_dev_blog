const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require('path');
const router = jsonServer.router(path.json('../database', 'db.json'));
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 4000;

// // db.json를 조작하기 위해 lowdb 사용
// const low = require("lowdb");
// const FileSync = require("lowdb/adapters/FileSync");
// const adapter = new FileSync("../database/db.json");
// const db = low(adapter);

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
server.use(jsonServer.bodyParser); // body 작성이 필요한 요청에 사용될 미들웨어
/*-------------여기에 Custom 라우터를 작성해준다--------------*/
server.get('/posts', async (req, res) => {
  try {
    console.log('GET /posts');
    const posts  = await db.get(`posts`)//res.body.id
    res.json({postdata: posts})
  }
  catch(err) {
    console.log(err.message);
    res.status("4xx").json(err).end()
  }
})
// server.delete(`/posts/:postId`,(req, res) => {
//   try {
//     console.log(`DELETE /posts/${req.params.postId}`);
    
//   }

// })
// Use default router
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on ${port}`);
});