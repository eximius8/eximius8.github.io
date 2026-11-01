// Renders docs/index.html with its print styles into docs/Mikhail_Trunov_CV.pdf
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const root = path.resolve(__dirname, '..');
  const input = 'file://' + path.join(root, 'docs', 'index.html');
  const output = process.argv[2] || path.join(root, 'docs', 'Mikhail_Trunov_CV.pdf');

  const browser = await chromium.launch();
  const page = await browser.newPage({ colorScheme: 'light' });
  await page.goto(input, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: 'print', colorScheme: 'light' });
  await page.pdf({ path: output, preferCSSPageSize: true, printBackground: true });
  await browser.close();
  console.log('PDF written to', output);
})().catch((err) => { console.error(err); process.exit(1); });
