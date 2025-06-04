import { expect, Locator, Page } from "@playwright/test";

export class InventoryPage {
	// Locators
	private readonly page: Page;
	private readonly filter: Locator;
	private readonly inventoryHabi: Locator;
	private readonly showResults: Locator;
	private readonly titleLocation: Locator;

	// Siempre que se realice un new InventoryPage() se ejecutará el constructor
	// Colocamos Solo la localización de los elementos
	constructor(page: Page) {
		this.page = page;
		this.filter = page.getByTestId("TuneIcon");
		this.inventoryHabi = page.locator("div.sc-gwZKzw.pUyOn").nth(14);
		this.showResults = page.getByRole("button", { name: "Mostrar resultados" });
		this.titleLocation = page.locator("p.content__title-location");
	}

	// Aca interactuamos con los elementos
	// Método para hacer click en Filtros
	async clickFilter() {
		await expect(this.filter).toBeVisible();
		await expect(this.filter).toBeEnabled();
		await this.filter.click();
	}

	// Método para seleccionar Habi en el filtro
	async selectHabi() {
		await this.page.waitForLoadState("load");
		await expect(this.inventoryHabi).toBeVisible();
		await expect(this.inventoryHabi).toBeEnabled();
		await this.inventoryHabi.click();
	}

	// Método para hacer click en el botón de "Mostrar resultados"
	async clickShowResults() {
		await this.page.waitForLoadState("load");
		await expect(this.showResults).toBeVisible();
		await expect(this.showResults).toBeEnabled();
		await this.showResults.click();
	}

	// Método para listar los títulos de las propiedades
	async listTitles() {
		await this.page.waitForLoadState("load");
		// Espera a que al menos uno sea visible
		await expect(this.titleLocation.first()).toBeVisible();
		const titles = await this.titleLocation.allTextContents();
		console.log("Total de propiedades:", titles.length);
		for (const title of titles) {
			console.log("Título de la propiedad:", title);
		}
	}
}
