const puppeteer = require("puppeteer");

export async function parseWeb(url?: string) {
    // https://www.livescores.com/football/euro-2024-qualification/?tz=7
    // https://www.livescores.com/football/euro-2024/?tz=7
    let targetURL = 'https://www.livescores.com/football/euro-2024/?tz=7'
    if (url && url != "") {
        targetURL = `https://www.livescores.com/football/${url}`
    }
    console.log(`>> ${targetURL} | ${url}`);

    // console.log("Parsing the www.livescores.com homepage");
    // Launch the browser
    const browser = await puppeteer.launch();

    // Open a new tab
    const page = await browser.newPage();

    // Visit the page and wait until network connections are completed
    
    await page.goto(targetURL, { waitUntil: 'networkidle2' });

    // Interact with the DOM to retrieve the titles
    const titles = await page.evaluate(() => {
        // Select all elements with crayons-tag class
        return [...document.querySelectorAll('.ob,.pb,.mb,.ch,.bi,.gi,.ii,.hi,.ci')].map(el => {
            // console.log(el.textContent)
            return { selector: el.className, content: el.textContent }
        });
    });

    // Don't forget to close the browser instance to clean up the memory
    await browser.close();

    // titles.forEach(el => console.log(`[${el.selector}]-> ${el.content}`))
    let data = new Array()
    let title = ""
    let round = ""
    let date = ""
    let obj:any = {}

    titles.forEach((el:any) => {
        if (el.selector == "ob") {
            title = el.content
        } else if (el.selector == "pb") {
            round = el.content
        } else if (el.selector == "mb") {
            date = el.content
        } else if (el.selector == "ch Yg") {
            obj = {}
            obj["time"] = el.content
        } else if (el.selector == "bi") {
            obj["home"] = el.content
        } else if (el.selector == "gi") {
            obj["homeScore"] = el.content
        } 
        else if (el.selector == "hi") {
            obj["compScore"] = el.content
        } else if (el.selector == "ci") {
            obj["competitor"] = el.content
            obj["title"] = title
            obj["round"] = round
            obj["date"] = date
            data.push(obj)
        }
    })

    return {
        "data": data
    }
}