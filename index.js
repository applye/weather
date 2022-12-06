const fetch = require('node-fetch');
const daysjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
// const sendMail = require('./sendEmail');
const sendHtml = require('./sendHtml');
const fs = require('fs');


daysjs.extend(utc);
daysjs.extend(timezone);

const { fromDisplayText, fromDisplaySubText, user, to, weatherKey, location, type, tianXingKey, startDay } = require('./config');

async function init () {
    try {
        // 未来3天生活指数
        const url = `https://devapi.qweather.com/v7/weather/3d?key=${weatherKey}&location=${location}`
        const weatherRes = await fetch(url);
        const data = await weatherRes.json();
        // 获取当前生活指数
        const lifeUrl = `https://devapi.qweather.com/v7/indices/1d?key=${weatherKey}&location=${location}&type=${type}`;
        const lifeRes = await fetch(lifeUrl);
        const lifeData = await lifeRes.json();
        const oneUrl = `http://api.tianapi.com/txapi/one/index?key=${tianXingKey}`
        const oneRes = await fetch(oneUrl);
        const oneData = await oneRes.json();
        const { word, imgurl } = oneData?.newslist[0];
        // 计算日期
        const lovingDays = daysjs(daysjs().tz('Asia/Shanghai')).diff(
            startDay,
            'days'
        );
        const htmlStr = sendHtml(data, lifeData, word, imgurl, lovingDays);
        fs.writeFileSync('weather.html', htmlStr)
        // sendMail({
        //     from: fromDisplayText,
        //     to,
        //     subject: fromDisplaySubText,
        //     html: htmlStr,
        // });
    } catch (error) {
        console.log(error);
        // sendMail({
        //     from: '报错啦',
        //     to: user,
        //     subject: '定时邮件-报错提醒',
        //     html: '请查看github actions',
        // });
    }
}
init();