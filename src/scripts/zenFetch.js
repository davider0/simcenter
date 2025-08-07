import express from "express";
import puppeteer from "puppeteer-core";

const router = express.Router();

// Replace this with the actual path to Zen browser executable
const ZEN_BROWSER_PATH = "C:\\Program Files\\Zen Browser\\zen.exe";

router.get("/zen-pinned-lists", async (req, res) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      executablePath: ZEN_BROWSER_PATH,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(
      "https://live.services.trading212.com/rest/watchlists/v4/pinned-lists",
      {
        waitUntil: "networkidle2",
      }
    );
    const body = await page.evaluate(() => document.body.innerText);
    const json = JSON.parse(body);
    res.json(json);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (browser) await browser.close();
  }
});

export default router;