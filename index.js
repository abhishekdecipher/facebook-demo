const puppeteer = require('puppeteer');
const CRED = require('./creds.rem');
const sleep = async (ms) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, ms)
  });
}

const ID = {
  login: '#email',
  pass: '#pass'
};

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  let login = async () => {
    // login
    await page.goto('https://facebook.com', {
      waitUntil: 'networkidle2'
    });
    await page.waitForSelector(ID.login);
    console.log(CRED.user);
    console.log(ID.login);
    await page.type(ID.login, CRED.user);
    await page.type(ID.pass, CRED.pass);
    await sleep(500);
    await page.click("#loginbutton");
    console.log("login done");
    await page.waitForNavigation();
  }
  await login();
   const response = await page.goto('http://facebook.com');
   const data = await page.evaluate(() => {
   const tds = Array.from(document.querySelectorAll('.ego_title a'));
    return tds.map((td) => {
        return (td.getAttribute("href"));
});
});
   if(data[0]) {
       await page.goto(data[0]);
       await page.screenshot({
           path: 'facebook_1.png'
       });
   }
if(data[1]) {
    await page.goto(data[1]);
    await page.screenshot({
        path: 'facebook_2.png'
    });
}
if(data[2]) {
    await page.goto(data[2]);
    await page.screenshot({
        path: 'facebook_3.png'
    });
}
if(data[3]){
await page.goto(data[3]);
await page.screenshot({
    path: 'facebook_4.png'
});}
if(data[4]){
await page.goto(data[4]);
await page.screenshot({
    path: 'facebook_5.png'
});}
})();
