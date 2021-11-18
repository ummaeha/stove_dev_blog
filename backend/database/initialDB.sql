CREATE SCHEMA StoveBlog;
USE StoveBlog;

CREATE TABLE users ( 
    id INT NOT NULL AUTO_INCREMENT, 
    name VARCHAR(20) NOT NULL, 
    email VARCHAR(32) NOT NULL, 
    PRIMARY KEY(id)
) DEFAULT CHARSET=utf8, ENGINE=InnoDB;

CREATE TABLE posts ( 
    id INT NOT NULL AUTO_INCREMENT, 
    userId INT NOT NULL, 
    title VARCHAR(32) NOT NULL, 
    contents TEXT NOT NULL, 
    timeStamp DATETIME NOT NULL DEFAULT now(), 
    PRIMARY KEY(id), 
    FOREIGN KEY (userId) 
    REFERENCES StoveBlog.users (id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
) DEFAULT CHARSET=utf8 ENGINE=InnoDB;

CREATE TABLE thread ( 
    id INT NOT NULL AUTO_INCREMENT, 
    postId INT NOT NULL, 
    threadContents VARCHAR(100) NOT NULL, 
    userId INT NOT NULL, 
    timeStamp DATETIME NOT NULL DEFAULT now(), 
    PRIMARY KEY(id), 
    FOREIGN KEY (postId) REFERENCES StoveBlog.posts (id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
) DEFAULT CHARSET=utf8 ENGINE=InnoDB;


INSERT INTO StoveBlog.users (name, email) VALUES ('Yasmine','raya000@naver.com');


INSERT INTO StoveBlog.posts (title, userId, contents) VALUES ('첫 번째 포스트', 1, '오늘은 자바스크립트 ES6+에 대해서 포스팅 해보도록 하겠습니다.');

INSERT INTO StoveBlog.posts (title, userId, contents) VALUES ('두 번째 포스트', 1, '오늘은 nodejs에 대해서 포스팅 해보도록 하겠습니다.');

INSERT INTO StoveBlog.posts (title, userId, contents) VALUES ('세 번째 포스트', 1, '애플워치 5 GPS 모델 가격 : 택스 미포함 299 달러 ( 포함하면 330달러 정도 ! 원래는 399달러인데, 할인할때 샀다. 299까지는 종종 할인함 ) 장점 5가지 1) 일정관리 - 보통 시리페이스 사용  시리페이스 장점 : 완벽한 일정관리 가능 애플 캘린더와 연동되어 일정 시간, 제목, 주최자, 장소등의 정보를 제공해준다. 꿀팁 ! 애 플 캘린더는 구글 계정과도 연동되기때문에, 회사 계정을 연결해놓으면 회의등 일정을 잊지않고 참여할 수 있다.');


