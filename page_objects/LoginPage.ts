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
	// Método para navegar a la página de inicio de sesión
	async navegaToLogin() {
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

	// Método unificado para login
	async login(email?: string, password?: string) {
		try {
			await this.navegaToLogin();
			await this.fillEmail(email);
			await this.fillPassword(password);
			await this.clickLogin();
		} catch (error) {
			throw new Error(`Error en el proceso de login: ${error.message}`);
		}
	}

	// Método para llenar el campo "Correo"
	private async fillEmail(email = process.env.EMAIL) {
		try {
			if (!email)
				throw new Error("La variable de entorno MAIL no está definida.");
			await this.validateField(this.emailInput);
			await this.emailInput.fill(email);
		} catch (error) {
			throw new Error(`Error al llenar el mail: ${error.message}`);
		}
	}

	// Método para llenar el campo "Contraseña"
	private async fillPassword(password = process.env.PASSWORD) {
		try {
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
		try {
			await expect(field).toBeVisible();
			await expect(field).toBeEditable();
			await expect(field).toBeEmpty();
		} catch (error) {
			throw new Error(`Error al validar el campo: ${error.message}`);
		}
	}

	private async clickLogin() {
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
		try {
			await expect(button).toBeVisible();
			await expect(button).toBeEnabled();
		} catch (error) {
			throw new Error(`Error al validar el botón: ${error.message}`);
		}
	}

	// Este método solo pueden ser accedido y utilizado dentro de la propia clase donde está definido.
	// Se usa para encapsular la lógica interna y proteger funciones auxiliares.
	private async waitForNetworkAndLoad() {
		try {
			await this.page.waitForURL("**/mi-tablero");
			// Espera adicional para asegurar que la página esté completamente cargada
			await this.page.waitForLoadState("load");
		} catch (error) {
			throw new Error(
				`Error al esperar la carga de la página: ${error.message}`
			);
		}
	}
}
