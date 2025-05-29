import { expect, Locator, Page } from "@playwright/test";

// Creacion de la clase LoginPage
export class LoginPage {
	// Locators
	private readonly page: Page;
	private readonly mailInput: Locator;
	private readonly passwordInput: Locator;
	private readonly loginButton: Locator;

	// Siempre que se realice un new LogInPage() se ejecutará el constructor
	// Colocamos Solo la localización de los elementos
	constructor(page: Page) {
		this.page = page;
		this.mailInput = page.getByPlaceholder("ejemplo@gmail.com");
		this.passwordInput = page.getByPlaceholder("Escribe tu contraseña");
		this.loginButton = page.getByTestId("login-button");
	}

	// Aca interactuamos con los elementos
	// Método Unificado para el Login
	async navegateToLogin() {
		const url = process.env.URL_NEGOTIATOR;
		if (!url) {
			throw new Error(
				"La variable de entorno URL_NEGOTIATOR no está definida."
			);
		}
		await this.page.goto(url);
	}

	// Método para llenar el campo "Correo"
	async fillMail() {
		const mail = process.env.MAIL;
		if (!mail) throw new Error("La variable de entorno MAIL no está definida.");
		await this.validateField(this.mailInput);
		await this.mailInput.fill(mail);
	}

	// Método para llenar el campo "Contraseña"
	async fillPassword() {
		const password = process.env.PASSWORD;
		if (!password)
			throw new Error("La variable de entorno PASSWORD no está definida.");
		await this.validateField(this.passwordInput);
		await this.passwordInput.fill(password);
	}

	// Garantiza que los input estén completamente listos para interactuar:
	private async validateField(field: Locator) {
		await expect(field).toBeVisible();
		await expect(field).toBeEditable();
		await expect(field).toBeEmpty();
	}

	async clickLogin() {
		await this.validateButton(this.loginButton);
		await this.loginButton.click();
		await this.waitForNetworkAndLoad(); // Esperar a que la acción se complete
	}

	// Garantiza que los botones estén completamente listos para interactuar:
	private async validateButton(button: Locator) {
		await expect(button).toBeVisible();
		await expect(button).toBeEnabled();
	}

	// Garantiza que la página esté completamente lista para interactuar:
	private async waitForNetworkAndLoad() {
		await this.page.waitForURL("**/mi-tablero");
		await this.page.waitForTimeout(500); // Pequeña pausa adicional
	}
}
