import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
export class MyBoardPage extends BasePage {
	// Locators
	private readonly page: Page;
	private readonly inventoryDesktopHref: Locator;
	private readonly inventoryMobileHref: Locator;
	protected readonly animation: Locator;

	// Siempre que se realice un new MyBoardPage() se ejecutará el constructor
	// Colocamos Solo la localización de los elementos
	constructor(page: Page) {
		super(page); // Llamar al constructor de la clase base si es necesario
		this.page = page;
		this.inventoryDesktopHref = page.getByTestId("menu-desktop-Inventario");
		this.inventoryMobileHref = page.getByTestId("mobile-Inventario-route");
		this.animation = page.getByTestId("CloseRoundedIcon");
	}

	// Aca interactuamos con los elementos
	// Método para hacer clic en "Inventario"
	async clickInventory() {
		try {
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
		} catch (error) {
			throw new Error(`Error al acceder al inventario: ${error.message}`);
		}
	}

	// Este método solo pueden ser accedido y utilizado dentro de la propia clase donde está definido.
	// Se usa para encapsular la lógica interna y proteger funciones auxiliares.
	private async waitForNetworkAndLoad() {
		try {
			await this.page.waitForURL("**/inventario");
			// Espera adicional para asegurar que la página esté completamente cargada
			await this.page.waitForLoadState("load");
		} catch (error) {
			throw new Error(
				`Error al esperar la carga de la página: ${error.message}`
			);
		}
	}
}
