import { InventoryPage } from "./../page_objects/InventoryPage";
import { test } from "@playwright/test";
import { LoginPage } from "../page_objects/LoginPage";
import { MyBoardPage } from "../page_objects/MyBoardPage";
import { NewOfferInfoPage } from "../page_objects/NewOfferInfoPage";
import { NewOfferDocumentsPage } from "../page_objects/NewOfferDocumentsPage";

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
	const propertyID = await inventoryPage.clickRandomCard();
	// Llamas al método y guardas el valor retornado (la nueva página) en la variable newPage
	const newPage = await inventoryPage.verifyProperty(propertyID!);

	// NewOfferInfo
	const newOfferInfoPage = new NewOfferInfoPage(newPage);
	await newOfferInfoPage.closeAnimation();
	await newOfferInfoPage.selectPaymentMethodBankCredit();
	await newOfferInfoPage.selectExemptionCode();
	await newOfferInfoPage.fillAddIndividualBuyer();
	await newOfferInfoPage.clickContinueButton();

	// NewOfferDocuments
	const newOfferDocumentsPage = new NewOfferDocumentsPage(newPage);
	await newOfferDocumentsPage.addDocuments();
	await newOfferDocumentsPage.clickContinueButton();
});

/*
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
	await inventoryPage.clickOnSpecificCard();
	const propertyID = "64150";
	await inventoryPage.verifyProperty(propertyID!);
});
*/
