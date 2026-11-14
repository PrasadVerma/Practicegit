import { Locator, Page } from "@playwright/test";
import { env } from "process";

export class BasePage {
    readonly page: Page;
    readonly profileMenu: Locator;
    readonly logoutMenuItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.profileMenu = page.locator(".oxd-userdropdown-tab");
        this.logoutMenuItem = page.getByRole("menuitem", { name: "Logout" });
    }

    async logout(): Promise<void> {
        await this.profileMenu.click();
        await this.logoutMenuItem.click();
        await this.page.waitForURL(/\/auth\/login$/);
    }

    async openAuthenticatedDashboard(): Promise<void> {
        const appOrigin = new URL(env.URL!).origin;
        await this.page.goto(`${appOrigin}/web/index.php/dashboard/index`);
    }
}