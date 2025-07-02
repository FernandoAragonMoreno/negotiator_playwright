import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class PropertyPage extends BasePage {
    private readonly page: Page;
    private readonly offer: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.offer = page.getByRole("button", { name: "Ofertar" });
    }

    async clickOffer() {
        await expect(this.offer).toBeVisible();
        await this.offer.click();
    }
}