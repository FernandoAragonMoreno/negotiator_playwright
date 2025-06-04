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
		try {
			await expect(this.filter).toBeVisible();
			await expect(this.filter).toBeEnabled();
			await this.filter.click();
		} catch (error) {
			throw new Error(`Error al hacer clic en el filtro: ${error.message}`);
		}
	}

	// Método para seleccionar Habi en el filtro
	async selectHabi() {
		try {
			await this.page.waitForLoadState("load");
			await expect(this.inventoryHabi).toBeVisible();
			await expect(this.inventoryHabi).toBeEnabled();
			await this.inventoryHabi.click();
		} catch (error) {
			throw new Error(`Error al seleccionar Habi: ${error.message}`);
		}
	}

	// Método para hacer click en el botón de "Mostrar resultados"
	async clickShowResults() {
		try {
			await this.page.waitForLoadState("load");
			await expect(this.showResults).toBeVisible();
			await expect(this.showResults).toBeEnabled();
			await this.showResults.click();
		} catch (error) {
			throw new Error(
				`Error al hacer clic en "Mostrar resultados": ${error.message}`
			);
		}
	}

	// Método para listar los títulos de las propiedades
	async listTitles() {
		try {
			await this.page.waitForLoadState("load");
			// Espera a que al menos uno sea visible
			await expect(this.titleLocation.first()).toBeVisible();
			const titles = await this.titleLocation.allTextContents();
			console.log("Total de propiedades:", titles.length);
			for (const title of titles) {
				console.log("Título de la propiedad:", title);
			}
		} catch (error) {
			throw new Error(`Error al listar los títulos: ${error.message}`);
		}
	}

	async clickRandomTitle() {
		try {
			await this.page.waitForLoadState("load");
			await expect(this.titleLocation.first()).toBeVisible();
			const titles = await this.titleLocation.allTextContents();
			if (titles.length === 0) {
				throw new Error("No se encontraron títulos para seleccionar.");
			}
			const randomIndex = Math.floor(Math.random() * titles.length);
			console.log(
				`Seleccionando el título #${randomIndex + 1}: ${titles[randomIndex]}`
			);
			await this.titleLocation.nth(randomIndex).click();
		} catch (error) {
			throw new Error(
				`Error al hacer clic en un título aleatorio: ${error.message}`
			);
		}
	}
}
