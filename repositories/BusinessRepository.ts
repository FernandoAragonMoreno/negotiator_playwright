import { query } from "../db";

export class BusinessRepository {
	async getOfferReviewCards() {
		const sqlQuery = `
            SELECT b.*
            FROM habi_brokers_business.business b
            LEFT JOIN habi_brokers_listing.property_card pc
                ON b.property_card_id = pc.id
            WHERE b.broker_id IN (?)
            AND pc.property_id IN (?)
            AND b.pipefy_card_id IS NOT NULL
            AND b.status LIKE ?
        `;

		const values = [269, 64149, "offer_review"];

		try {
			const result = await query(sqlQuery, values);
			// Simplemente usar 'as any[]' para evitar errores de tipos
			const rows = result as any[];
			return rows;
		} catch (error) {
			console.error("Error en la consulta:", error);
			throw error;
		}
	}
}
