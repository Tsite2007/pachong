var async=require("async");
var eventproxy=require('eventproxy');
var superagent=require('superagent');
var cheerio=require('cheerio');
var url=require('url');

var request = require('request');
var fs = require('fs');
var events = require("events");

var title='micoservice';
var mainUrl='https://nodelover.me/course/'+title;
var topic_urls=[];

var  cookie='EGG_SESS=i5zf542Hv3BQTf6rvkatyu08WyebIGxAw40hOKTMjrUDzho9ItpvHQLsvCTq2qh1r0lw9FYNsMGtgqdingBRnd90Z-wbcQ12zVTKH9sGfGgx1QkeiFQRLioty37N5DaQaBnywJz5wTCJmv4Nwt9UPqLC9ySwDwv6HsBq-BNE6NFPqWtjnuPEMmCB50hHbQOC32KxrOyWyD9v5Lhh_KQIIOAA2xMP6mnNdn7bvpL6acjUftzsqTZnirCpwfcSjxsjFjkOEDTw-M14QNGmQ10Ro3cKlQzGJr8G-mAiJ4sc3n28Bx34G9gGsFInICYg6sawZhBTSCnlphjUqenfvIRPx67KnBgADU_mLe0-3oPKJPDE5mIlE4wfNVC0F61pxvgFcMIYqZcE4uoxOeW1sTEpBTbpvWvxKuH2q8hc_RsHax9xbKSWHXAco9Zgj-gbsQ2Yx0FRmkKmvA5JeT2E-QyHNLjked2dzqL5fRkB9C3rCyGSql_KRE_GVhf4l8zTSlaYndIuqbJgehUuz6BXKc5FFIKD5IspM8qlAjUXqKXdGbMciy-c9v28I9IDaRI1jkmscfFCq-M3i69q_hkBq6CqUbY-dAKoUfzeMyxi6X4E_uFeYpR-N6TrzDKujAVHg0Yjy0AeO0wXQNqo0PD35ghGhG_jQCx9x6FQSjgxUdR50jKphf9ZLw_oz11biR9xj7j5EUH06WvJPgWGD3_EFoNEu2VH6iRj_wM2PKSkYr3t8xcDUt5h16qMFWuSEHk-cHowvMV5uWa4QGnEU2WXrJNIt0brlbOyD2DgSk8IKnOOPkdyvgEOMS1Yjz12gtV0ZfbnP9PseChjP8O982NW600GnG0bZNUsb8Hxvcg-cfTrTfVCPV-ALrSOmEkA_iHhi9ohVgn023rJSNLqx2UoH-fEuMO_cMFUaHoYeZTzeTfnbJDi8dH3FrIdGV9LBXI1ZJarA6htH12kTvMEhjanT3nEurJoVOWQx-Bx4kNIOvcDr0psOL5PmAd_QB0_CM9Ew6PoQCO4NYBQuLrkXZ_uGhPpBxKTegxrDopvAyqTUY2P4s947weHMkjnxWg_2WlxF4bj0JHNM3PXKEyeQEnmy7mYxA==; path=/; expires=Tues, 28 Aug  2019 10:53:59 GMT; httponly'
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
            console.log('===++++======++++=============',downUrl);
            
            callback(null,{name:fileName,url:downUrl});
        });
    },function(err,result){
        console.log("获取全部地址:"+result.length+'个');
        console.log(result);

        mkdir(title);
        for(let i=0;i<result.length;i++){
            const filename = title+'/' + result[i].name + '.mp4';
            downloadFile(result[i].url, filename, function() {
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
    if (!fs.existsSync(name)) {
        fs.mkdirSync(name);
    }
}
