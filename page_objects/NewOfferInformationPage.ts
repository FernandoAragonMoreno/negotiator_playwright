import { expect, Locator, Page } from "@playwright/test";

export class NewOfferInformationPage {
	// Locators
	private readonly page: Page;
	private readonly inputRFC: Locator;
	private readonly inputCURP: Locator;
	private readonly inputID: Locator;
	private readonly dropdownDocumentIssuingAuthority: Locator;
	private readonly OptionINE: Locator;
	private readonly inputCellPhoneNumber: Locator;
	private readonly inputConfirmCellPhoneNumber: Locator;
	private readonly inputEmail: Locator;
	private readonly inputConfirmEmail: Locator;
	private readonly inputZipCode: Locator;
	private readonly dropdownMunicipality: Locator;

	constructor(page: Page) {
		this.page = page;
		this.inputRFC = page.getByPlaceholder("Escribe tu RFC");
		this.inputCURP = page.getByPlaceholder("Escribe tu CURP");
		this.inputID = page.getByPlaceholder("Número de identificación");
		this.dropdownDocumentIssuingAuthority = page
			.getByTestId("dropdown-button")
			.nth(1);
		this.OptionINE = page.getByRole("option", {
			name: "Instituto Nacional Electoral",
		});
		this.inputCellPhoneNumber = page
			.getByPlaceholder("Número de celular")
			.first();
		this.inputConfirmCellPhoneNumber = page
			.getByPlaceholder("Confirma el número de celular")
			.first();
		this.inputEmail = page.getByPlaceholder("Correo electrónico").first();
		this.inputConfirmEmail = page
			.getByPlaceholder("Confirma el correo electrónico")
			.first();
		this.inputZipCode = page.getByPlaceholder("Escribe tu Código postal");
		this.dropdownMunicipality = page.getByTestId("dropdown-button").nth(4);
	}

	private generateRandomNumberID(): string {
		const length = Math.floor(Math.random() * 5) + 8; // 8-12 dígitos
		let result = "";
		for (let i = 0; i < length; i++) {
			result += Math.floor(Math.random() * 10);
		}
		return result;
	}

	private generateRandomZipCode(): string {
		const length = 5; // Código postal de 5 dígitos
		let result = "";
		for (let i = 0; i < length; i++) {
			result += Math.floor(Math.random() * 10);
		}
		return result;
	}

	async fillRFC() {
		try {
			const rfc = process.env.RFC;
			if (!rfc) {
				throw new Error("La variable de entorno RFC no está definida.");
			}
			await this.inputRFC.fill(rfc);
		} catch (error) {
			throw new Error(`Error al llenar el RFC: ${error.message}`);
		}
	}

	async fillCURP() {
		try {
			const curp = process.env.CURP;
			if (!curp) {
				throw new Error("La variable de entorno CURP no está definida.");
			}
			await this.inputCURP.fill(curp);
		} catch (error) {
			throw new Error(`Error al llenar el CURP: ${error.message}`);
		}
	}

	async fillNumberID() {
		try {
			const randomNumberID = this.generateRandomNumberID();
			await this.inputID.fill(randomNumberID);
		} catch (error) {
			throw new Error(
				`Error al llenar el número de identificación: ${error.message}`
			);
		}
	}

	async fillDocumentIssuingAuthority() {
		try {
			await this.dropdownDocumentIssuingAuthority.click();
			await this.OptionINE.click();
		} catch (error) {
			throw new Error(
				`Error al seleccionar la autoridad emisora del documento: ${error.message}`
			);
		}
	}

	async fillCellPhoneNumber() {
		try {
			const cellphone = process.env.CellPhoneNumber;
			if (!cellphone) {
				throw new Error(
					"La variable de entorno CellPhoneNumber no está definida."
				);
			}

			await expect(this.inputCellPhoneNumber).toBeVisible({ timeout: 50000 });
			await expect(this.inputCellPhoneNumber).toBeEnabled();
			await this.inputCellPhoneNumber.fill(cellphone);

			// Verificar que el campo contiene los dígitos del número (ignorando formato)
			const actualValue = await this.inputCellPhoneNumber.inputValue();
			const digitsOnly = cellphone.replace(/\D/g, ""); // Solo dígitos del input
			expect(actualValue).toContain(digitsOnly);
		} catch (error) {
			throw new Error(`Error al llenar el número de celular: ${error.message}`);
		}
	}

	async fillConfirmCellPhoneNumber() {
		try {
			const cellphone = process.env.CellPhoneNumber;
			if (!cellphone) {
				throw new Error(
					"La variable de entorno CellPhoneNumber no está definida."
				);
			}
			// Validación campo de confirmación
			await expect(this.inputConfirmCellPhoneNumber).toBeVisible({
				timeout: 50000,
			});
			await expect(this.inputConfirmCellPhoneNumber).toBeEnabled();
			await expect(this.inputConfirmCellPhoneNumber).toBeEditable();
			await this.inputConfirmCellPhoneNumber.fill(cellphone);

			// Verificar que el valor se ingresó correctamente
			await expect(this.inputConfirmCellPhoneNumber).toHaveValue(cellphone);
		} catch (error) {
			throw new Error(`Error al llenar el número de celular: ${error.message}`);
		}
	}

	async fillCustomerEmail() {
		try {
			const email = process.env.CustomerEmail;
			if (!email) {
				throw new Error(
					"La variable de entorno CustomerEmail no está definida."
				);
			}
			await expect(this.inputEmail).toBeVisible({ timeout: 50000 });
			await expect(this.inputEmail).toBeEnabled();
			await this.inputEmail.fill(email);
			await expect(this.inputConfirmEmail).toBeVisible({ timeout: 50000 });
			await expect(this.inputConfirmEmail).toBeEnabled();
			await this.inputConfirmEmail.fill(email);
		} catch (error) {
			throw new Error(
				`Error al llenar el correo electrónico: ${error.message}`
			);
		}
	}

	async fillZipCode() {
		try {
			await expect(this.inputZipCode).toBeVisible({ timeout: 50000 });
			await expect(this.inputZipCode).toBeEnabled();
			const zipCode = this.generateRandomZipCode();
			await this.inputZipCode.fill(zipCode);
		} catch (error) {
			throw new Error(`Error al llenar el código postal: ${error.message}`);
		}
	}

	async clickMunicipality() {
		try {
			await expect(this.dropdownMunicipality).toBeVisible({ timeout: 50000 });
			await this.dropdownMunicipality.click();
		} catch (error) {
			throw new Error(`Error al llenar la información: ${error.message}`);
		}
	}

	async selectRandomMunicipality() {
		try {
			// Ejecuta código en el contexto de la página del navegador
			const municipioAleatorio = await this.page.evaluate(() => {
				const municipios = Array.from(
					document.querySelectorAll("li[data-value]")
				)
					.filter((li) => li.getAttribute("data-value") !== "")
					.map((li) => li.getAttribute("data-value"));

				return municipios[Math.floor(Math.random() * municipios.length)];
			});
			await this.page.locator(`li[data-value="${municipioAleatorio}"]`).click();
		} catch (error) {
			throw new Error(`Error al seleccionar municipio: ${error.message}`);
		}
	}
}
