<?php
	header("content-type:text/html;charset=utf-8");
	
	//设置数据库
	$db = mysql_connect("localhost","root","root");
	//连接数据库
	mysql_select_db("db1706",$db);
	//设置字符编码
	mysql_query("set names utf8");
?>