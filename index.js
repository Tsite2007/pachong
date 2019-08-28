var async=require("async");
var eventproxy=require('eventproxy');
var superagent=require('superagent');
var cheerio=require('cheerio');
var url=require('url');

var request = require('request');
var fs = require('fs');
var events = require("events");

var  cookie='EGG_SESS=i5zf542Hv3BQTf6rvkatynJiS66skgbrkKghhWmNo-DaH0mnxMYTHj3fFnKPfYIWPjk1hJ7QHquNWTgaP6W8xa6uIeh9o9lzeG9hhtOxvFwF7w3Oa1HBuqxzhmKxDDzGsLOzSpQyc4Bp4dJzCOjbhH-KRetdXx1NsEWdFt_3AXu_7gGUNK-NssNkrRMQW1yiZpRyYYo9IZGfMV_xEkBYWSDAYsHSaXAvZFz0HUjQJciv8_rBELsDE_XiV2-qjpLvpdYPUmAInnHLmDNBLxhT9PjnM1tC0NG_ofJ-er5PmbDxI1sivT9leFBvHgtJ-KIW3GG2514xTONWnWEIp618LxKZTp5HuDI5IbzEsyuqOGccyGBjHisQkuIzqKdMwoKOcxWluyASvOYMGidiZaia_D5Pgx5X9DozVoqBEZ5TRbnIoEIxKQC5iC6VW0q8MIMkSCaq2UFhz3PEdLHkAvTmWlZgf_vpr9brigwDIhKdJZODD7wqHV4EEg8Qk2lmmQnxdLS_BGXcucirJqpJJAxJUhmChCQpNHkxM5Hq-H4gfkblBR8MuHcA_qoSC1UjeC2lKjFFzpm3nA0u4yBeB0rjDSrQnU0Iq2T9WBUoamAKuqyQwwzTLau9WWIKmY6vUa0vEN-F-9tMEQV26eN2mfeTuFJlk4QuFDIn31snpSqE5IrMriD4ee5hRAy6RdUjH6W_Ep2L9Hny4H6RkhAHnvCknh1TFeCWzkfnPBs33M48CAzJrQhRPmz-1q0aVl4of-C8RgyaACiSdI7fDasMhX-_1aDSBtyh5RLYahKDE9-HxqX36i6AS-8QMlxVMD-t9RJD84lY9CIVRylWwTO3irQBWvxxxzmYFdX3wNwDMjE6sXCaqGl51E-kNrdF6jHFsU4dQUEcZxZcdi73GjLCukI2YYWI3a4ofvdt7k1OFvXelrS0unJc3x2g7XrjC5VK_dtgTyWPLjaNJtOeioWGQQtB14M3PPVnXYNDjQjDQTwidDINFA-1rhxv2EjDLWe1t60vwDTvv4wuhlwyH2u3JLRU0hCkxRf58O0z4FbvTVjs9uYCZ8yp4HTgaoJECdS8fbxlpbVH9Qn9yOX7thkwygg7xQ==; path=/; expires=Tues, 28 Aug  2019 10:53:59 GMT; httponly'
//前端
var corseList1 = [
    'csharp',
    'css-grid',
    'algolia',
    'text-editor',
    'css-flex',
    'css3',
    'pwa',
    'popmotion',
    'js-sort',
    'vue-router-source',
    'vuex-source',
    'lodashfn',
    'css-pure',
    'postcss',
    'rx',
    'mobx',
    'ts-basic',
    'vue-advance-2',
    'stylus',
    'react-todo',
    'ts-design',
    'webpack-simple',
    'js-async',
    'es6',
    'css-basic',
    'typescript-data-structure',
    'rework',
    'vue-admin-app',
    'egret-1',
    'canvas',
    'js-start-2',
    'js-start-1',
    'vue-drop',
    'bulma',
    'codepen',
    'vue-router',
    'vuex',
    'tiny-vue',
    'ng',
    'functional-programer',
    'lodash-1',
    'regexp',
    'imovie-static',
    'gulp',
    'react-todo-redux',
    'chrome',
    'react-basic',
    'vue-advance-1',
    'vue-blog',
    'vue-basic',
    '90-minutes-in-html',
    'svelte-introduction-guide'
]
let corseList2 = [
    'openresty',
    'micoservice',
    'openssl',
    'live-demo',
    'catchter-package',
    'blockchain',
    'electron-builder',
    'k8s-node',
    'own-generator',
    'webpack-4',
    'web-sign',
    'oauth2',
    'api-test',
    'compile',
    'js-shizhan',
    'egg-scripts',
    'egg-source',
    'egg-core',
    'jenkins',
    'go-basic',
    'docker',
    'gql',
    'queue',
    'vue-hackernews',
    'db-design-1',
    'nodejs2',
    'py-oop',
    'websocket',
    'python-1',
    'rust-noder',
    'vue-ssr',
    'npm-packages',
    'node-xmly-mp3-crawler',
    'koa-todo',
    'electron-api-tutorial',
    'elasticsearch',
    'dart-lang',
    'python-patterns',
    'stream',
    'pets-shop',
    'image-mini',
    'egg-di',
    'mini-generator',
    'oclif',
    'pug',
    'node-test',
    'doc-static',
    'protect-js',
    'passport',
    'linux-basic',
    'egg-init',
    'egg-bin',
    'rabbitmq',
    'ts-data-design',
    'daocloud',
    'ioc',
    'rust-basic',
    'middleware',
    'db-design-2',
    'sequelize',
    'nodejs',
    'electron-prictice',
    'config-file',
    'imovie-backend',
    'cli-play',
    'egg-example',
    'rust-start',
    'deploy-ghost',
    'deep-into-koa'

]
var title= corseList1[6];
var mainUrl='https://nodelover.me/course/'+title;
var topic_urls=[];



