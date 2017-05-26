<?php
	
	$mobile=$_POST["mobile"];
	$pwd=$_POST["pwd"];
	//服务器接收客户端提交的数据
	 

	//服务器接收到客户端的数据之后，开始操作数据库了---将接收到的数据存入到某个数据库的某个表中
	
	//设置数据库
	//连接数据库
	//设置字符编码
	//导入外部的php文件
	include "public.php";	
	//编写sql语句
	$sql = "insert into userinfo(id,name,password) values('','$mobile','$pwd')";
	
	//执行sql语句
	$res = mysql_query($sql);

?>