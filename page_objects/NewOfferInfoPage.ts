import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class NewOfferInfoPage extends BasePage {
	// Locators
	private readonly page: Page;
	private readonly containerPaymentMethod: Locator;
	private readonly radioPaymentMethod: Locator;
	private readonly radioPaymentMethodBankCredit: Locator;
	private readonly dropdownExemptionCode: Locator;
	private readonly optionNo: Locator;
	private readonly buttonAddIndividualBuyer: Locator;
	private readonly firstName: Locator;
	private readonly lastName: Locator;
	private readonly maritalStatus: Locator;
	private readonly singleOption: Locator;
	private readonly maritalStatusType: Locator;
	private readonly neverMarriedOption: Locator;
	private readonly documentType: Locator;
	private readonly ineOption: Locator;
	private readonly saveButton: Locator;
	private readonly continueButton: Locator;
	private readonly documentTitle: Locator;

	constructor(page: Page) {
		super(page); // Llamar al constructor de la clase base si es necesario
		this.page = page;
		this.containerPaymentMethod = page.getByTestId("radio-wrapper");
		this.radioPaymentMethod = page.locator(
			'span[class="styles__ControlIcon-sc-ibvecg-2 iYdbZu habi   "]'
		);
		this.radioPaymentMethodBankCredit = page
			.locator('span[class="styles__ControlIcon-sc-ibvecg-2 iYdbZu habi   "]')
			.nth(1);
		this.dropdownExemptionCode = page.getByTestId("dropdown-button");
		this.optionNo = page.getByRole("option", { name: "No" });
		this.buttonAddIndividualBuyer = page.getByRole("button", {
			name: "add icon Agregar comprador p. física",
		});
		this.firstName = page.getByPlaceholder("Primer nombre");
		this.lastName = page.getByPlaceholder("Primer apellido");
		this.maritalStatus = page.getByTestId("dropdown-button").first();
		this.singleOption = page.getByRole("option", { name: "Soltero" });
		this.maritalStatusType = page.getByTestId("dropdown-button").nth(1);
		this.neverMarriedOption = page.getByRole("option", {
			name: "Nunca casado",
		});
		this.documentType = page.getByTestId("dropdown-button").nth(2);
		this.ineOption = page.getByRole("option", {
			name: "INE - Credencial para votar",
		});
		this.saveButton = page.getByRole("button", { name: "Guardar" }).first();
		this.continueButton = page.getByRole("button", { name: "Continuar" });
		this.documentTitle = page.getByRole("heading", { name: "Documentos" });
	}

	async randomPaymentMethod() {
		await expect(this.containerPaymentMethod).toBeVisible({ timeout: 50000 });
		const titles = await this.radioPaymentMethod.allTextContents();
		if (titles.length === 0) {
			throw new Error("No se encontraron títulos para seleccionar.");
		}
		// Genera un array de índices excepto el 5 (opción Habicredit 100)
		const validIndexes = titles.map((_, i) => i).filter((i) => i !== 5);
		const randomIndex =
			validIndexes[Math.floor(Math.random() * validIndexes.length)];
		await this.radioPaymentMethod.nth(randomIndex).click();
	}

	async selectPaymentMethodBankCredit() {
		try {
			await expect(this.containerPaymentMethod).toBeVisible({ timeout: 50000 });
			await this.radioPaymentMethodBankCredit.click();
		} catch (error) {
			throw new Error(
				`Error al seleccionar el método de pago: ${error.message}`
			);
		}
	}

	async selectExemptionCode() {
		try {
			await this.page.waitForLoadState("load");
			await expect(this.dropdownExemptionCode).toBeVisible();
			await expect(this.dropdownExemptionCode).toBeEnabled();
			await this.dropdownExemptionCode.click();
			await expect(this.optionNo).toBeVisible();
			await expect(this.optionNo).toBeEnabled();
			await this.optionNo.click();
		} catch (error) {
			throw new Error(
				`Error al seleccionar el código de exención: ${error.message}`
			);
		}
	}

	private async waitAndFill(locator: Locator, value: string) {
		await expect(locator).toBeVisible();
		await expect(locator).toBeEnabled();
		await locator.fill(value);
	}

	private async waitAndClick(locator: Locator) {
		await expect(locator).toBeVisible();
		await expect(locator).toBeEnabled();
		await locator.click();
	}

	async fillAddIndividualBuyer() {
		try {
			await this.waitAndClick(this.buttonAddIndividualBuyer);
			await this.waitAndFill(this.firstName, "FER");
			await this.waitAndFill(this.lastName, "TEST");

			await this.waitAndClick(this.maritalStatus);
			await this.waitAndClick(this.singleOption);

			await this.waitAndClick(this.maritalStatusType);
			await this.waitAndClick(this.neverMarriedOption);

			await this.waitAndClick(this.documentType);
			await this.waitAndClick(this.ineOption);

			await this.waitAndClick(this.saveButton);
		} catch (error) {
			throw new Error(
				`Error al hacer clic en "Agregar comprador p. física": ${error.message}`
			);
		}
	}

	async clickContinueButton() {
		try {
			await expect(this.continueButton).toBeVisible();
			await expect(this.continueButton).toBeEnabled();
			await this.continueButton.click();
			await expect(this.documentTitle).toBeVisible({ timeout: 50000 });
		} catch (error) {
			throw new Error(`Error al hacer clic en "Continuar": ${error.message}`);
		}
	}
}
