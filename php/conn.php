<?php
header('content-type:text/html;charset=utf-8');
//1.连接数据库
define('HOST','localhost');
define('USERNAME','root');
define('PASSWORD','');
define('DBNAME','zcj');
$conn=@new mysqli(HOST,USERNAME,PASSWORD,DBNAME);
//@符号：容错上面的错误，下面自定义了报错信息
if($conn->connect_error){
    die('数据库连接失败:'.$conn->connect_error);//die函数：输出括号里面的内容，并退出。
}