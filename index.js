const fs = require('fs');
const ppt = require('puppeteer');
const url = 'https://www.reddit.com/r/GalaxyS9/';

module.exports = async (sendmail) => {
  const browser = await ppt.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const res = await page.evaluate(() => {
    window.scrollBy(0,10000);
    const el = [];
      const entries = document.querySelectorAll("[data-click-id='body']");
      const comments = document.querySelectorAll("[data-click-id='comments'");
      for(var p in entries) {
        if (typeof Number(p) === 'number' && (Number(p) >= 2)) {
          el.push(`<div><b>${entries[p].innerText}</b> <div style="color:red"></div>${comments[p].innerText}</div>${entries[p].href}<div>`)
        }
      }

    return el.join('<br>');
  });
  fs.writeFile('data.txt', res, (err) => {
   if(err) throw err;
   console.log('File saved!');
  })

  await browser.close();
  sendmail()
};