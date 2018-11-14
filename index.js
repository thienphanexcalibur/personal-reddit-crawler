const ppt = require('puppeteer');
(async () => {
  const browser = await ppt.launch();
  const page = await browser.newPage();
  await page.goto('https://www.reddit.com/r/GalaxyS9/');
  const res = await page.evaluate(() => {
    const entries = document.querySelectorAll("[data-click-id='body']");
    const el = [];
    for(var p in entries) {
      el.push(entries[p].innerText);
    }
    return el;
  });
  console.log(res);

  await browser.close();
})();