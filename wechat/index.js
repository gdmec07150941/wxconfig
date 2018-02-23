const crypto = require("crypto");
const verifyInfo = require("../config/verifyInfo");

/**
 * 微信接入认证
 */
module.exports = async(req, res) => {
    console.log(req.query);

    // 1.获取微信服务器发送GET请求的参数:微信加密签名、随机字符串、时间戳、随机数
    let {
        signature,
        echostr,
        timestamp,
        nonce
    } = req.query;

    // 2.将token、timestamp、nonce三个参数进行字典排序
    let arr = [verifyInfo.token, timestamp, nonce].sort();

    // 3.将排序好的参数拼接成一个字符串，然后进行sha1加密
    let arrStr = arr.join("");
    let resStr = crypto.createHash("sha1").update(arrStr).digest("hex");

    // 4.将加密后的字符串与signature对比，标识该请求来源于微信
    if (resStr === signature) {
        console.log(echostr);
        // 若是来源于微信，则原样返回echostr
        res.send(echostr)
    } else {
        console.log("wrong")
        res.send("wrong");
        return false;
    }

}