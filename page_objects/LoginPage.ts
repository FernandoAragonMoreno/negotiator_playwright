import { expect, Locator, Page } from "@playwright/test";

// Creacion de la clase LoginPage
export class LoginPage {
	// Locators
	private readonly page: Page;
	private readonly emailInput: Locator;
	private readonly passwordInput: Locator;
	private readonly loginButton: Locator;

	// Siempre que se realice un new LogInPage() se ejecutará el constructor
	// Colocamos Solo la localización de los elementos
	constructor(page: Page) {
		this.page = page;
		this.emailInput = page.getByPlaceholder("ejemplo@gmail.com");
		this.passwordInput = page.getByPlaceholder("Escribe tu contraseña");
		this.loginButton = page.getByTestId("login-button");
	}

	// Aca interactuamos con los elementos
	// Método Unificado para el Login
	async navegateToLogin() {
		try {
			const url = process.env.URL_NEGOTIATOR;
			if (!url) {
				throw new Error(
					"La variable de entorno URL_NEGOTIATOR no está definida."
				);
			}
			await this.page.goto(url);
		} catch (error) {
			throw new Error(`Error al navegar a la url: ${error.message}`);
		}
	}

	// Método para llenar el campo "Correo"
	async fillEmail() {
		try {
			const email = process.env.EMAIL;
			if (!email)
				throw new Error("La variable de entorno MAIL no está definida.");
			await this.validateField(this.emailInput);
			await this.emailInput.fill(email);
		} catch (error) {
			throw new Error(`Error al llenar el mail: ${error.message}`);
		}
	}

	// Método para llenar el campo "Contraseña"
	async fillPassword() {
		try {
			const password = process.env.PASSWORD;
			if (!password)
				throw new Error("La variable de entorno PASSWORD no está definida.");
			await this.validateField(this.passwordInput);
			await this.passwordInput.fill(password);
		} catch (error) {
			throw new Error(`Error al llenar la contraseña: ${error.message}`);
		}
	}

	// Este método solo pueden ser accedido y utilizado dentro de la propia clase donde está definido.
	// Se usa para encapsular la lógica interna y proteger funciones auxiliares.
	private async validateField(field: Locator) {
		await expect(field).toBeVisible();
		await expect(field).toBeEditable();
		await expect(field).toBeEmpty();
	}

	async clickLogin() {
		try {
			await this.validateButton(this.loginButton);
			await this.loginButton.click();
			await this.waitForNetworkAndLoad(); // Esperar a que la acción se complete
		} catch (error) {
			throw new Error(`Error al hacer click en el login: ${error.message}`);
		}
	}

	// Este método solo pueden ser accedido y utilizado dentro de la propia clase donde está definido.
	// Se usa para encapsular la lógica interna y proteger funciones auxiliares.
	private async validateButton(button: Locator) {
		await expect(button).toBeVisible();
		await expect(button).toBeEnabled();
	}

	// Este método solo pueden ser accedido y utilizado dentro de la propia clase donde está definido.
	// Se usa para encapsular la lógica interna y proteger funciones auxiliares.
	private async waitForNetworkAndLoad() {
		await this.page.waitForURL("**/mi-tablero");
		// Espera adicional para asegurar que la página esté completamente cargada
		await this.page.waitForLoadState("load");
	}
}
