import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { PropertyPage } from "./PropertyPage";
export class InventoryPage extends BasePage {
	// Locators
	private readonly page: Page;
	private readonly filter: Locator;
	private readonly inventoryHabi: Locator;
	private readonly showResults: Locator;
	private readonly card: Locator;
	private readonly titleLocation: Locator;
	private readonly searchCityColonyNID: Locator;
	private readonly foundNID: Locator;
	private readonly specificCard: Locator;
	private readonly offer: Locator;

	// Siempre que se realice un new InventoryPage() se ejecutará el constructor
	// Colocamos Solo la localización de los elementos
	constructor(page: Page) {
		super(page); // Llamar al constructor de la clase base si es necesario
		this.page = page;
		this.filter = page.getByTestId("TuneIcon");
		this.inventoryHabi = page.locator('div[class="sc-dAEZTx hDmaNl"]').nth(14);
		this.showResults = page.getByRole("button", { name: "Mostrar resultados" });
		this.card = page.getByTestId("wrapper-card");
		this.titleLocation = page.locator("p.content__title-location");
		this.searchCityColonyNID = page.getByPlaceholder("Ciudad, Colonia, NID");
		this.foundNID = page.locator('div[class="sc-ZbTNT dAFDDv"]');
		this.specificCard = page.locator("div#property-64150");
		this.offer = page.getByRole("button", { name: "Ofertar" });
	}

	// Aca interactuamos con los elementos
	// Método para hacer click en Filtros
	async clickFilter() {
		try {
			await expect(this.filter).toBeVisible({ timeout: 50000 });
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
			await expect(this.inventoryHabi).toBeVisible({ timeout: 50000 });
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
			await expect(this.showResults).toBeVisible({ timeout: 50000 });
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
			await expect(this.card.first()).toBeVisible();
			const titles = await this.titleLocation.allTextContents();
			console.log("Total de propiedades:", titles.length);
			for (const title of titles) {
				console.log("Título de la propiedad:", title);
			}
		} catch (error) {
			throw new Error(`Error al listar los títulos: ${error.message}`);
		}
	}

	// Método para hacer clic en una tarjeta aleatoria
	async clickRandomCard() {
		try {
			await this.page.waitForLoadState("load");
			await expect(this.card.first()).toBeVisible({ timeout: 50000 });
			const titles = await this.titleLocation.allTextContents();
			if (titles.length === 0) {
				throw new Error("No se encontraron títulos para seleccionar.");
			}
			const randomIndex = Math.floor(Math.random() * titles.length);
			const id = await this.card.nth(randomIndex).getAttribute("id");
			// Reemplaza la cadena "property-" por una cadena vacía.
			const propertyID = id?.replace("property-", "");
			await this.card.nth(randomIndex).click();
			return propertyID;
		} catch (error) {
			throw new Error(
				`Error al hacer clic en un título aleatorio: ${error.message}`
			);
		}
	}

	// Método para buscar por Ciudad, Colonia o NID
	async searchByCityColonyNidParOptionA() {
		try {
			const nid = process.env.NidParOptionA;
			if (!nid) {
				throw new Error(
					"La variable de entorno NID_PAR_OPCIÓN_A no está definida."
				);
			}
			await this.page.waitForLoadState("load");
			await expect(this.searchCityColonyNID).toBeVisible({ timeout: 50000 });
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
			await expect(this.foundNID).toBeVisible({ timeout: 50000 });
			await expect(this.foundNID).toBeEnabled();
			await this.foundNID.click();
		} catch (error) {
			throw new Error(
				`Error al hacer clic en el NID buscado: ${error.message}`
			);
		}
	}

	// Método para hacer clic en una tarjeta específica
	async clickOnSpecificCard() {
		try {
			await this.page.waitForLoadState("load");
			await expect(this.specificCard).toBeVisible({ timeout: 50000 });
			await expect(this.specificCard).toBeEnabled();
			await this.specificCard.click();
		} catch (error) {
			throw new Error(`Error al hacer clic en la tarjeta: ${error.message}`);
		}
	}

	// Método para verificar la propiedad en una nueva página
	async verifyProperty(propertyID: string) {
		try {
			// Espera a que se abra una nueva página (ventana/modal)
			const newPage = await this.page.context().waitForEvent("page");
			await expect(
				newPage.getByRole("button", { name: "Ofertar" })
			).toBeVisible({ timeout: 50000 });
			// Verifica el propertyID en la nueva URL
			await expect(newPage).toHaveURL(new RegExp(`/propiedad/${propertyID}`));
			const propertyPage = new PropertyPage(newPage);
			await propertyPage.clickOffer();
			return newPage;
			/*
			await newPage
				.getByText("Este inmueble incluye chapa electrónica.")
				.click();
			*/
		} catch (error) {
			throw new Error(`Error al verificar la propiedad: ${error.message}`);
		}
	}

	// Método para ofertar en una propiedad
	async clickOffer() {
		try {
			await this.page.waitForLoadState("load");
			await expect(this.offer).toBeVisible({ timeout: 50000 });
			await expect(this.offer).toBeEnabled();
			await this.offer.click();
		} catch (error) {
			throw new Error(`Error al hacer clic en ofertar: ${error.message}`);
		}
	}
}
