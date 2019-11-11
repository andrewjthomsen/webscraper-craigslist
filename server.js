const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

// const scrapinResults = [
//   {
//     title: "Entry Level Software Engineer - C or C++",
//     datePosted: new Date("2019-11-10 12:00:00")
//   }
// ];

// Headless:false means browser will not be hidden
async function main() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://sandiego.craigslist.org/search/jjj?query=software+developer"
  );
  const html = await page.content();
  const $ = cheerio.load(html);
$(".result-title").each((index, element) => console.log($(element).text()));
}

main();
