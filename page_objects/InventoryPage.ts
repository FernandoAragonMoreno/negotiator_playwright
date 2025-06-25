import { expect, Locator, Page } from "@playwright/test";

export class InventoryPage {
	// Locators
	private readonly page: Page;
	private readonly filter: Locator;
	private readonly inventoryHabi: Locator;
	private readonly showResults: Locator;
	private readonly titleLocation: Locator;
	private readonly searchCityColonyNID: Locator;
	private readonly foundNID: Locator;
	private readonly card: Locator;
	private readonly animation: Locator;
	//private readonly nid: Locator;

	// Siempre que se realice un new InventoryPage() se ejecutará el constructor
	// Colocamos Solo la localización de los elementos
	constructor(page: Page) {
		this.page = page;
		this.filter = page.getByTestId("TuneIcon");
		this.inventoryHabi = page.locator('div[class="sc-dAEZTx hDmaNl"]').nth(14);
		this.showResults = page.getByRole("button", { name: "Mostrar resultados" });
		this.titleLocation = page.locator("p.content__title-location");
		this.searchCityColonyNID = page.getByPlaceholder("Ciudad, Colonia, NID");
		this.foundNID = page.locator('div[class="sc-ZbTNT dAFDDv"]');
		this.card = page.locator("div#property-64150");
		this.animation = page.getByTestId("CloseRoundedIcon");
		//this.nid = page.getByTestId("customBadge-container").nth(1);
	}

	// Aca interactuamos con los elementos
	async closeAnimation() {
		try {
			await expect(this.animation).toBeVisible();
			await this.animation.click();
			await expect(this.animation).not.toBeVisible();
		} catch (error) {
			throw new Error(`Error al cerrar la animación: ${error.message}`);
		}
	}

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
			// Solo haz clic si NO está activo
			const isActive = await this.inventoryHabi.evaluate((el) =>
				el.classList.contains("active")
			);
			if (!isActive) {
				await this.inventoryHabi.click();
			}
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

	// Método para hacer clic en un título aleatorio
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

	// Método para buscar por Ciudad, Colonia o NID
	async searchByCityColonyNidParOpcionA() {
		try {
			const nid = process.env.NidParOpcionA;
			if (!nid) {
				throw new Error(
					"La variable de entorno NID_PAR_OPCION_A no está definida."
				);
			}
			await this.page.waitForLoadState("load");
			await expect(this.searchCityColonyNID).toBeVisible();
			await expect(this.searchCityColonyNID).toBeEditable();
			await this.searchCityColonyNID.fill(nid);
			// Espera a que los resultados se actualicen
			await this.page.waitForLoadState("load");
		} catch (error) {
			throw new Error(
				`Error al buscar por Ciudad, Colonia o NID: ${error.message}`
			);
		}
	}

	// Método para hacer clic en el NID buscado
	async clickOnSearchedNID() {
		try {
			await this.page.waitForLoadState("load");
			await expect(this.foundNID).toBeVisible();
			await expect(this.foundNID).toBeEnabled();
			await this.foundNID.click();
		} catch (error) {
			throw new Error(
				`Error al hacer clic en el NID buscado: ${error.message}`
			);
		}
	}

	// Método para hacer clic en una tarjeta específica
	async clickOnCard() {
		try {
			await this.page.waitForLoadState("load");
			await expect(this.card).toBeVisible();
			await expect(this.card).toBeEnabled();
			await this.card.click();
		} catch (error) {
			throw new Error(`Error al hacer clic en la tarjeta: ${error.message}`);
		}
	}

	// Método para verificar el primer modal de chapa electrónica
	async verifyFirstModalLock() {
		try {
			// Espera a que se abra una nueva página (ventana/modal)
			const [newPage] = await Promise.all([
				this.page.context().waitForEvent("page"),
				// Aquí deberías realizar la acción que abre la nueva ventana/modal
				await this.clickOnCard(),
			]);
			await newPage.waitForLoadState("load");
			// Verifica el NID en la nueva página
			await expect(newPage).toHaveURL(/.*\/propiedad\/64150/);
		} catch (error) {
			throw new Error(
				`Error al verificar el primer modal de chapa electrónica: ${error.message}`
			);
		}
	}
}
