const path = require('path'); //引入Node.js下面的模块
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
    //通过选择 development 或 production 之中的一个，来设置 mode 参数，你可以启用相应模式下的 webpack内置的优化.
    mode: 'development',
    //入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。
    //指定网页程序的主模块,意思是整个网页的入口代码,所有代码都从这儿开始运行.
    entry: "./src/script/main.js",

    //output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist
    output: {
        path: path.resolve(__dirname, 'dist'), //拼接路径
        filename: "script/bundle.js" //设置路径和文件名
    },
    module: {
        rules: [{
                //加载jquery
                test: require.resolve('jquery'),
                use: [{
                        loader: 'expose-loader',
                        options: '$'
                    },
                    {
                        loader: 'expose-loader',
                        options: 'jQuery'
                    }
                ]
            },
            { //加载css
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },  
            { //配置图片文件的包
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]'
                }
            }    
            /* {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '../images/[name].[ext]'
                        }
                    }
                ]
            },
 */
        ],
       
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '淘宝购物车',
            filename: "index.html",
            template: "./src/index.html",
            chunks: ["index", "vendor"],
            minify: { //压缩html
                removeComment: true, //去掉注释
                collapseWhitespace: true //去掉空格。
            }
        }),
        new HtmlWebpackPlugin({
            title: '长虹购物车详情页',
            filename: "details.html",
            template: "./src/details.html",
            chunks: ["details", "vendor"],
            minify: { //压缩html
                removeComment: true, //去掉注释
                collapseWhitespace: true //去掉空格。
            }
        }),
        new HtmlWebpackPlugin({
            title: '长虹购物车展示列表',
            filename: "cartlist.html",
            template: "./src/cartlist.html",
            chunks: ["cartlist", "vendor"],
            minify: { //压缩html
                removeComment: true, //去掉注释
                collapseWhitespace: true //去掉空格。
            }
        }),
        new HtmlWebpackPlugin({
            title: '长虹首页头部',
            filename: "top.html",
            template: "./src/top.html",
            chunks: ["top", "vendor"],
            minify: { //压缩html
                removeComment: true, //去掉注释
                collapseWhitespace: true //去掉空格。
            }
        }),
        new HtmlWebpackPlugin({
            title: '淘宝首页尾部',
            filename: "bottom.html",
            template: "./src/bottom.html",
            chunks: ["bottom", "vendor"],
            minify: { //压缩html
                removeComment: true, //去掉注释
                collapseWhitespace: true //去掉空格。
            }
        }),
        new HtmlWebpackPlugin({
            title: '长虹登录页面',
            filename: "login.html",
            template: "./src/login.html",
            chunks: ["login", "vendor"],
            minify: { //压缩html
                removeComment: true, //去掉注释
                collapseWhitespace: true //去掉空格。
            }
        }),
        new HtmlWebpackPlugin({
            title: '长虹注册页面',
            filename: "registry.html",
            template: "./src/registry.html",
            chunks: ["registry", "vendor"],
            minify: { //压缩html
                removeComment: true, //去掉注释
                collapseWhitespace: true //去掉空格。
            }
        }),
        new CopyWebpackPlugin([{
            from: __dirname+"/src/images",
            to: __dirname + "/dist/images"
        }
        ]),

    
    
    ]
}