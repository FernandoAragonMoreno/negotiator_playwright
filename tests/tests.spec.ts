import { InventoryPage } from "./../page_objects/InventoryPage";
import { expect, test } from "@playwright/test";
import { LoginPage } from "../page_objects/LoginPage";
import { MyBoardPage } from "../page_objects/MyBoardPage";
import { NewOfferInfoPage } from "../page_objects/NewOfferInfoPage";
import { NewOfferDocumentsPage } from "../page_objects/NewOfferDocumentsPage";
import { NewOfferInformationPage } from "../page_objects/NewOfferInformationPage";
import { BusinessRepository } from "../repositories/BusinessRepository";

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
	await newOfferDocumentsPage.addID();
	await newOfferDocumentsPage.addCURP();
	await newOfferDocumentsPage.addRFC();
	await newOfferDocumentsPage.addBirthCertificate();
	await newOfferDocumentsPage.addAddress();
	await newOfferDocumentsPage.addBankAuthorization();
	await newOfferDocumentsPage.clickContinueButton();

	// NewOfferInformationPage
	const newOfferInformationPage = new NewOfferInformationPage(newPage);
	await newOfferInformationPage.fillRFC();
	await newOfferInformationPage.fillCURP();
	await newOfferInformationPage.fillNumberID();
	await newOfferInformationPage.fillDocumentIssuingAuthority();
	await newOfferInformationPage.fillCellPhoneNumber();
	await newOfferInformationPage.fillConfirmCellPhoneNumber();
	await newOfferInformationPage.fillCustomerEmail();
	await newOfferInformationPage.fillZipCode();
	await newOfferInformationPage.clickMunicipality();
	await newOfferInformationPage.selectRandomMunicipality();
	await newOfferInformationPage.fillColony();
	await newOfferInformationPage.fillCityResidence();
	await newOfferInformationPage.fillHome();
	await newOfferInformationPage.clickNationality();
	await newOfferInformationPage.selectRandomNationality();
	await newOfferInformationPage.clickCountryBirth();
	await newOfferInformationPage.selectRandomCountryBirth();
	await newOfferInformationPage.clickCountryResidence();
	await newOfferInformationPage.selectRandomCountryResidence();
	await newOfferInformationPage.clickState();
	await newOfferInformationPage.selectRandomState();
	await newOfferInformationPage.clickPayrollReceipt();
	await newOfferInformationPage.selectRandomPayrollReceipt();
	await newOfferInformationPage.clickOccupation();
	await newOfferInformationPage.selectRandomOccupation();
	await newOfferInformationPage.fillCreditAmount();
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

test("Consulta de business cards", async () => {
	// Crear instancia del repositorio
	const businessRepo = new BusinessRepository();

	// Ejecutar la consulta
	const cards = await businessRepo.getOfferReviewCards();

	// Validaciones básicas
	expect(Array.isArray(cards)).toBe(true);
	expect(cards.length).toBeGreaterThanOrEqual(0);

	// Si hay resultados, validar la estructura
	if (cards.length > 0) {
		// Validar que tenga las propiedades esperadas
		expect(cards[0]).toHaveProperty("pipefy_card_id");
		expect(cards[0]).toHaveProperty("broker_id");
		expect(cards[0]).toHaveProperty("status");
		expect(cards[0]).toHaveProperty("property_card_id");

		// Validar valores específicos
		expect(cards[0].broker_id).toBe(269);
		expect(cards[0].status).toBe("offer_review");
		expect(cards[0].pipefy_card_id).not.toBeNull();

		console.log("✅ Estructura de la card validada correctamente");

		// Mostrar todas las cards encontradas
		cards.forEach((card, index) => {
			console.log(`Card ${index + 1}:`, {
				pipefy_card_id: card.pipefy_card_id,
				broker_id: card.broker_id,
				property_card_id: card.property_card_id,
				status: card.status,
			});
		});
	} else {
		console.log("⚠️ No se encontraron cards con los criterios especificados");
		console.log(
			"Criterios: broker_id=269, property_id=64149, status=offer_review"
		);
	}
});
