import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
	protected tableName = 'stripe_products'

	public async up () {
		this.schema.createTable(this.tableName, (table) => {
			table.string('id').primary().notNullable()
			table.string('code').notNullable()
			table.string('priceId').notNullable()
			table.json('productData').nullable()
			table.json('priceData').nullable()
		})
	}

	public async down () {
		this.schema.dropTable(this.tableName)
	}
}
