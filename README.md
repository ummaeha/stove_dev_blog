# stove_dev_blog
stove dev camp pretest

스마일게이트 스토브 데브 캠프 - 과제전형 (2번: 블로그 개발 (Database, Front-end))


내가 일을 정리하는 방법: https://proud-myself-yasmine.notion.site/2021-2-b06fcebd01554d7d831e72a1d4e9da0e

# 실행하는 방법
1. 본 레포지토리를 clone 받는다.
2. 터미널을 켜고 아래의 명령어를 차례로 실행한다.
```
cd backend
npm install
npm start

cd database
npm install
npm start

cd client-web 
npm install
npm start

```
3. http://localhost:3000/ 에 접속한다. 🥳

# 포트 정보
3000: Client Server(Reactjs)

4000: Nodejs Express Backend Server

4001: JSON-server, db.json


# client-web 디렉토리 및 페이지

- 디렉토리

client-web/pages : 페이지들이 저장되어있는 디렉토리

- 페이지와 주요 컴포넌트

1. *Main.js* : 메인페이지

2. *Create.js* : 새로운 글을 생성하는 페이지

3. *Post.js* : 개별 게시글의 상세내용 및 댓글이 있는 페이지

4. *Thread.js* : 댓글을 보여주는 컴포넌트 ( Post.js 의 자식컴포넌트 )

5. *ThreadWrite.js* : 새 댓글을 입력하는 컴포넌트 ( Thread.js의 자식 컴포넌트 )


# 아키텍쳐
![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ee72e6e5-b0fa-48ad-9cf6-184b85cfd69e/Untitled.png)


