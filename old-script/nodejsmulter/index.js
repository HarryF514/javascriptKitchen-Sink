var express = require('express')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
if(typeof require !== 'undefined') XLSX = require('xlsx');
var app = express();
var path = require('path');
var formidable = require('formidable');
var uploadfoldername = '/uploads';
var uploadfolderpath = path.join(__dirname, uploadfoldername);
var fs = require('fs');
app.post('/profile', upload.single('avatar'), function (req, res, next) {
    var workbook = XLSX.readFile(req.file.path);
    var sheet_name_list = workbook.SheetNames;
    console.log(sheet_name_list);
})


app.post('/uploadexcel', function (req, res, next) {
    console.log('定位到 /upload 路由');

    // 使用第三方的 formidable 插件初始化一个 form 对象
    var form = new formidable.IncomingForm();

    // 处理 request
    form.parse(req, function (err, fields, files) {
        if (err) {
            return console.log('formidable, form.parse err');
        }

        var item;

        // 计算 files 长度
        var length = 0;
        for (item in files) {
            length++;
        }
        if (length === 0) {
            console.log('files no data');
            return;
        }
        console.log('files item' + files.length);
        for (item in files) {
            console.log('files item' + files.length);
            var file = files[item];
            // formidable 会将上传的文件存储为一个临时文件，现在获取这个文件的目录
            var tempfilepath = file.path;
            var workbook = XLSX.readFile(tempfilepath);
            var sheet_name_list = workbook.SheetNames;
            console.log(sheet_name_list);
            // 获取文件类型
            var type = file.type;

            // 获取文件名，并根据文件名获取扩展名
            var filename = file.name;
            var extname = filename.lastIndexOf('.') >= 0
                ? filename.slice(filename.lastIndexOf('.') - filename.length)
                : '';
            // 文件名没有扩展名时候，则从文件类型中取扩展名
            if (extname === '' && type.indexOf('/') >= 0) {
                extname = '.' + type.split('/')[1];
            }
            // 将文件名重新赋值为一个随机数（避免文件重名）
            filename = Math.random().toString().slice(2) + extname;

            // 构建将要存储的文件的路径
            var filenewpath = path.join(uploadfolderpath, filename);
            console.log(filenewpath);


            // 将临时文件保存为正式的文件
            fs.rename(tempfilepath, filenewpath, function (err) {
                // 存储结果
                var result = '';

                if (err) {
                    // 发生错误
                    console.log('fs.rename err ' + err.toString());
                    result = 'error|save error';
                } else {
                    // 保存成功
                    console.log('fs.rename done');
                    // 拼接图片url地址
                }
                fs.unlink(filenewpath);
                // 返回结果

            }); // fs.rename
        } // for in
    });
})

app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
})

var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
app.post('/cool-profile', cpUpload, function (req, res, next) {
    // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
    //
    // e.g.
    //  req.files['avatar'][0] -> File
    //  req.files['gallery'] -> Array
    //
    // req.body will contain the text fields, if there were any
});

app.listen(3530, function () {
    console.log('Node app is running, port:', 3530);
});
