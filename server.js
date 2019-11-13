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
async function scrapeListings(page) {
  await page.goto(
    "https://sandiego.craigslist.org/search/jjj?query=software+developer"
  );
  const html = await page.content();
  const $ = cheerio.load(html);
  //  Returns array of objects
  const listings = $(".result-info")
    .map((index, element) => {
      const titleElement = $(element).find(".result-title");
      const timeElement = $(element).find(".result-date");
      const title = $(titleElement).text();
      const url = $(titleElement).attr("href");
      const datePosted = new Date($(timeElement).attr("datetime"));
      return { title, url, datePosted };
    })
    .get();
  return listings;
}

async function scrapeJobDescriptions(listings, page) {
  for (var i = 0; i < listings.length; i++) {
    await page.goto(listings[i].url);
    const html = await page.content();
    const $ = cheerio.load(html);
    const jobDescription = $("#postingbody").text();
    // attach property onto listings obj
    listings[i].jobDescription = jobDescription;
    console.log(listings[i].jobDescription);
    await sleep(1000);
  }
}

// Limits number of requests made per second
// New promise is returned only after setTimeOut has run its course 
async function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function main() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const listings = await scrapeListings(page);
  const listingsWithJobDescriptions = await scrapeJobDescriptions(
    listings,
    page
  );
  console.log(listings);
}

main();
