import mysql from "mysql2/promise";
import "dotenv/config";

// Configuración de la conexión
const dbConfig = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: parseInt(process.env.DB_PORT || "3306"),
};

// Crear pool de conexiones
const pool = mysql.createPool(dbConfig);

// Función para consultas SQL
export async function query(sql: string, values?: any[]) {
	const connection = await pool.getConnection();
	try {
		const [results] = await connection.query(sql, values);
		return results;
	} finally {
		connection.release();
	}
}

// Health check
export async function healthCheck() {
	const connection = await pool.getConnection();
	try {
		// Versión 1: Más compatible (usa comillas simples para alias)
		const [result] = await connection.query(
			`SELECT NOW() AS 'current_time', DATABASE() AS 'db_name', USER() AS 'user'`
		);

		// Versión 2: Alternativa más simple
		// const [result] = await connection.query("SELECT NOW(), DATABASE(), USER()");

		return {
			status: "healthy",
			timestamp: result[0]["current_time"], // Acceso con notación de corchetes
			database: result[0]["db_name"],
			user: result[0]["user"],
		};
	} finally {
		connection.release();
	}
}

// Cerrar conexiones
export async function closePool() {
	await pool.end();
}

// Exportación predeterminada
export default {
	query,
	healthCheck,
	closePool,
};
