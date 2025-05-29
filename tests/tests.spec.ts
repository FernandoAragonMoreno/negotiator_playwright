import { test } from "@playwright/test";
import { LoginPage } from "../page_objects/LoginPage";
import { MyBoardPage } from "../page_objects/MyBoardPage";

test("negotiator", async ({ page }) => {
	// LoginPage
	const loginPage = new LoginPage(page);
	await loginPage.navegateToLogin();
	await loginPage.fillEmail();
	await loginPage.fillPassword();
	await loginPage.clickLogin();

	// MyBoardPage
	const myBoardPage = new MyBoardPage(page);
	await myBoardPage.clickInventory();
});
