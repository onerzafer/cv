// Headless sanity checks for the battle sandbox. Usage: node prototype/run-checks.mjs
// Desktop-JS numbers only. They say nothing about iPhone performance.
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const here = path.dirname(fileURLToPath(import.meta.url));
const file = 'file://' + path.join(here, 'battle-sandbox.html');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 400, height: 780 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
await page.goto(file);
await page.waitForTimeout(800);

const out = { errors };
out.hidden = await page.evaluate(() => window.Proto.hidden(7));
out.delay = await page.evaluate(() => window.Proto.delay(7));
out.spearVsCav = await page.evaluate(() => [1, 2, 3, 4, 5].map((s) => window.Proto.spearVsCav(s)));
out.cavVsLine = await page.evaluate(() => [1, 2, 3, 4, 5].map((s) => window.Proto.cavVsLine(s)));
out.rout = await page.evaluate(() => [1, 2, 3].map((s) => window.Proto.rout(s)));
out.bench = await page.evaluate(() => [1000, 5000, 10000].map((n) => window.Proto.bench(n, 60, 7)));

// text command through the real UI path
await page.fill('#cmdIn', 'left wing advance, hold the centre');
await page.click('#cmd button[type=submit]');
out.logAfterCommand = await page.evaluate(() => document.getElementById('log').innerText);
await page.waitForTimeout(1500);
await page.screenshot({ path: path.join(here, 'screenshot.png') });
out.stats = await page.evaluate(() => ({
  you: document.getElementById('sY').textContent, foe: document.getElementById('sF').textContent,
  fps: document.getElementById('sFps').textContent,
}));
console.log(JSON.stringify(out, null, 1));
await browser.close();
