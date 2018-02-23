const request = require("request-promise");
const {
    authtoken,
    scope,
    zc_ownername,
    raw,
} = require("../config/his");

const userInfo = async(req, res) => {
    console.log(req.query);
    let { unionid } = req.query;

    let criteria = "(unionID==\""+unionid+"\")";

    let userInfo = await getUserInfo(criteria);
    
    if (userInfo) {
        res.send({
            code: "ok",
            data: userInfo
        });
    }
    
}
// 获取会员信息
const getUserInfo = async(criteria) => {
    let url = "https://creator.zoho.com.cn/api/json/clinic/view/report_customer_weixin";
    let result = await request.get({
        url,
        qs: {
            authtoken,
            scope,
            zc_ownername,
            raw,
            criteria,
        },
        json: true
    }).then(data => data.form_customer[0]);

    return result;
}

module.exports = {
    userInfo,
}