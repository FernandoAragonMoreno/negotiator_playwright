import { test } from "@playwright/test";
import { LoginPage } from "../page_objects/LoginPage";
import { MyBoardPage } from "../page_objects/MyBoardPage";

test("negotiator", async ({ page }) => {
	// LoginPage
	const loginPage = new LoginPage(page);
	await loginPage.login();

	// MyBoardPage
	const myBoardPage = new MyBoardPage(page);
	await myBoardPage.clickInventory();
});