var emitter = new events.EventEmitter()

setCookeie ();
emitter.on("setCookeie", getTitles)            //监听setCookeie事件

function setCookeie () {
    // 获取 _xrsf 值和cookie
    superagent.get('https://nodelover.me/login').end(function(err, res){
        if(err){
            return console.error(err);
        }
        var initCookie = res.headers['set-cookie'].join(',').match(/(EGG_SESS=.+?);/)[1];
        var $=cheerio.load(res.text);
        var csrf=$('input[name=_csrf]').val();
        superagent.post('https://nodelover.me/login')
            //.type("form")
           // .set('Content-Type','application/x-www-form-urlencoded')
            //.set('Origin',"https://nodelover.me")
            .set('Cookie',initCookie)
            //.set('Referer',"https://nodelover.me/login")
            //.set('Host',"nodelover.me")
            //.set('Upgrade-Insecure-Requests',"1")
            //.set('User-Agent',"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36")
            .send({
                email:'qingkeshang@163.com',
                password:"Sqk940312",
                _csrf:csrf})
            .end(function(err, res2){
                console.log('错误：');
                console.log(err);
                // console.log('结果：');
                // console.log(res2);
                if (err) throw err;
                var cookie = res.headers['set-cookie']             //从response中得到cookie
                emitter.emit("setCookeie", cookie)})
    });
}

function getTitles (cookie) {
    console.log(cookie);
};


superagent.get(mainUrl).end(function (err,sres) {
    if(err){
        return console.error(err);
    }
    var $=cheerio.load(sres.text);
    
    $('.video-list a').each(function (idx, element) {
        var $element = $(element);
        var name=$element.text().trim();
        
        var myUrl=$element.attr('href');
        topic_urls.push({name:name,url:'https://nodelover.me'+myUrl});
    });
    title=$('.title.is-4').eq(0).text();
    async.mapLimit(topic_urls,2,function(value,callback){
        superagent.get(value.url).set("Cookie", cookie).end(function (err,sres) {//话题页
            if(err){
                return console.error(err);
            }
            var $=cheerio.load(sres.text);
            
            var fileName=value.name;
            var downUrl="https:"+$('source').attr('src');
            
            callback(null,{name:fileName,url:downUrl});
        });
    },function(err,result){
        console.log("获取全部地址:"+result.length+'个');
        console.log(result);

        mkdir(title);
        for(let i=0;i<result.length;i++){
            const filename = title+'/' + result[i].name + '.mp4';
            downloadFile(result[i].url, './downLoad/'+filename, function() {
                console.log('Success: ' + filename + ' 下载完成！');
            });
        }
    });
});
function downloadFile(uri, filename, callback){
    var stream = fs.createWriteStream(filename);
    request(uri).pipe(stream).on('close', callback);
}
function mkdir(name) {
    let filePath = './downLoad/'+name
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
    }
}
