
function adduser(name,password,sok){
    function print(msg) {
        console.log(msg)
    }
    
    
    const puppeteer = require('puppeteer');
    
    
    
    (async () => {
        // var process = require("process")
        // var name = process.argv[2]
        // var password = process.argv[3]
        const browser = await puppeteer.launch({
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ],
            headless:true
        })
        const page = await browser.newPage()
        await page.goto('http://127.0.0.1:8096/web/index.html#!/login.html?')
        print("logging in")
        sok.emit("addm","Logging In..")
    
        await page.setViewport({ width: 1093, height: 600 })
    
        await page.waitForSelector('#txtManualName')
        await page.click('#txtManualName')
        await page.type('#txtManualName', "jellyfin")
        print("entering username")
        sok.emit("addm","typing username")

    
    
        await page.waitForSelector('#txtManualPassword')
        await page.click('#txtManualPassword')
        await page.type('#txtManualPassword', "belski")
        print("entering password")
        sok.emit("addm","typing password..")

    
        await page.waitForSelector('.mainAnimatedPages > #loginPage > .padded-left > .manualLoginForm > .raised')
        await page.click('.mainAnimatedPages > #loginPage > .padded-left > .manualLoginForm > .raised')
        print("loading log in page")
        sok.emit("addm","Loading login page")

        await page.waitForNavigation({
            waitUntil: 'networkidle0',
        });
    
        await page.waitForSelector('.skinHeader > .flex > .headerLeft > .headerButton:nth-child(3) > .material-icons')
        await page.click('.skinHeader > .flex > .headerLeft > .headerButton:nth-child(3) > .material-icons')
        print("loading dashboard..")
        sok.emit("addm","Loading dash board")

        await page.waitForSelector('.mainDrawer > .mainDrawer-scrollContainer > .userMenuOptions > .navMenuOption:nth-child(2) > .navMenuOptionText')
        const [button] = await page.$x("//a[contains(., 'Dashboard')]");
        if (button) {
            await button.click()
        }
        print("loading users..")
        sok.emit("addm","Loading users..")

        await page.waitForTimeout(2000)
    
        const [ubutton] = await page.$x("//a[contains(., 'Users')]")
        if (ubutton) {
            await ubutton.click()
        }
        await page.waitForTimeout(2000)
        //user search
        let value = await page.evaluate(() => {
            let link = document.querySelectorAll(".flex-grow")
            const ulist = [...link]
            return ulist.map(h => h.innerText.toLowerCase())
    
        })
        print(value)
        if (value.includes(name.toLowerCase())) {
            print("found...choose another username")
            sok.emit("addm",name+" already taken..choose another username")

            // res.send("user already there")
            // res.json({
            //     "name":name,
            //     "status":404,
            //     "xstatus":"user not saved"
            // })
        } else {
            print("not found..adding user")
            sok.emit("addm",name+" not found..adding user")

            await page.waitForSelector('.force-scroll > .mainDrawer > .mainDrawer-scrollContainer > .drawerContent > .navMenuOption:nth-child(4)')
            await page.click('.force-scroll > .mainDrawer > .mainDrawer-scrollContainer > .drawerContent > .navMenuOption:nth-child(4)')
    
            await page.waitForSelector('.content-primary > .verticalSection > .sectionTitleContainer > .fab > .material-icons')
            await page.click('.content-primary > .verticalSection > .sectionTitleContainer > .fab > .material-icons')
            print("adding user " + name)
            sok.emit("addm","adding.."+ name)

            await page.waitForSelector('#txtUsername')
            await page.click('#txtUsername')
            await page.type("#txtUsername", name)
            print("username added " + name)
            sok.emit("addm","username added.."+name)

    
            await page.waitForSelector('#txtPassword')
            await page.click('#txtPassword')
            await page.type("#txtPassword", password)
            print("added password " + password)
            await page.waitForTimeout(2000)
            // await page.click('.mainDrawer > .mainDrawer-scrollContainer > .userMenuOptions > .navMenuOption:nth-child(2) > .navMenuOptionText')
            print("adding media library")
            sok.emit("addm","adding media library..")

            await page.click(".checkboxOutline")
            const [savebutton] = await page.$x("//Button[contains(., 'Save')]")
            if (savebutton) {
                await savebutton.click()

            
            }
            // res.json({
            //     "name":name,
            //     "status":200,
            //     "xstatus":"user saved"
            // })
            sok.emit("addm","user.."+name+" saved")
            sok.disconnect(0)

        }
    
        await page.screenshot({ path: "xx.png" })
        await browser.close()
        console.log("done")
    })();
    
}

module.exports = {
    adduser
}
