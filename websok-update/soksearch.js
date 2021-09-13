//whole function in one..search name
function namesearch(name,sok){
    function print(msg){
        console.log(msg)
    }
    
    print("starting code...")
    sok.emit("searchm","starting code...")
    
    const e = require('cors');
    const puppeteer = require('puppeteer');
    
    
    (async () => {

    const browser = await puppeteer.launch({
        args: [
                        '--no-sandbox',
                        '--disable-setuid-sandbox'
                    ],
        headless: true
    })
    const page = await browser.newPage()
    await page.goto('http://127.0.0.1:8096/web/index.html#!/login.html?')
    print("logging in")
    sok.emit("searchm","logging in")
    
    await page.setViewport({ width: 1093, height: 479 })
    
    await page.waitForSelector('#txtManualName')
    await page.click('#txtManualName')
    await page.type('#txtManualName', "jellyfin")
    print("entering username")
    sok.emit("searchm","entering username")
    
    
    await page.waitForSelector('#txtManualPassword')
    await page.click('#txtManualPassword')
    await page.type('#txtManualPassword', "belski")
    print("entering password")
    sok.emit("searchm",'entering password')
    
    await page.waitForSelector('.mainAnimatedPages > #loginPage > .padded-left > .manualLoginForm > .raised')
    await page.click('.mainAnimatedPages > #loginPage > .padded-left > .manualLoginForm > .raised')
    print("loading log in page")
    await page.waitForNavigation({
                waitUntil: 'networkidle0',
              });
    
    await page.waitForSelector('.skinHeader > .flex > .headerLeft > .headerButton:nth-child(3) > .material-icons')
    await page.click('.skinHeader > .flex > .headerLeft > .headerButton:nth-child(3) > .material-icons')
    print("loading dashboard..")
    await page.waitForTimeout(2000)
    await page.waitForSelector('.mainDrawer > .mainDrawer-scrollContainer > .userMenuOptions > .navMenuOption:nth-child(2) > .navMenuOptionText')
    const [button] = await page.$x("//a[contains(., 'Dashboard')]");
    if (button){
        await button.click()
    }
    print("loading users..")
    sok.emit("searchm","loading users")
    await page.waitForTimeout(2000)
    
    const [ubutton] = await page.$x("//a[contains(., 'Users')]")
    if(ubutton){
        await ubutton.click()
    }
    console.log("searching for user "+name)
    sok.emit("searchm","searching for user " + name)
    await page.waitForTimeout(2000)
    
    let value = await page.evaluate(()=>{
        let link = document.querySelectorAll(".flex-grow")
        const ulist = [...link]
        return ulist.map(h=> h.innerText.toLowerCase())
    
    })
    print(value)
    if(value.includes(name.toLowerCase())){
        print( name +" found")

        sok.emit("searchm",(name+" found"))
        sok.disconnect(0)

    }else{
        print(name +"not found")
        sok.emit("searchm",(name + " not found"))
        // socket.on('end', function (){
        //     socket.disconnect(0);
        // });
        sok.disconnect(0)
    }
    
    await page.screenshot({path:"user.png"})
    await browser.close()
    console.log("done")
    })();
    

}


module.exports = {
    namesearch
}
