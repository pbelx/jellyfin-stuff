function print(msg) {
    console.log(msg)
}

// var process = require("process")
// let fname = " "


async function namesearch(xname,res) {
    // var xname = fname
    const page = await pagestart
    console.log("searching for user " + xname)
    await page.waitForTimeout(2000)

    let value = await page.evaluate(() => {
        let link = document.querySelectorAll(".flex-grow")
        const ulist = [...link]
        return ulist.map(h => h.innerText)

    })
    print(value)
    if (value.includes(xname)) {
        print(xname + " found")
        res.send(xname + " found")
    } else {
        print(xname + " not found")
        res.send(xname + " not found")
    }
}

async function adduser(xname,password,res){
    const page = await pagestart
    let value = await page.evaluate(() => {
        let link = document.querySelectorAll(".flex-grow")
        const ulist = [...link]
        return ulist.map(h => h.innerText)

    })
    print(value)
    if (value.includes(xname)) {
        print("found...choose another username")
    } else {
        print("not found..adding user")
        await page.waitForSelector('.force-scroll > .mainDrawer > .mainDrawer-scrollContainer > .drawerContent > .navMenuOption:nth-child(4)')
        await page.click('.force-scroll > .mainDrawer > .mainDrawer-scrollContainer > .drawerContent > .navMenuOption:nth-child(4)')

        await page.waitForSelector('.content-primary > .verticalSection > .sectionTitleContainer > .fab > .material-icons')
        await page.click('.content-primary > .verticalSection > .sectionTitleContainer > .fab > .material-icons')
        print("adding user " + xname)
        await page.waitForSelector('#txtUsername')
        await page.click('#txtUsername')
        await page.type("#txtUsername", xname)
        print("username added " + xname)

        await page.waitForSelector('#txtPassword')
        await page.click('#txtPassword')
        await page.type("#txtPassword", password)
        print("added password " + password)
        await page.waitForTimeout(2000)
        // await page.click('.mainDrawer > .mainDrawer-scrollContainer > .userMenuOptions > .navMenuOption:nth-child(2) > .navMenuOptionText')
        print("adding media library")
        await page.click(".checkboxOutline")
        const [savebutton] = await page.$x("//Button[contains(., 'Save')]")
        if (savebutton) {
            await savebutton.click()
        }
        res.send("saved user")
    }
}

print("starting code...")

const e = require('cors');
const puppeteer = require('puppeteer');


const pagestart = (async () => {

    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ],
        headless: true
    })
    const page = await browser.newPage()
    // await page.goto('http://127.0.0.1:8096/web/index.html#!/login.html?')
    await page.goto('http://localhost:8096/')
    print("logging in")

    await page.setViewport({ width: 1093, height: 479 })

    await page.waitForSelector('#txtManualName')
    await page.click('#txtManualName')
    await page.type('#txtManualName', "jellyfin")
    print("entering username")


    await page.waitForSelector('#txtManualPassword')
    await page.click('#txtManualPassword')
    await page.type('#txtManualPassword', "jellypass")
    print("entering password")

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
    if (button) {
        await button.click()
    }
    print("loading users..")
    await page.waitForTimeout(2000)

    const [ubutton] = await page.$x("//a[contains(., 'Users')]")
    if (ubutton) {
        await ubutton.click()
    }


    // await page.screenshot({path:"user.png"})
    // // await browser.waitForTarget(()=>false)
    // await browser.close()
    console.log("page loaded")
    return page
   
})();

// namesearch(fname)
module.exports = {
    namesearch,adduser
}
