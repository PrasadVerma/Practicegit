import { test as base } from "@playwright/test";
import { BuzzPage } from "../page-objects/BuzzPage";
import { PimPage } from "../page-objects/PimPage";

type Fixtures = {
    buzzPage: BuzzPage;
    pimPage: PimPage;
};

export const test = base.extend<Fixtures>({
    buzzPage: async ({ page }, use) => {
        await use(new BuzzPage(page));
    },
    pimPage: async ({ page }, use) => {
        await use(new PimPage(page));
    },
});

export { expect } from "@playwright/test";