import { Locator, Page } from "@playwright/test";

export class BasePage {
	// Locators
	protected readonly animation: Locator;

	// Siempre que se realice un new BasePage() se ejecutará el constructor
	// Colocamos Solo la localización de los elementos
	constructor(page: Page) {
		this.animation = page.getByTestId("CloseRoundedIcon");
	}

	// Aca interactuamos con los elementos
	// Método para cerrar la animación de carga
	async closeAnimation() {
		try {
			await this.animation.waitFor({ state: "visible" });
			await this.animation.click();
			await this.animation.waitFor({ state: "hidden" });
		} catch (error) {
			throw new Error(`Error al cerrar la animación: ${error.message}`);
		}
	}
}
