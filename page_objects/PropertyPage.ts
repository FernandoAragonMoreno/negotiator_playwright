import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class PropertyPage extends BasePage {
	private readonly buttonOffer: Locator;

	constructor(page: Page) {
		super(page); // Llamar al constructor de la clase base si es necesario
		this.buttonOffer = page.getByRole("button", { name: "Ofertar" });
	}

	async clickOffer() {
		try {
			await expect(this.buttonOffer).toBeVisible({ timeout: 50000 });
			await expect(this.buttonOffer).toBeEnabled();
			await this.buttonOffer.click();
		} catch (error) {
			throw new Error(`Error al hacer clic en oferta: ${error.message}`);
		}
	}
}
