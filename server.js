const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const scrappingResults = [
  {
    title: "Entry Level Software Developer - C or C++",
    datePosted: new Date("2019-11-10 12:00:00"),
    neighborhood: "(san diego)",
    url: "https://sandiego.craigslist.org/search/jjj?query=software+developer",
    jobDescription:
      "SeeScan is looking for an experienced Senior Mobile Device Software Developer to develop mobile companion apps for our best-in-class utility locating and plumbing diagnostic equipment. We are an established organization with over 30 years of experience designing and manufacturing products that have earned a worldwide reputation for quality and durability. In this position, you will design and develop technological solutions based on Android to help our customers around the world run their businesses.",
    compensation: "Up to US$0.00 per year"
  }
];
async function main() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://sandiego.craigslist.org/search/jjj?query=software+developer"
  );
  const html = await page.content();
  const $ = cheerio.load(html);

  //  Returns array of objects
  const results = $(".result-title").map((index, element) => {
    const title = $(element).text();
    const url = $(element).attr("href");
    return { title, url };
  });
  console.log(results);
}

main();