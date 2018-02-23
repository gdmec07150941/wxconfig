const router = require("express").Router();
const index = require("../api/index");
const user = require("../api/user");

router.get("/userInfo", user.userInfo);

module.exports = router;
