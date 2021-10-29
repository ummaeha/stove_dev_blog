// json-server 설정
const jsonServer = require('json-server')
const server = jsonServer.create();
const path = require('path');
const router = jsonServer.router(path.json('../database', 'db.json'));
const middlewares = jsonServer.defaults(); 

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(router)

server.listen(port, () => {
    console.log(`JSON server is running, port(${port})`)
})