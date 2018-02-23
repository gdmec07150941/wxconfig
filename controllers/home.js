const request = require("request-promise");

const {
    appID,
    appsecret,
    redirect_uri,
    scope,
    state,
} = require("../config/verifyInfo");

const home = async(req, res, next) => {
    console.log(req.query);

    let {
        code,
        state
    } = req.query;

    // 用code获取openid,unionid
    if (!req.session.data) {
        let {
            errcode,
            unionid,
            openid
        } = await request.get("https://api.weixin.qq.com/sns/oauth2/access_token", {
            qs: {
                appid: appID,
                secret: appsecret,
                code,
                grant_type: "authorization_code"
            },
            json: true
        });
    
        if (errcode) {
            res.redirect(302, "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appID + "&redirect_uri=" + redirect_uri + "&response_type=code&scope=" + scope + "&state=" + state + "#wechat_redirect");
    
            return
        }

        req.session.data = { openid, unionid };
    }

    res.render("index", {
        title: "123",
    });

}

module.exports = home;
