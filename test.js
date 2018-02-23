const rq = require("request-promise");

const test = async() => {
    let url = "https://creator.zoho.com.cn/api/json/his/view/report_stock_month_detail1";

    let r = await rq.post(url, {
        formData: {
            authtoken: "a667e9d0ac6f2adc4711176fb0dcd17f",
            scope: "creatorapi",
            zc_ownername: "ihangu",
            criteria: "smID=\"SM2017-1001-0002\""
        }
    });

    console.log(r);
}

test();