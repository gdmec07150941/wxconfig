const cheerio = require("cheerio");
const { asyncReadFile } = require("./asyncHandleFile");

module.exports = async(name) => {
    let $ = cheerio.load(await asyncReadFile("./views/"+ name + ".tpl"));

    console.log($);
}
