import http from "http";
import qs from "querystring";
import mysql from "mysql";

const server = http.createServer(function (request, response) {
  // 최초접속
  if (request.method === "GET" && request.url === "/") {
    response.writeHead(200);
    response.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>POST</title>
      <meta charset="utf-8">
    </head>
    <body>
      <form action="/post_test" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
        <p><textarea name="description" placeholder="description"></textarea></p>
        <p><input type="submit"></p>
      </form>
    </body>
    </html>
    `);
  } 
  else if (request.method === "POST" && request.url === "/post_test") {
    let body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      let post = qs.parse(body);
      console.log(post.title);
      console.log(body);
      let title = post.title;
      let description = post.description;
      response.end(`
      <!doctype html>
      <html>
      <head>
        <title>POST</title>
        <meta charset="utf-8">
      </head>
      <body>
        <p>title : ${title}</p>
        <p>description : ${description}</p>
      </body>
      </html>
      `);
      const conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "0516",
        database: "my_db",
      });
      conn.connect();

      // SQL에 들어갈 값을 정의하는 공간이다.
      // insert into test4- tes4라는 테이블에 넣겠다.
      // test4(tit,des) test4라는 테이블에 tit, des 행을 넣는다.
      // values 
      let sql = 'insert into test4(tit, des) values("      ' + post.title + '  "   ,"   ' + post.description + '  ")'; 
      
      conn.query(sql, function(err, rows, fields) {
        if(err) {
          console.log(err);
        }
        console.log(rows);
      })
      conn.end();
    });
  }
  else {
    response.writeHead(404);
    response.end("Not Found");
  }
  
});
// 서버 포트 설정
server.listen(2070, function (error) {
  if (error) {
    console.error("서버 안돌아감");
  } else {
    console.log("서버 돌아감");
  }
});