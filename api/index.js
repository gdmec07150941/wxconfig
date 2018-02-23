const request = require("request-promise");

// 用户关注，自动回复
const home = async(req, res) => {
    console.log(req.body.xml);
    let data = req.body.xml;
    if (data.msgtype === "event" && data.event === "subscribe") {
        data.content = "welcome to my wx_test, 请回复1";
        msgText(res, data);
    } else if (data.msgtype === "event" && data.event === "unsubscribe") {
        console.log("取消关注了");
    } else if (data.msgtype === "text" && data.content === "1") {
        data.content = "倪大爷,点这个看看http://snbin.free.ngrok.cc";
        msgText(res, data);
    } else {
        data.content = "hehe";
        msgText(res, data);
    }
}
const msgText = (res, data) => {
    let resMsg = `<xml>
    <ToUserName><![CDATA[${data.fromusername}]]></ToUserName>
    <FromUserName><![CDATA[${data.tousername}]]></FromUserName>
    <CreateTime>` + parseInt(new Date().valueOf() / 1000) + `</CreateTime>
    <MsgType><![CDATA[text]]></MsgType>
    <Content><![CDATA[${data.content}]]></Content>
    </xml>`
    res.end(resMsg);
}

module.exports = {
    home,
}