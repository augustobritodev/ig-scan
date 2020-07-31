const puppeteer = require('puppeteer');
const readline = require('readline');

// Download
import axios from 'axios';
import fs from 'fs';

const IG_URL = 'https://www.instagram.com';
const IG_LOAD_MORE_CLASS = '.dCJp8';
const IG_POST_URL_CLASS = '.v1Nh3 a';

let user;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('What is your instagram profile? \n', (answer) => {
  user = answer; // TODO: Validate before set
  console.log(`OK ${user}, starting...`);
  rl.close();
});

rl.on('close', () => {
  console.log('Closed!');
  startBrowserProcess().then((browser) => createPage(browser));
  //process.exit(0);
});

async function startBrowserProcess() {
  console.log('Launching Browser...');
  const browser = await puppeteer.launch();
  return browser;
}

async function stopBrowserProcess(browser) {
  try {
    console.log('Closing Browser...');
    browser.close();
    browser = null;
    page = null;
  } catch (error) {
    console.log('Error closing Browser: ', error);
  }
}

async function createPage(browser) {
  let url = `${IG_URL}/${user}`;

  //TODO: Validate URL before create a page
  console.log(`Creating Page for: ${url}`);
  const page = await browser.newPage();

  console.log(`Going to Page: ${url}`);
  await page.goto(url);

  const hrefs = await page.$$eval(IG_POST_URL_CLASS, (elements) =>
    elements.map((element) => element.href)
  );

  const ids = hrefs.map((href) => href.slice(28, href.length - 1));
  console.log(ids);

  await stopBrowserProcess(browser);
}

async function download(url, name, extension) {
  //https://github.com/ScriptSmith/instamancer/blob/master/src/http/download.ts
}
