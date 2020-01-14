<?php

include "conn.php";

if(isset($_POST['username'])){
    $user=$_POST['username'];
    $result=$conn->query("select * from register where username='$user'");//如果存在结果，注册的用户名存在。
    if($result->fetch_assoc()){//存在
        echo true;//显示1
    }else{
        echo false;//空隙
    }
}


if(isset($_POST['submit'])){
    $username=$_POST['username'];
    $password=sha1($_POST['password']);//后端加密
    $email=$_POST['email'];

    $conn->query("insert register values(null,'$username','$password','$email',NOW()) ");
    header('location:http://10.31.152.12/changhong/src/login.html');//php页面的跳转。
}