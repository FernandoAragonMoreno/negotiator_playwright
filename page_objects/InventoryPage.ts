import { Locator, Page } from "@playwright/test";

export class InventoryPage {
	// Locators
	private readonly page: Page;
	private readonly titleLocation: Locator;
	private readonly inventoryCard: Locator;

	// Siempre que se realice un new InventoryPage() se ejecutará el constructor
	// Colocamos Solo la localización de los elementos
	constructor(page: Page) {
		this.page = page;
		this.titleLocation = page.locator("p.content__title-location");
		this.inventoryCard = page.getByTestId("wrapper-card");
	}

	// Aca interactuamos con los elementos
	async listTitleLocation() {}
}
