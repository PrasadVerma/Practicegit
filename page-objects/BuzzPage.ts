import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class BuzzPage extends BasePage {
    readonly buzzLink: Locator;
    readonly postComposer: Locator;
    readonly postButton: Locator;
    readonly postBodies: Locator;

    constructor(page: Page) {
        super(page);
        this.buzzLink = page.getByRole("link", { name: "Buzz" });
        this.postComposer = page.getByRole("textbox", { name: "What's on your mind?" });
        this.postButton = page.getByRole("button", { name: "Post", exact: true });
        this.postBodies = page.locator(".orangehrm-buzz-post-body-text");
    }

    async navigateToBuzz(): Promise<void> {
        await this.openAuthenticatedDashboard();
        await this.buzzLink.click();
    }

    async postMessage(message: string): Promise<void> {
        await this.postComposer.fill(message);
        await this.postButton.click();
    }

    postByMessage(message: string): Locator {
        return this.postBodies.filter({ hasText: message }).last();
    }
}