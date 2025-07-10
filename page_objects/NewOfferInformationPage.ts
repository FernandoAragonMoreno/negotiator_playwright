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

	async fillInformation() {
		try {
			const rfc = process.env.RFC;
			if (!rfc) {
				throw new Error("La variable de entorno RFC no está definida.");
			}
			await this.inputRFC.fill(rfc);

			const curp = process.env.CURP;
			if (!curp) {
				throw new Error("La variable de entorno CURP no está definida.");
			}
			await this.inputCURP.fill(curp);

			const randomNumberID = this.generateRandomNumberID();
			await this.inputID.fill(randomNumberID);

			await this.dropdownDocumentIssuingAuthority.click();
			await this.OptionINE.click();

			const cellphone = process.env.CellPhoneNumber;
			if (!cellphone) {
				throw new Error(
					"La variable de entorno CellPhoneNumber no está definida."
				);
			}
			await expect(this.inputCellPhoneNumber).toBeVisible({ timeout: 50000 });
			await expect(this.inputCellPhoneNumber).toBeEnabled();
			await this.inputCellPhoneNumber.fill(cellphone);

			await expect(this.inputConfirmCellPhoneNumber).toBeVisible({
				timeout: 50000,
			});
			await expect(this.inputConfirmCellPhoneNumber).toBeEnabled();
			await this.inputConfirmCellPhoneNumber.fill(cellphone);

			const email = process.env.CustomerEmail;
			if (!email) {
				throw new Error(
					"La variable de entorno CustomerEmail no está definida."
				);
			}
			await this.inputEmail.fill(email);
			await this.inputConfirmEmail.fill(email);

			const zipCode = this.generateRandomZipCode();
			await this.inputZipCode.fill(zipCode);

			await expect(this.dropdownMunicipality).toBeVisible({ timeout: 50000 });
			await this.dropdownMunicipality.click();

			// Obtener todos los elementos <li> que contienen municipios (excluyendo el primero que es "Selecciona el municipio")
			const municipios = Array.from(document.querySelectorAll("li[data-value]"))
				.filter((li) => li.getAttribute("data-value") !== "")
				.map((li) => li.getAttribute("data-value"));

			// Seleccionar un municipio al azar
			const municipioAleatorio =
				municipios[Math.floor(Math.random() * municipios.length)];

			// Imprimir el municipio seleccionado
			console.log(municipioAleatorio);
		} catch (error) {
			throw new Error(`Error al llenar la información: ${error.message}`);
		}
	}
}
