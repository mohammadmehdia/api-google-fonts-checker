import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class  extends BaseSchema {
	protected tableName = 'stripe_sessions'

	public async up () {
		this.schema.createTable(this.tableName, (table) => {
			table.string('id').primary()
			table.integer('amountSubtotal').unsigned().nullable()
			table.integer('amountTotal').unsigned().nullable()
			table.string('currency').nullable()
			table.string('customerId').nullable()
			table.json('customerDetails').nullable()
			table.string('customerEmail').nullable()
			table.json('metadata').nullable()
			table.string('mode').nullable()
			table.boolean('liveMode').nullable().defaultTo(false)
			table.string('paymentStatus').nullable()
			table.string('status').nullable()
			table.json('totalDetails').nullable()
			table.text('url', 'mediumtext').nullable()
		})
	}

	public async down () {
		this.schema.dropTable(this.tableName)
	}
}
