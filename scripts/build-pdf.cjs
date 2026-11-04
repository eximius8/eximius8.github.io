// Renders the CV pages with their print styles into PDFs in docs/:
//   docs/index.html    -> docs/Mikhail_Trunov_CV.pdf
//   docs/de/index.html -> docs/Mikhail_Trunov_Lebenslauf.pdf
// Usage: node scripts/build-pdf.cjs [outDir]
const path = require('path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const outDir = path.resolve(process.argv[2] || path.join(root, 'docs'));
const jobs = [
  ['docs/index.html', 'Mikhail_Trunov_CV.pdf'],
  ['docs/de/index.html', 'Mikhail_Trunov_Lebenslauf.pdf'],
];

(async () => {
  const browser = await chromium.launch();
  for (const [src, name] of jobs) {
    const page = await browser.newPage({ colorScheme: 'light' });
    await page.goto('file://' + path.join(root, src), { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.emulateMedia({ media: 'print', colorScheme: 'light' });
    const out = path.join(outDir, name);
    await page.pdf({ path: out, preferCSSPageSize: true, printBackground: true });
    await page.close();
    console.log('PDF written to', out);
  }
  await browser.close();
})().catch((err) => { console.error(err); process.exit(1); });
