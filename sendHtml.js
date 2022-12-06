function fn (weatherData, lifeData, word, imgurl, lovingDays) {
    const { daily: weatherDataDaily } = weatherData;
    const { daily } = lifeData;
    const wList = weatherDataDaily.slice(1).map(w => {
        const { fxDate, tempMin, tempMax, textDay } = w;
        return (`<li style="margin-bottom: 10px">
        预报日期：
        ${fxDate}(${textDay}),最低温度：${tempMin}℃, 最高温度:${tempMax}℃;
        </li>`)
    }).join('')
    const indexs = daily.map(i => {
        const { name, text, category } = i;
        return (`<li style="margin-bottom: 10px">
        ${name}(${category}):
        ${text}
      </li>`)
    }).join('');
    return `<!DOCTYPE html><html>
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body>
      <div>
        <!-- 
            <div>
               <p>今天是在一起的第${lovingDays}天！</p>
            </div>
        -->
        <!-- 图片 -->
        <div>
          <img
            style="width: 100%; max-width: 768px"
            src="${imgurl}"
            alt="图片"
          />
        </div>
        <!-- 每日一句 -->
        <div>
          <p style="font-size: 14px; text-indent: 2em; font-style: italic;">
            ${word}
          </p>
        </div>
        <!-- 天气 -->
        <div>
          <p>
            <b>今日天气:</b>
            <span>${weatherDataDaily[0].fxDate}(${weatherDataDaily[0].textDay}) ${weatherDataDaily[0].tempMin}°C - ${weatherDataDaily[0].tempMax}°C</span>
          </p>
          <ul>
            ${wList}
          </ul>
        </div>
        <div>
            <p><b>天气指数:</b></p>
            <ul>
                ${indexs}
            </ul>
        </div>
      </div>
    </body>
    </html>`;
}

module.exports = fn;
