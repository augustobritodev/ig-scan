const puppeteer = require('puppeteer');
const readline = require('readline');

const IG_URL = 'https://www.instagram.com/';
const IG_LOAD_MORE_CLASS = '.dCJp8';
const IG_POST_URL_CLASS = '.v1Nh3';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('What is your instagram profile? \n', (answer) => {
  let user = answer; // TODO: Validate before set
  console.log(`OK ${user}, starting...`);
  rl.close();
});

rl.on('close', () => {
  console.log('Closed!');
  startBrowserProcess();
  //process.exit(0);
});

async function startBrowserProcess() {
  console.log('Launching Browser...');
  const browser = await puppeteer.launch();

  console.log('Creating Page...');
  const page = await browser.newPage();

  console.log(`Navigating to: ${IG_URL}`);
  await page.goto(IG_URL);

  console.log('Selecting Load more comments Button...');
  const button = await page.$(`${IG_LOAD_MORE_CLASS}`);

  if (button) {
    await button.click(() => {
      console.log('clicked!');
    });
  }

  browser.close();
}

//  - Digitar @perfil IG
// Selecionar IDs dos Posts Disponiveis
// Contar e Ordenar @ marcados nos comentarios do Post
//	Exemplo: @julio: 3x @carlos 2x @joao
// Mostrar
