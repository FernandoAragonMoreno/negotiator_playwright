import { InventoryPage } from "./../page_objects/InventoryPage";
import { test } from "@playwright/test";
import { LoginPage } from "../page_objects/LoginPage";
import { MyBoardPage } from "../page_objects/MyBoardPage";

test("negotiator con filtro - Tipo de inventario Habi", async ({ page }) => {
	// LoginPage
	const loginPage = new LoginPage(page);
	await loginPage.login();

	// MyBoardPage
	const myBoardPage = new MyBoardPage(page);
	await myBoardPage.closeAnimation();
	await myBoardPage.clickInventory();

	// InventoryPage
	const inventoryPage = new InventoryPage(page);
	await inventoryPage.closeAnimation();
	await inventoryPage.clickFilter();
	await inventoryPage.selectHabi();
	await inventoryPage.clickShowResults();
	await inventoryPage.listTitles();
	await inventoryPage.clickRandomCard();
});

test("negotiator por NID", async ({ page }) => {
	// LoginPage
	const loginPage = new LoginPage(page);
	await loginPage.login();

	// MyBoardPage
	const myBoardPage = new MyBoardPage(page);
	await myBoardPage.closeAnimation();
	await myBoardPage.clickInventory();

	// InventoryPage
	const inventoryPage = new InventoryPage(page);
	await inventoryPage.closeAnimation();
	await inventoryPage.searchByCityColonyNidParOptionA();
	await inventoryPage.clickOnSearchedNID();
	await inventoryPage.verifyFirstModalLock();
});
