import { test, expect } from "@playwright/test";
import db from "../db";

test("Verificar conexión a MySQL", async () => {
	const result = await db.query("SELECT 1 + 1 AS solution");
	expect(result[0].solution).toBe(2);
	console.log("✅ Conexión a MySQL funcionando correctamente");
});

test("Health Check de MySQL", async () => {
	const health = await db.healthCheck();
	expect(health.status).toBe("healthy");
	expect(health.timestamp).toBeInstanceOf(Date); // Hora UTC
	console.log("📊 Estado de MySQL:", health);
});

test.afterAll(async () => {
	await db.closePool();
});
