const express = require('express');
const mysql = require('mysql');

//Create Connection
const db = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database: 'nodemysql'

});

//Connect
db.connect((err)=>{
	if(err)
		throw err;
	console.log('MySql Connected...');
})

const app = express();
//Create DB
app.get('/createdb',(req, res)=>{
	let sql= 'CREATE DATABASE nodemysql;';
	db.query(sql, (err, result) => {
		if(err) throw err;
		console.log(result);
		res.send('Database Created...');
	});
});

//Create Table
app.get('/createpoststable',(req, res)=>{
	let sql= 'CREATE TABLE posts(id int AUTO_INCREMENT, title varchar(255), body varchar(255), primary key (id));';
	db.query(sql, (err, result)=>{
		if(err) throw err;
		console.log(result);
		res.send('Posts table created...');
	});
});

//Insert post 1
app.get('/addpost1', (req, res)=>{
	let post = {title:'Post one', body:'This is post#1'};
	let sql='INSERT INTO posts SET ?';
	let query = db.query(sql, post, (err, result)=>{
		if(err) throw err;
		console.log(result);
		res.send('Post1 added...');
	});
});

//Insert post 2
app.get('/addpost2', (req, res)=>{
	let post = {title:'Post Two', body:'This is post#2'};
	let sql='INSERT INTO posts SET ?';
	let query = db.query(sql, post, (err, result)=>{
		if(err) throw err;
		console.log(result);
		res.send('Post2 added...');
	});
});

//Select posts
app.get('/getposts', (req, res)=>{
	let sql='SELECT * FROM posts';
	let query = db.query(sql, (err, results)=>{
		if(err) throw err;
		console.log(results);
		res.send('Posts retrieved...');
	});
});


//Select post
app.get('/getpost/:id', (req, res)=>{
	let sql=`SELECT * FROM posts where id=${req.params.id}`;
	let query = db.query(sql, (err, result)=>{
		if(err) throw err;
		console.log(result);
		res.send('Post retrieved...');
	});
});

//Update post
app.get('/updatepost/:id', (req, res)=>{
	let newTitle='Updated Title';
	let sql=`UPDATE posts SET title='${newTitle}' where id=${req.params.id}`;
	let query = db.query(sql, (err, result)=>{
		if(err) throw err;
		console.log(result);
		res.send('Post updated...');
	});
});

//Delete post
app.get('/deletepost/:id', (req, res)=>{
	let sql=`DELETE from posts where id=${req.params.id}`;
	let query = db.query(sql, (err, result)=>{
		if(err) throw err;
		console.log(result);
		res.send('Post deleted...');
	});
});

app.listen('3000',() =>{
	console.log('Server started on port 3000');
});