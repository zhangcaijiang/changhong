<?php
//利用头文件设置中文编码
header('content-type:text/html;charset=utf-8');
      header('Access-Control-Allow-Origin:*');//允许跨域的域名，*代表所有域名。
        header('Access-Control-Allow-Method:POST,GET');//允许跨域的请求的方式。
//1.php连接数据库
//$conn=new mysqli(主机,用户名,密码,数据库名称);
define('HOST','localhost');//主机 或者 127.0.0.1
define('USERNAME','root');//用户名
define('PASSWORD','');//密码
define('DBNAME','zcj');//数据库名称

$conn=@new mysqli(HOST,USERNAME,PASSWORD,DBNAME);//连接数据库
//@:容错处理，错误信息不显示。
if($conn->connect_error){//如果存在错误，输出错误。
    die('数据库连接错误,错误信息：'.$conn->connect_error);
}

$conn->query('SET NAMES UTF8');
// $sql="INSERT changhong VALUES(null,'http://images.changhong.com/chgw/gwsy/syds/201611/W020190702677474322234_160.png','55英寸 AI音响物联无边全面屏','开机物联电视 关机智能音箱','￥6997.00',NOW())";
// $conn->query($sql);//执行sql语句。

$result=$conn->query("select * from changhong");

$arr=array();
for($i=0;$i<$result->num_rows;$i++){
    $arr[$i]=$result->fetch_assoc();
}
echo json_encode($arr);