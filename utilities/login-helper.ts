import { chromium, expect } from "@playwright/test";
import { env } from "process";
const storageStatePath: string = env.STORAGE_STATE_PATH!;
export async function initialLogin(): Promise<void> {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(env.URL!, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.getByPlaceholder("Username").fill(env.USER!);
    await page.getByPlaceholder("Password").fill(env.PASSWORD!);
    await page.getByRole("button", { name: ' Login '}).click();
    await expect(page).toHaveTitle(/OrangeHRM/);
    await page.context().storageState({ path: storageStatePath })
    // const token = await page.evaluate(() => window.localStorage.getItem("token"));
    // env.API_TOKEN = `Bearer ${token}`;
    await browser.close();
}