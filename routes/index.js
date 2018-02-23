const express = require('express');
const router = express.Router();
const api = require("./api");
const home = require("../controllers/home");
const index = require("../api/index");

const {
    appID,
    redirect_uri,
    scope,
    state
} = require("../config/verifyInfo");

/* GET home page. */
// router.get('/', (req, res, next) => {
//     res.redirect(302, "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appID + "&redirect_uri=" + redirect_uri + "&response_type=code&scope=" + scope + "&state=" + state + "#wechat_redirect");
// });

router.get("/", require("../wechat/index"));

router.post('/', index.home);
router.get("/wxtest", home);

router.use("/api/v1.1", api);

module.exports = router;
