import { expect, Locator, Page } from "@playwright/test";

export class MyBoardPage {
	// Locators
	private readonly page: Page;
	private readonly inventoryDesktopHref: Locator;
	private readonly inventoryMobileHref: Locator;

	// Siempre que se realice un new MyBoardPage() se ejecutará el constructor
	// Colocamos Solo la localización de los elementos
	constructor(page: Page) {
		this.page = page;
		this.inventoryDesktopHref = page.getByTestId("menu-desktop-Inventario");
		this.inventoryMobileHref = page.getByTestId("mobile-Inventario-route");
	}

	// Aca interactuamos con los elementos
	// Método para hacer clic en "Inventario"
	async clickInventory() {
		const isDesktopVisible = await this.inventoryDesktopHref.isVisible();
		const inventory = isDesktopVisible
			? this.inventoryDesktopHref
			: this.inventoryMobileHref;
		console.log(
			`Haciendo clic en el inventario: ${
				isDesktopVisible ? "Desktop" : "Mobile"
			}`
		);
		await expect(inventory).toBeVisible();
		await expect(inventory).toBeEnabled();
		await inventory.click();
		await this.waitForNetworkAndLoad(); // Esperar a que la acción se complete
	}

	// Garantiza que la página esté completamente lista para interactuar:
	private async waitForNetworkAndLoad() {
		await this.page.waitForURL("**/inventario");
		await this.page.waitForTimeout(500); // Pequeña pausa adicional
	}
}
