import { query } from "../db";

export class BusinessRepository {
	async getOfferReviewCards(propertyID: string) {
		const sqlQuery = `
            SELECT b.pipefy_card_id, b.broker_id, b.status, pc.property_id
            FROM habi_brokers_business.business b
            LEFT JOIN habi_brokers_listing.property_card pc
                ON b.property_card_id = pc.id
            WHERE b.broker_id IN (?)
            AND pc.property_id IN (?)
            AND b.pipefy_card_id IS NOT NULL
            AND b.status LIKE ?
        `;

		const values = [269, propertyID, "offer_review"];

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
