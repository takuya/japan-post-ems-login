const send_requret = async function (id, pw) {
  
  const puppeteer = require('puppeteer');
  const main = async function (id, pw) {
    
    const wait = (milisec) => {
      return new Promise(resolve => {
        setTimeout(resolve, milisec)
      })
    };
    const browser = await puppeteer.launch({
      headless: true,
      slowMo: 0,
      devtools: false,
      args: [
        '--incognito',
        '--disable-infobars',
        '--no-default-browser-check',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--lang=ja'
      ]
    });
    let page = await browser.newPage();
    
    const login_url = 'https://www.int-mypage.post.japanpost.jp/mypage/'
    await page.goto(login_url, {waitUntil: 'networkidle2'})
    let txt = await page.$eval('body', e => e.textContent);
    
    //
    //   // race condition を避ける。
    await page.evaluate((id, pw) => {
      document.querySelector('input[type="text"][name="loginBean.id"]').value = id
      pw_input = document.querySelector("input[type='password']")
      pw_input.focus()
      document.execCommand('insertText', false, pw);//
      document.querySelector('a[href*=login]').click()
    }, id, pw);
    
    await page.waitForNavigation();
    let name = await page.$eval('div#memberName table tr:nth-of-type(1) > td:nth-child(1)', e => e.textContent);
    let lastLogin = await page.$eval('#bgSub3', e => e.textContent);
    name = name.replaceAll(/\t+/g, ' ').replaceAll(/\n+/g, '').trim();
    lastLogin = lastLogin.replaceAll(/\t+/g, ' ').replaceAll(/\n+/g, '').trim();
    await browser.close();
    return [name, lastLogin];
  };
  //
  ret = await main(id, pw);
  return ret;
};


module.exports = {
  'send_request': send_requret
}
