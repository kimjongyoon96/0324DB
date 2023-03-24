import mysql from 'mysql';

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0516",
  database: "my_db",
});

connection.connect();

// let sql = 'insert into test(tit, des) values("' + post.title + '","' + post.description + '")'; 
let sql = 'select * from test3';
connection.query(sql, function (err, rows, fields) {
  if (err) {
    console.log(err);
  }
  console.log(rows);
})
connection.end();
 