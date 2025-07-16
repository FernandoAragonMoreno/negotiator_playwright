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
	private readonly inputColony: Locator;
	private readonly inputCityResidence: Locator;
	private readonly inputHome: Locator;
	private readonly dropdownNationality: Locator;
	private readonly dropdownCountryBirth: Locator;
	private readonly dropdownCountryResidence: Locator;
	private readonly dropdownState: Locator;
	private readonly dropdownPayrollReceipt: Locator;
	private readonly dropdownOccupation: Locator;
	private readonly inputCredit: Locator;
	private readonly buttonOffer: Locator;
	private readonly offerReceivedMessage: Locator;
	private readonly understoodButton: Locator;

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
		this.inputColony = page.getByPlaceholder("Escribe la colonia");
		this.inputCityResidence = page.getByPlaceholder(
			"Escribe la ciudad de residencia"
		);
		this.inputHome = page.getByPlaceholder("Escribe tu domicilio");
		this.dropdownNationality = page.getByTestId("dropdown-button").nth(5);
		this.dropdownCountryBirth = page.locator('input[name="country_of_birth"]');
		this.dropdownCountryResidence = page.locator(
			'input[name="country_of_residence"]'
		);
		this.dropdownState = page.locator('input[name="state_place"]');
		this.dropdownPayrollReceipt = page.getByTestId("dropdown-button").nth(6);
		this.dropdownOccupation = page.getByPlaceholder(
			"Selecciona una opción o escribe una opción"
		);
		this.inputCredit = page.getByPlaceholder(
			"Monto crédito bancario autorizado"
		);
		this.buttonOffer = page.getByRole("button", { name: "Ofertar" });
		this.offerReceivedMessage = page.locator(
			"div.wrapper__offer-titles > p.wrapper__offer__titles-title"
		);
		this.understoodButton = page.getByRole("button", { name: "Entendido" });
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

	private generateRandomCreditAmount(): string {
		// Genera un número aleatorio entre 100,000 y 9,999,999 (hasta 11 caracteres)
		const min = 100000;
		const max = 9999999;
		const randomAmount = Math.floor(Math.random() * (max - min + 1)) + min;
		return randomAmount.toString();
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
			await this.inputCellPhoneNumber.click();

			// IMPORTANTE: Llenar con el formato completo incluyendo +52
			const fullPhoneNumber = `+52${cellphone}`;
			await this.inputCellPhoneNumber.fill(fullPhoneNumber);
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
			await expect(this.inputConfirmCellPhoneNumber).toBeVisible({
				timeout: 50000,
			});
			await expect(this.inputConfirmCellPhoneNumber).toBeEnabled();
			await this.inputConfirmCellPhoneNumber.click();

			// Llenar con formato completo
			const fullPhoneNumber = `+52${cellphone}`;
			await this.inputConfirmCellPhoneNumber.fill(fullPhoneNumber);
		} catch (error) {
			throw new Error(
				`Error al confirmar el número de celular: ${error.message}`
			);
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
			await expect(this.page.locator("li[data-value]").first()).not.toBeVisible(
				{ timeout: 10000 }
			);
			await expect(this.dropdownMunicipality).not.toHaveText("");
			await expect(this.dropdownMunicipality).not.toContainText("Selecciona");
		} catch (error) {
			throw new Error(`Error al seleccionar municipio: ${error.message}`);
		}
	}

	async fillColony() {
		try {
			await expect(this.inputColony).toBeVisible({ timeout: 50000 });
			await expect(this.inputColony).toBeEnabled();
			await this.inputColony.fill("Colonia Fer");
			await expect(this.inputColony).not.toHaveValue("");
		} catch (error) {
			throw new Error(`Error al llenar la colonia: ${error.message}`);
		}
	}

	async fillCityResidence() {
		try {
			await expect(this.inputCityResidence).toBeVisible({ timeout: 50000 });
			await expect(this.inputCityResidence).toBeEnabled();
			await this.inputCityResidence.fill("Ciudad de residencia Fer");
		} catch (error) {
			throw new Error(
				`Error al llenar la ciudad de residencia: ${error.message}`
			);
		}
	}

	async fillHome() {
		try {
			await expect(this.inputHome).toBeVisible({ timeout: 50000 });
			await expect(this.inputHome).toBeEnabled();
			await this.inputHome.fill("Domicilio Fer");
		} catch (error) {
			throw new Error(`Error al llenar el domicilio: ${error.message}`);
		}
	}

	async clickNationality() {
		try {
			await expect(this.dropdownNationality).toBeVisible({ timeout: 50000 });
			await this.dropdownNationality.click();
		} catch (error) {
			throw new Error(`Error al hacer clic en nacionalidad: ${error.message}`);
		}
	}

	async selectRandomNationality() {
		try {
			// Ejecuta código en el contexto de la página del navegador
			const nacionalidadAleatoria = await this.page.evaluate(() => {
				const nacionalidades = Array.from(
					document.querySelectorAll("li[data-value]")
				)
					.filter(
						(li) =>
							li.getAttribute("data-value") !== "" &&
							li.getAttribute("data-value") !== null
					)
					.map((li) => li.getAttribute("data-value"));

				return nacionalidades[
					Math.floor(Math.random() * nacionalidades.length)
				];
			});
			await this.page
				.locator(`li[data-value="${nacionalidadAleatoria}"]`)
				.click();
			await expect(this.page.locator("li[data-value]").first()).not.toBeVisible(
				{ timeout: 10000 }
			);
			await expect(this.dropdownNationality).not.toHaveText("");
			await expect(this.dropdownNationality).not.toContainText("Selecciona");
		} catch (error) {
			throw new Error(`Error al seleccionar nacionalidad: ${error.message}`);
		}
	}

	async clickCountryBirth() {
		try {
			await expect(this.dropdownCountryBirth).toBeVisible({ timeout: 50000 });
			await this.dropdownCountryBirth.click();
		} catch (error) {
			throw new Error(
				`Error al hacer clic en país de nacimiento: ${error.message}`
			);
		}
	}

	async selectRandomCountryBirth() {
		try {
			await this.page.waitForSelector('li[role="option"]', { timeout: 10000 });
			const paisNacimientoAleatorio = await this.page.evaluate(() => {
				const paises = Array.from(
					document.querySelectorAll('li[role="option"]')
				)
					.filter(
						(li) =>
							li.textContent &&
							li.textContent.trim() !== "" &&
							!li.textContent.includes("Selecciona")
					)
					.map((li) => ({
						text: li.textContent?.trim(),
						id: li.id,
						index: li.getAttribute("data-option-index"),
					}));

				return paises[Math.floor(Math.random() * paises.length)];
			});
			await this.page
				.locator(
					`li[role="option"]:has-text("${paisNacimientoAleatorio.text}")`
				)
				.click();
			await expect(
				this.page.locator('li[role="option"]').first()
			).not.toBeVisible({ timeout: 10000 });
			await expect(this.dropdownCountryBirth).not.toHaveValue("");
		} catch (error) {
			throw new Error(
				`Error al seleccionar país de nacimiento: ${error.message}`
			);
		}
	}

	async clickCountryResidence() {
		try {
			await expect(this.dropdownCountryResidence).toBeVisible({
				timeout: 50000,
			});
			await this.dropdownCountryResidence.click();
		} catch (error) {
			throw new Error(
				`Error al hacer clic en país de residencia: ${error.message}`
			);
		}
	}

	async selectRandomCountryResidence() {
		try {
			await this.page.waitForSelector('li[role="option"]', { timeout: 10000 });
			const paisResidenciaAleatorio = await this.page.evaluate(() => {
				const paises = Array.from(
					document.querySelectorAll('li[role="option"]')
				)
					.filter(
						(li) =>
							li.textContent &&
							li.textContent.trim() !== "" &&
							!li.textContent.includes("Selecciona")
					)
					.map((li) => ({
						text: li.textContent?.trim(),
						id: li.id,
						index: li.getAttribute("data-option-index"),
					}));

				return paises[Math.floor(Math.random() * paises.length)];
			});
			await this.page
				.locator(
					`li[role="option"]:has-text("${paisResidenciaAleatorio.text}")`
				)
				.click();
			await expect(
				this.page.locator('li[role="option"]').first()
			).not.toBeVisible({ timeout: 10000 });
			await expect(this.dropdownCountryResidence).not.toHaveValue("");
		} catch (error) {
			throw new Error(
				`Error al seleccionar país de residencia: ${error.message}`
			);
		}
	}

	async clickState() {
		try {
			await expect(this.dropdownState).toBeVisible({ timeout: 50000 });
			await this.dropdownState.click();
		} catch (error) {
			throw new Error(`Error al hacer clic en estado: ${error.message}`);
		}
	}

	async selectRandomState() {
		try {
			await this.page.waitForSelector('li[role="option"]', { timeout: 10000 });
			const estadoAleatorio = await this.page.evaluate(() => {
				const estados = Array.from(
					document.querySelectorAll('li[role="option"]')
				)
					.filter(
						(li) =>
							li.textContent &&
							li.textContent.trim() !== "" &&
							!li.textContent.includes("Selecciona")
					)
					.map((li) => ({
						text: li.textContent?.trim(),
						id: li.id,
						index: li.getAttribute("data-option-index"),
					}));
				return estados[Math.floor(Math.random() * estados.length)];
			});
			await this.page
				.getByRole("option", { name: estadoAleatorio.text, exact: true })
				.click();
			await expect(
				this.page.locator('li[role="option"]').first()
			).not.toBeVisible({ timeout: 10000 });
			await expect(this.dropdownState).not.toHaveValue("");
		} catch (error) {
			throw new Error(`Error al seleccionar estado: ${error.message}`);
		}
	}

	async clickPayrollReceipt() {
		try {
			await expect(this.dropdownPayrollReceipt).toBeVisible({
				timeout: 50000,
			});
			await this.dropdownPayrollReceipt.click();
		} catch (error) {
			throw new Error(
				`Error al hacer clic en recibo de nómina: ${error.message}`
			);
		}
	}

	async selectRandomPayrollReceipt() {
		try {
			const reciboNominaAleatorio = await this.page.evaluate(() => {
				const recibos = Array.from(
					document.querySelectorAll('li[role="option"][data-value]')
				)
					.filter(
						(li) =>
							li.getAttribute("data-value") !== "" &&
							li.getAttribute("data-value") !== null &&
							li.getAttribute("data-value") !== "Selecciona" // Excluir opción placeholder
					)
					.map((li) => ({
						value: li.getAttribute("data-value"),
						text: li.textContent?.trim(),
					}));
				return recibos[Math.floor(Math.random() * recibos.length)];
			});
			await this.page
				.locator(
					`li[role="option"][data-value="${reciboNominaAleatorio.value}"]`
				)
				.click();
			await expect(
				this.page.locator('li[role="option"][data-value]').first()
			).not.toBeVisible({ timeout: 10000 });
			await expect(this.dropdownPayrollReceipt).not.toContainText("Selecciona");
		} catch (error) {
			throw new Error(
				`Error al seleccionar recibo de nómina: ${error.message}`
			);
		}
	}

	async clickOccupation() {
		try {
			await expect(this.dropdownOccupation).toBeVisible({ timeout: 50000 });
			await this.dropdownOccupation.click();
		} catch (error) {
			throw new Error(`Error al hacer clic en ocupación: ${error.message}`);
		}
	}

	async selectRandomOccupation() {
		try {
			await this.page.waitForSelector('li[role="option"]', { timeout: 10000 });
			const ocupacionAleatoria = await this.page.evaluate(() => {
				const ocupaciones = Array.from(
					document.querySelectorAll('li[role="option"]')
				)
					.filter(
						(li) =>
							li.textContent &&
							li.textContent.trim() !== "" &&
							!li.textContent.includes("Selecciona")
					)
					.map((li) => ({
						text: li.textContent?.trim(),
						id: li.id,
						index: li.getAttribute("data-option-index"),
					}));
				return ocupaciones[Math.floor(Math.random() * ocupaciones.length)];
			});
			await this.page
				.locator(`li[role="option"]:has-text("${ocupacionAleatoria.text}")`)
				.click();
			await expect(
				this.page.locator('li[role="option"]').first()
			).not.toBeVisible({ timeout: 10000 });
			await expect(this.dropdownOccupation).not.toHaveValue("");
		} catch (error) {
			throw new Error(`Error al seleccionar ocupación: ${error.message}`);
		}
	}

	async fillCreditAmount() {
		try {
			await expect(this.inputCredit).toBeVisible({ timeout: 50000 });
			await expect(this.inputCredit).toBeEnabled();
			await this.inputCredit.clear();
			const randomCreditAmount = this.generateRandomCreditAmount();
			await this.inputCredit.fill(randomCreditAmount);
		} catch (error) {
			throw new Error(`Error al llenar el monto de crédito: ${error.message}`);
		}
	}

	async clickOfferButton() {
		try {
			await this.page.keyboard.press("Tab");
			await expect(this.buttonOffer).toBeVisible({ timeout: 50000 });
			await expect(this.buttonOffer).toBeEnabled();
			await this.buttonOffer.click();
		} catch (error) {
			throw new Error(
				`Error al hacer clic en el botón de ofertar: ${error.message}`
			);
		}
	}

	async clickUnderstoodButton() {
		try {
			await expect(this.offerReceivedMessage).toBeVisible({ timeout: 50000 });
			await expect(this.offerReceivedMessage).toHaveText(
				"¡Tu oferta será revisada de forma inmediata!"
			);
			await expect(this.understoodButton).toBeVisible({ timeout: 50000 });
			await expect(this.understoodButton).toBeEnabled();
			await this.understoodButton.click();
		} catch (error) {
			throw new Error(
				`Error al hacer clic en el botón entendido: ${error.message}`
			);
		}
	}
}
