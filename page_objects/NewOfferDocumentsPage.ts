import { expect, Locator, Page } from "@playwright/test";

export class NewOfferDocumentsPage {
	// Locators
	private readonly uploadID: Locator;
	private readonly attachedID: Locator;
	private readonly uploadCURP: Locator;
	private readonly attachedCURP: Locator;
	private readonly uploadRFC: Locator;
	private readonly attachedRFC: Locator;
	private readonly uploadBirthCertificate: Locator;
	private readonly attachedBirthCertificate: Locator;
	private readonly uploadAddress: Locator;
	private readonly attachedAddress: Locator;
	private readonly uploadBankAuthorization: Locator;
	private readonly attachedBankAuthorization: Locator;
	private readonly continueButton: Locator;
	private readonly informationTitle: Locator;

	constructor(page: Page) {
		this.uploadID = page.locator('input[type="file"]').first();
		this.attachedID = page.getByTestId("document-name__container").first();
		this.uploadCURP = page.locator('input[type="file"]').nth(1);
		this.attachedCURP = page.getByTestId("document-name__container").nth(1);
		this.uploadRFC = page.locator('input[type="file"]').nth(2);
		this.attachedRFC = page.getByTestId("document-name__container").nth(2);
		this.uploadBirthCertificate = page.locator('input[type="file"]').nth(3);
		this.attachedBirthCertificate = page
			.getByTestId("document-name__container")
			.nth(3);
		this.uploadAddress = page.locator('input[type="file"]').nth(4);
		this.attachedAddress = page.getByTestId("document-name__container").nth(4);
		this.uploadBankAuthorization = page.locator('input[type="file"]').nth(5);
		this.attachedBankAuthorization = page
			.getByTestId("document-name__container")
			.nth(5);
		this.continueButton = page.getByRole("button", { name: "Continuar" });
		this.informationTitle = page.locator('p[class="information__title"]');
	}

	async addDocuments() {
		try {
			const file = process.env.PDF;
			if (!file) {
				throw new Error("La variable de entorno PDF no está definida.");
			}
			await this.uploadID.setInputFiles(file);
			await expect(this.attachedID).toBeVisible({ timeout: 50000 });
			await this.uploadCURP.setInputFiles(file);
			await expect(this.attachedCURP).toBeVisible({ timeout: 50000 });
			await this.uploadRFC.setInputFiles(file);
			await expect(this.attachedRFC).toBeVisible({ timeout: 50000 });
			await this.uploadBirthCertificate.setInputFiles(file);
			await expect(this.attachedBirthCertificate).toBeVisible({
				timeout: 50000,
			});
			await this.uploadAddress.setInputFiles(file);
			await expect(this.attachedAddress).toBeVisible({ timeout: 50000 });
			await this.uploadBankAuthorization.setInputFiles(file);
			await expect(this.attachedBankAuthorization).toBeVisible({
				timeout: 50000,
			});
		} catch (error) {
			throw new Error(`Error al adjuntar el documento: ${error.message}`);
		}
	}

	async clickContinueButton() {
		try {
			await expect(this.continueButton).toBeVisible();
			await expect(this.continueButton).toBeEnabled();
			await this.continueButton.click();
			await expect(this.informationTitle).toBeVisible({ timeout: 50000 });
		} catch (error) {
			throw new Error(`Error al hacer clic en "Continuar": ${error.message}`);
		}
	}
}
