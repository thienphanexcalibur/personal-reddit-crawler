const fs = require('fs');
const ppt = require('puppeteer');
const url = 'https://www.reddit.com/r/GalaxyS9/';
(async () => {
  const browser = await ppt.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const res = await page.evaluate(() => {
    const entries = document.querySelectorAll("[data-click-id='body']");
    const el = [];
    for(var p in entries) {
      entries[p].innerText ? el.push(entries[p].innerText) : null
    }
    return el.join('\n');
  });
  // console.log(res);
  fs.writeFile('data.txt', res, (err) => {
   if(err) throw err;
   console.log('File saved!');
  })

  await browser.close();
})();